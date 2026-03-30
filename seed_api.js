const seedData = [
  {
    title: "传统编码与低代码平台：平衡效率与定制",
    slug: "low-code-vs-traditional",
    content: "<h2>数字化转型的抉择</h2><p>低代码平台 vs 传统编码：数字化转型的抉择。如何避免在项目选型中常犯的重大错误，这是每个CTO和创业者必须面对的问题。低代码平台提供了无与伦比的迭代速度，而传统编码依然是应对极致复杂的唯一解药。</p><blockquote><p>Only the Paranoid Survive.</p></blockquote><p>我们在Dulaidila的实践表明，混合架构或许是未来的最终答案...</p>"
  },
  {
    title: "提升生产力：探索我的实用软硬件工具清单",
    slug: "productivity-tools",
    content: "<h2>拥抱数字化云端工作</h2><p>从锤子科技的欠债风波开始，拥抱数字化云端工作变得前所未有的重要。在这里我想分享我现在正在使用的工作流与设备清单。</p><ul><li>MacBook Pro M系列</li><li>Vercel + Next.js 全栈构建体系</li><li>Notion 知识库管理</li></ul><p>工具本身不是目的，达成“心流”状态才是数字生活的终极追求。</p>"
  },
  {
    title: "网络暴力泛滥，如何重建宽容的网络文化",
    slug: "internet-violence",
    content: "<h2>在这个浮躁的时代</h2><p>我们似乎逐渐失去了一种珍贵的品质。我们要认识到在现实生活中人与人之间存在的距离感和敬畏感，在互联网上被彻底抹平。这种扁平化带来效率的同时，不可避免地滋生了赛博暴力。</p><p>重构网络宽容不仅是法律与社区规则的责任，更是每一位网民需要修炼的“极客素养”。</p>"
  }
];

async function runSeeder() {
  for (const post of seedData) {
    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post)
      });
      if (res.ok) {
        console.log(`Successfully seeded: ${post.title}`);
      } else {
        const err = await res.json();
        console.error(`Failed to seed ${post.title}:`, err);
      }
    } catch (e) {
      console.error("Network error during seeding:", e.message);
    }
  }
}

runSeeder();
