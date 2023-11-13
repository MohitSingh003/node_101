const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=>{
    // console.log(req.url, req.method, req.headers);
    const url = req.url;
    if(url === '/test'){
        res.write('<html>')
        res.write('<head><title>My Page</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
        res.write('</html>')
        return res.end();
    }
    if(url === '/message'){
        const body = [];
        
        req.on('data', (dataChunk)=>{
            // console.log(dataChunk);
            body.push(dataChunk);
        });
        req.on('end', ()=>{
            const parsedData = Buffer.concat(body).toString();
            const message = parsedData.split('=')[1];
            console.log(message);
            fs.writeFileSync('message.txt', message);
        })
        
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>')
    res.write('<head><title>My First Server</title></head>')
    res.write('<body><h1>Hi there, this is my first server!</h1></body>')
    res.write('</html>')
})

server.listen(3000);
