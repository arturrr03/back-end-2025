const http = require('http');
const express = require('express')
const moment = require('moment')
const app = express()

app.get('/', (req, res) => res.send('Hello World'))

const hostname = '127.0.0.1';
const port = 3000;
app.listen(port,hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
    
});