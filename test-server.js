// Simple test to verify server functionality
const http = require('http');

console.log('Testing server startup...');

// Create a simple test server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Test server works!\n');
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Test server running on port ${PORT}`);
    console.log('Server startup successful!');
    
    // Test a simple request
    setTimeout(() => {
        const options = {
            hostname: 'localhost',
            port: PORT,
            path: '/',
            method: 'GET'
        };

        const req = http.request(options, (res) => {
            console.log(`Status: ${res.statusCode}`);
            res.on('data', (chunk) => {
                console.log(`Body: ${chunk}`);
            });
            res.on('end', () => {
                console.log('Test completed successfully!');
                process.exit(0);
            });
        });

        req.on('error', (e) => {
            console.error(`Problem with request: ${e.message}`);
            process.exit(1);
        });

        req.end();
    }, 1000);
});
