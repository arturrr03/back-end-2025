const { log } = require('console');
const http = require('http');
const {data} = require('./users')
const moment = require("moment")
const server = http.createServer ((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/json');
    const url = req.url;
    if(url ==='/') {
        res.write('This is the home page')
    }
    else if (url === '/about'){
        res.setHeader('Content-Type', 'text/json');
        res.write(JSON.stringify({
            
            status: 'success',
            message: 'response success',
            description: 'Exercise 2',
            date: moment().format()
        }))
    }
    else if (url === '/users'){
        res.setHeader ("Content-Type", "text/json")
        res.write(JSON.stringify({
            data,
        }))
    }
    else{
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/json');
        res.write(JSON.stringify({
            status: 'not found',
            message: 'Route tidak ada',
            date: moment().format('MMMM Do YYYY, h:mm:ss a')
        }))
        

    }

    res.end();
})

const hostname = '127.0.0.1';
const port = 3000;
server.listen(port,hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
    
});