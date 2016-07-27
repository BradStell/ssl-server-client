const fs = require('fs');
const https = require('https');

let options = {
    hostname: 'localhost',
    port: 4433,
    path: '/',
    method: 'GET',
    key: fs.readFileSync('keys/clients/client1-key.pem'),
    cert: fs.readFileSync('keys/clients/client1-crt.pem'),
    ca: fs.readFileSync('keys/ca-crt.pem'),
    headers: {
        'Authorization': 'Basic ' + new Buffer('brad:pass').toString('base64')
    }
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