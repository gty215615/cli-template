
const http = require('http');
const fs = require('fs')
const path = require('path')


const server = http.createServer((req, res) => {
    fs.readFile(path.resolve(__dirname, 'history.html'), 'utf8', (err, data) => {
        if(err){
            console.log(err);
            return false;
        }
        res.write(data)
        res.end()
    })
   
})

server.listen(3000)
