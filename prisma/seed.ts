import { PrismaClient, PriceType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const services = [
    {
      name: "Professional Video Shoot & Editing",
      slug: "video-shoot-editing",
      description: "High-quality professional video production including shoot and post-editing. Product promos, brand reels, testimonials, social content.",
      price: 599,
      priceType: PriceType.ONE_TIME,
      icon: "🎬",
    },
    {
      name: "Social Media Manager",
      slug: "social-media-manager",
      description: "Complete management of Facebook, Instagram, YouTube & Gmail. Content planning, posting, engagement, monthly reports.",
      price: 1499,
      priceType: PriceType.SUBSCRIPTION,
      sixMonthTotal: 7200,
      yearlyTotal: 14400,
      icon: "📱",
    },
    {
      name: "Meta Ads Services",
      slug: "meta-ads",
      description: "Facebook & Instagram ad campaign management. Strategy, creatives, targeting, A/B testing, monthly performance reports. (Meta ad spend extra)",
      price: 999,
      priceType: PriceType.SUBSCRIPTION,
      sixMonthTotal: 7200,
      yearlyTotal: 14400,
      icon: "📊",
    },
    {
      name: "ChatBot Installation",
      slug: "chatbot-installation",
      description: "Install & configure chatbot for website/WhatsApp. Lead capture, FAQs, support automation. (Platform charges extra)",
      price: 499,
      priceType: PriceType.ONE_TIME,
      icon: "🤖",
    },
    {
      name: "Google My Business",
      slug: "google-my-business",
      description: "Setup, optimize & manage your GMB profile. Improve local search visibility, manage reviews, post updates.",
      price: 399,
      priceType: PriceType.ONE_TIME,
      icon: "📍",
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }

  // Create/Update default admin user
  const adminEmail = process.env.ADMIN_EMAIL || "admin@nv.wapiflow.site";
  const adminPassword = process.env.ADMIN_PASSWORD || "Nami@1971";
  
  const bcrypt = require('bcryptjs');
  const hash = await bcrypt.hash(adminPassword, 10);

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash: hash,
      role: "ADMIN"
    },
    create: {
      name: "NV Studio Admin",
      email: adminEmail,
      phone: "9999999999",
      passwordHash: hash,
      role: "ADMIN"
    }
  });

  await prisma.marketingExecutive.upsert({
    where: { userId: adminUser.id },
    update: {
      isActive: true,
      meCode: "NV001"
    },
    create: {
      userId: adminUser.id,
      meCode: "NV001",
      displayName: "NV Studio (Company)",
      isActive: true,
      commissionPct: 0,
    }
  });
  
  console.log("Seed data created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
