// Simple dev server script that starts both frontend and backend
const { exec } = require('child_process');
const path = require('path');

console.log('Starting development servers...');

// Start the Express server
const serverProcess = exec('npm run dev:server', {
  cwd: path.join(__dirname)
});

serverProcess.stdout.on('data', (data) => {
  console.log(`[SERVER] ${data}`);
});

serverProcess.stderr.on('data', (data) => {
  console.error(`[SERVER ERROR] ${data}`);
});

// Wait a moment before starting the client
setTimeout(() => {
  const clientProcess = exec('npm run dev:client', {
    cwd: path.join(__dirname)
  });

  clientProcess.stdout.on('data', (data) => {
    console.log(`[CLIENT] ${data}`);
  });

  clientProcess.stderr.on('data', (data) => {
    console.error(`[CLIENT ERROR] ${data}`);
  });
}, 2000);