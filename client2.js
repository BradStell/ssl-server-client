const fs = require('fs');
const https = require('https');

let options = {
    hostname: 'localhost',
    port: 4433,
    path: '/',
    method: 'GET',
    key: fs.readFileSync('keys/clients/client2-key.pem'),
    cert: fs.readFileSync('keys/clients/client2-crt.pem'),
    ca: fs.readFileSync('keys/ca-crt.pem')
};

let req = https.request(options, (res) => {
    
    res.on('data', (data) => {
        process.stdout.write(data);
    });
});

req.end();

req.on('error', (e) => {
    console.log(e);
});