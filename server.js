const fs = require('fs');
const https = require('https');

let options = {
    key: fs.readFileSync('keys/server/server-key.pem'),
    cert: fs.readFileSync('keys/server/server-crt.pem'),
    ca: fs.readFileSync('keys/ca-crt.pem'),
    crl: fs.readFileSync('keys/ca-crl.pem'),
    requestCert: true,
    rejectUnauthorized: true
};

https.createServer(options, (req, res) => {

    if (req.socket.authorized) {
        console.log(new Date() + ' ' + req.connection.remoteAddress + ' ' +
                    req.socket.getPeerCertificate().subject.CN + ' ' +
                    req.method + ' ' + req.url);
        res.writeHead(200);
        res.end('Hello world');
    } else {
        console.log('unauthorized in server method');
        res.end();
    }

}).listen(4433, () => {console.log('Server started on port 4433');});