const fs = require('fs');

const requestHandler = (req,res)=>{
    const url = req.url;
    const method = req.method
    if(url === '/test'){
        res.write('<html>')
        res.write('<head><title>My Page</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
        res.write('</html>')
        return res.end();
    }
    if(url === '/message' && method === 'POST'){
        const body = [];
        
        req.on('data', (dataChunk)=>{
            // console.log(dataChunk);
            body.push(dataChunk);
        });
        req.on('end', ()=>{
            const parsedData = Buffer.concat(body).toString();
            const message = parsedData.split('=')[1];
            console.log(message);
            fs.writeFile('message.txt', message, (error)=>{
                res.statusCode=201;
                res.setHeader('Location','/');
                return res.end();
            });
        })
        
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>')
    res.write('<head><title>My First Server</title></head>')
    res.write('<body><h1>Hi there, this is my first server!</h1></body>')
    res.write('</html>')
}; 

module.exports = requestHandler;