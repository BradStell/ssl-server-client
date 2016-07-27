const fs = require('fs');
const https = require('https');
const basicAuth = require('basic-auth');
const app = require('express')();
const port = 4433;

let options = {
    key: fs.readFileSync('keys/server/server-key.pem'),
    cert: fs.readFileSync('keys/server/server-crt.pem'),
    ca: fs.readFileSync('keys/ca-crt.pem'),
    crl: fs.readFileSync('keys/ca-crl.pem'),
    requestCert: true,
    rejectUnauthorized: true
};

app.get('/', auth, (req, res) => {
    res.end('Hello world');
});

https.createServer(options, app).listen(port, () => {
    console.log(`Server started at https://localhost:${port}`);
});

/*
    Certificate authorization function
*/
function auth (req, res, next) {
    /* handled by basic-auth */
    // let creds = basicAuth(req);
    // console.log(req.headers.authorization);

    /* handled by vanilla js (es6) */
    const creds = {name: 'brad', pass: 'pass'};
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = new Buffer(b64auth, 'base64').toString().split(':');

    if (req.socket.authorized && login === 'brad' && password === 'pass') {

        console.log(new Date() + ' ' + req.connection.remoteAddress + ' ' +
                    req.socket.getPeerCertificate().subject.CN + ' ' +
                    req.method + ' ' + req.url);
        res.writeHead(200);
        res.write('authorized\n');
        next();
    } else {
        res.end();
    }

};