const express = require('express');
const fs = require('fs');
const pug = require('pug');
const chalk = require('chalk');

// init server
const app = express();
const port = 7625;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
app.use(express.json());

// logger hits first in chain (on all REQs)
const getDuration = (start) => {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};
app.use((req, res, next) => {
  // req info
  const start = process.hrtime();
  let now = new Date().toISOString();
  let date = now.slice(0, 10);
  let time = now.slice(11, 16);
  let method = req.method;
  let url = req.url;
  // res info
  res.on('finish', () => {
    let status = chalk.white(res.statusCode);
    if (res.statusCode >= 200) {
      status = chalk.green(res.statusCode);
    }
    if (res.statusCode >= 400) {
      status = chalk.yellow(res.statusCode);
    }
    if (res.statusCode >= 500) {
      status = chalk.red(res.statusCode);
    }
    const duration = getDuration(start);
    // log
    let log = `\n${date} [${time}] - ${method} request to - ${url}\n\t\t     ${status} (${duration}ms)`;
    console.log(log);
    fs.appendFile(`./server/logs/${date}.log`, log, (err) => {
      if (err) throw err;
    });
  });
  next();
});

// web
app.use(express.static('./client/public'));

// api
app.use('/api/users', require('./routes/users.js'));
app.use('/api/recipes', require('./routes/recipes.js'));

// error pages
app.set('view engine', 'pug');
app.set('views', './server/views');
app.use(function (req, res) {
  res.status(404);
  res.render('404.pug', { title: '404: File Not Found' });
});

app.use(function (err, req, res, next) {
  res.status(500);
  res.render('500.pug', { title: '500: Internal Server error', error: err });
});

/*
// http server
const httpServer = express();
httpServer.listen(80, () => {
  console.log('http server listening on port 80');
});
httpServer.use((req, res, next) => {
  console.log(`${req.method} to ${req.protocol}://${req.headers.host}${req.url}`);
  next();
});
httpServer.use((req, res) => {
  res.redirect(301, `https://${domain-or-ip-address}${req.originalUrl}`);
});

// https server
//const https = require('https');
const ciphers = 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384';
const app = express();
https.createServer({
  key: fs.readFileSync('./server/auth/.server.key'),
  cert: fs.readFileSync('./server/auth/.server.cert'),
  ciphers: ciphers,
  minVersion: 'TLSv1.2'
}, app).listen(443, () => { console.log('https server listening on port 443'); });
app.use((req, res, next) => {
  // only if we want to redirect non-www to www
  if (req.headers.host.slice(0, 4) !== 'www.') {
    res.redirect(301, `${domain-or-ip-address}${req.originalUrl}`);
  }
  next();
});
*/
