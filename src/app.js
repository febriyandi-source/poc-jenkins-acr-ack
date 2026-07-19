const http = require('http');
const os = require('os');

const PORT = 8080;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <html>
      <head><title>PoC Jenkins-ACR-ACK</title></head>
      <body style="font-family: Arial; text-align: center; padding: 50px;">
        <h1>🚀 Hello from Alibaba Cloud ACK!</h1>
        <p>Hostname: <strong>${os.hostname()}</strong></p>
        <p>Build successful via Jenkins Pipeline</p>
        <p>Time: ${new Date().toISOString()}</p>
      </body>
    </html>
  `);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});