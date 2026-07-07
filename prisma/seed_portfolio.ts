import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding portfolio data...')

  // Clear existing (optional, but good for resetting during dev)
  await prisma.portfolio.deleteMany()

  const projects = [
    {
      title: "MiniLife Virtual Pet",
      slug: "minilife-virtual-pet",
      description: "An immersive, responsive virtual pet companion app designed for family bonding. Features a dynamic pet room dashboard, pixel-art cinematic animations, and real-time state management. Perfectly adapts fluidly across mobile and desktop environments.",
      clientName: "MiniLife",
      role: "Lead Full-Stack Developer & UI/UX Architect",
      link: "https://minilife.online",
      featured: true,
      coverImage: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=2074&auto=format&fit=crop", // A nice colorful game-like placeholder
      releaseDate: new Date("2026-04-04"),
    },
    {
      title: "SpeakBuddy AI Platform",
      slug: "speakbuddy-ai-platform",
      description: "A secure, serverless language learning application leveraging Alibaba Cloud's native DashScope (Qwen) APIs. Incorporates advanced Speech-to-Text and Text-to-Speech protocols to deliver real-time interactive conversational practice.",
      clientName: "SpeakBuddy Edu",
      role: "Backend Architect & AI Integration",
      featured: true,
      coverImage: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop", // Edu/Tech placeholder
      releaseDate: new Date("2026-04-01"),
    },
    {
      title: "Dulaidila Delivery CMS",
      slug: "dulaidila-cms",
      description: "A hyper-fast, highly optimized bespoke CMS built with Next.js 16 (Turbopack) and Prisma. Equipped with a custom Rich Text Editor, full SEO Baidu integration, and completely customized beautiful Dark-Mode Glassmorphism interface.",
      clientName: "Internal Studio",
      role: "Full-Stack Development",
      link: "https://dulaidila.com",
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop", // Code/CMS placeholder
      releaseDate: new Date("2026-03-31"),
    },
    {
      title: "Neon Financial Dashboard",
      slug: "neon-financial-dashboard",
      description: "Concept enterprise analytics dashboard featuring advanced Framer Motion transitions, D3 data visualizations, and robust state management for a high-frequency trading simulation.",
      clientName: "Concept Project",
      role: "Frontend Engineer",
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1642543492481-44e81e3914a8?q=80&w=2070&auto=format&fit=crop", // Finance/chart placeholder
      releaseDate: new Date("2025-11-15"),
    }
  ]

  for (const p of projects) {
    await prisma.portfolio.create({
      data: p
    })
  }

  console.log('Seeded', projects.length, 'portfolio items!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
