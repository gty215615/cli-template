const http = require('http');
const fs = require('fs')
const path = require('path')
http.createServer((req, res) => {
    if (req.url == '/') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        fs.readFile(path.resolve(__dirname, 'index.html'), 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                return false
            }
            res.write(data)
            res.end()
        })
    } else if (req.url == '/index.js') {
        res.writeHead(200, {
            'Content-type': 'text/javascript',
            'Cache-control': 'max-age=20 , public',
            'Last-Modified': new Date(),
            'ETag': Math.random()
        })
        fs.readFile(path.resolve(__dirname, 'index.js'), 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                return false
            }
            res.write(data)
            res.end()
        })
    }
    else if (req.url == '/jsonp') {
        res.writeHead(200, {
            'Content-type': 'text/json',
        })
        let data = ('log(1)')
        res.write(data)
        res.end()
    }
}).listen(8888)