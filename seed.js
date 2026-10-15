const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Reviews
  const reviews = [
    { name: "Sarah Johnson", rating: 5, comment: "Absolutely amazing work! The team transformed our living room completely. Highly recommend!" },
    { name: "Michael Chen", rating: 4, comment: "Great painters, very professional and clean. The exterior painting job was excellent." },
    { name: "Emily Rodriguez", rating: 5, comment: "Outstanding service from start to finish. They were on time, kept our home clean, and the results exceeded expectations!" },
    { name: "David Wilson", rating: 4, comment: "Professional team with attention to detail. My house looks brand new after their work." },
    { name: "Lisa Thompson", rating: 5, comment: "Best painting service I've ever used! They were responsive, reliable, and did an excellent job." }
  ];

  for (const r of reviews) {
    await prisma.review.create({ data: r });
  }

  // Services
  const services = [
    { name: "Interior Painting", description: "Professional interior painting services for homes and businesses", price: "$2,500 - $8,000" },
    { name: "Exterior Painting", description: "Complete exterior house painting including siding, trim, and doors", price: "$3,000 - $12,000" },
    { name: "Ceiling Painting", description: "Specialized ceiling painting services for homes and commercial spaces", price: "$1,500 - $4,000" },
    { name: "Trim and Doors", description: "Painting of trim, doors, and built-in cabinetry", price: "$800 - $2,500" },
    { name: "Wall Repairs", description: "Painting with repair services for damaged walls", price: "$1,000 - $3,500" }
  ];

  for (const s of services) {
    await prisma.service.create({ data: s });
  }

  console.log('Seed data inserted into Review and Service tables');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });