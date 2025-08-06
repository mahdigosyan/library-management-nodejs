const http = require('http')
const fs = require('fs');
const { json } = require('stream/consumers');

const server = http.createServer((req,res)=>{
    if(req.method=== "GET" && req.url==="/api/users"){
        fs.readFile('db.json',(err,db)=>{
            if(err){
                throw err;
            }
            const data = JSON.parse(db)
            res.writeHead(200,{'content-type':"applacation/json"})
            res.write(JSON.stringify(data.users));
            res.end()
        });
        
    }
    else if(req.method=== "GET" && req.url==="/api/books"){
        fs.readFile('db.json',(err,db)=>{
            if(err){
                throw err;
            }
            const data = JSON.parse(db)
            res.writeHead(200,{'content-type':"applacation/json"})
            res.write(JSON.stringify(data.books));
            res.end()
        });
        
    }

});

server.listen(3000,()=>{
    console.log("server is running on port 3000");
});

