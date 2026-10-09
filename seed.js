const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const reviews = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Absolutely amazing work! The team transformed our living room completely. Highly recommend!"
    },
    {
      name: "Michael Chen",
      rating: 4,
      comment: "Great painters, very professional and clean. The exterior painting job was excellent."
    },
    {
      name: "Emily Rodriguez",
      rating: 5,
      comment: "Outstanding service from start to finish. They were on time, kept our home clean, and the results exceeded expectations!"
    },
    {
      name: "David Wilson",
      rating: 4,
      comment: "Professional team with attention to detail. My house looks brand new after their work."
    },
    {
      name: "Lisa Thompson",
      rating: 5,
      comment: "Best painting service I've ever used! They were responsive, reliable, and did an excellent job."
    }
  ];

  for (const r of reviews) {
    await prisma.review.create({ data: r });
  }
  console.log('Seed data inserted');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
