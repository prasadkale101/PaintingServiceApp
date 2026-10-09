// Test script to verify API endpoints are working
const http = require('http');
const https = require('https');

console.log('🧪 Testing API endpoints...');

// Test services endpoint
const servicesTest = new Promise((resolve) => {
  const req = https.get('https://localhost:3000/api/services', (res) => {
    console.log(`Services endpoint status: ${res.statusCode}`);
    resolve();
  });

  req.on('error', (err) => {
    console.log('Services endpoint error:', err.message);
    resolve();
  });
});

// Test reviews endpoint
const reviewsTest = new Promise((resolve) => {
  const req = https.get('https://localhost:3000/api/reviews', (res) => {
    console.log(`Reviews endpoint status: ${res.statusCode}`);
    resolve();
  });

  req.on('error', (err) => {
    console.log('Reviews endpoint error:', err.message);
    resolve();
  });
});

Promise.all([servicesTest, reviewsTest]).then(() => {
  console.log('\n✅ API endpoints test completed');
});