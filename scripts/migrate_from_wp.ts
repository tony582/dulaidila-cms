import { PrismaClient } from "@prisma/client";
import { XMLParser } from "fast-xml-parser";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Starting WordPress RSS Migration...");
  
  let hasMore = true;
  let page = 1;
  let totalImported = 0;

  while(hasMore) {
    console.log(`Fetching RSS Stream Page ${page}...`);
    let xmlData = "";
    const url = `https://dulaidila.com/?feed=rss2&paged=${page}`;

    const https = require("https");
    const agent = new https.Agent({ rejectUnauthorized: false });
    try {
      xmlData = await new Promise<string>((resolve, reject) => {
        https.get(url, { agent }, (res: any) => {
          if (res.statusCode === 404) {
            resolve("");
            return;
          }
          let data = "";
          res.on("data", (chunk: any) => data += chunk);
          res.on("end", () => resolve(data));
        }).on("error", reject);
      });
    } catch (e) {
      console.error("Fetch block failed", e);
      break;
    }

    if (!xmlData || !xmlData.includes("<rss")) {
      console.log("No more valid RSS data. End of pagination.");
      hasMore = false;
      break;
    }

    console.log("Parsing XML Data...");
    const parser = new XMLParser({
      ignoreAttributes: false,
      cdataPropName: "__cdata"
    });
    
    const result = parser.parse(xmlData);
    const items = result.rss?.channel?.item || [];
    const postsToImport = Array.isArray(items) ? items : [items];

    if (postsToImport.length === 0) {
      break;
    }

    let admin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (!admin) {
      admin = await prisma.user.create({
        data: {
          name: "Tony Jin",
          email: "admin@dulaidila.com",
          password: "admin",
          role: "ADMIN"
        }
      });
    }

    for (const item of postsToImport) {
      const rawTitle = item.title?.["__cdata"] || item.title || "Untitled";
      const title = typeof rawTitle === "string" ? rawTitle : rawTitle.toString();
      
      const contentObj = item["content:encoded"] || item.description || "";
      const contentHtml = typeof contentObj === "string" ? contentObj : (contentObj["__cdata"] || JSON.stringify(contentObj));
      
      let slug = "";
      if (typeof item.link === "string") {
        const match = item.link.match(/\/([^\/]+)\/?$/);
        if (match && match[1]) slug = match[1];
      }
      if (!slug) {
        slug = encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'));
      }
      
      if (slug.length > 200) { slug = slug.substring(0, 200); }

      const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();
      
      try {
        await prisma.post.upsert({
          where: { slug },
          update: {
             title,
             content: contentHtml,
             updatedAt: pubDate
          },
          create: {
            title,
            slug,
            excerpt: "",
            content: contentHtml,
            published: true,
            authorId: admin.id,
            createdAt: pubDate,
            updatedAt: pubDate
          }
        });
        console.log(`✅ Upserted: ${title}`);
      } catch (dbErr) {
        console.error(`❌ Failed tracking: ${title}`, dbErr);
      }
    }
    
    totalImported += postsToImport.length;
    page++;
    
    if (page > 50) {
      console.log("Reached safety pagination limit. Breaking.");
      break;
    }
  }

  console.log(`🎉 Migration Complete! Imported a total of ${totalImported} historical posts.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
