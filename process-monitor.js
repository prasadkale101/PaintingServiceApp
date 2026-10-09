// Simple process monitoring for development
const { exec } = require('child_process');

// Function to get current node processes
function getProcessCount() {
  try {
    // This will help us understand what's running
    const cmd = process.platform === 'win32' ? 'tasklist /FI "IMAGENAME eq node.exe" /FO CSV' : 'ps aux | grep node';
    exec(cmd, (error, stdout, stderr) => {
      if (!error && stdout) {
        const lines = stdout.trim().split('\n');
        console.log(`Current Node processes: ${lines.length - 1}`); // -1 for header line
      }
    });
  } catch (e) {
    // Silently ignore errors in monitoring
  }
}

// Run monitoring every 30 seconds
setInterval(getProcessCount, 30000);

// Initial check
getProcessCount();

console.log('Process monitor started. Monitoring node processes...');