
const http = require('http');
const routes = require('./routes');

const server = http.createServer(routes);
    // (req, res)=>{

    // const url = req.url;
    
// })

server.listen(3000);
