const http = require('http');
const fs = require('fs');
const url = require('url')
const db = require("./db.json");

console.log(db);

const server = http.createServer((req,res)=>{
    if(req.method === "GET" && req.url==="/api/user"){
        fs.readFile('db.json',(err,db)=>{
            if(err){
                throw err
            }
            data= JSON.parse(db)
            res.writeHead(200,{'content-type':'application/json'});
            res.write(JSON.stringify(data.user))
            res.end()
        });
        
            
    }
    else if(req.method === "GET" && req.url==="/api/books"){
        fs.readFile('db.json',(err,db)=>{
            if(err){
                throw err
            }
            data= JSON.parse(db)
            res.writeHead(200,{'content-type':'application/json'});
            res.write(JSON.stringify(data.books))
            res.end()
        });
        
            
    }else if(req.method ==="DELETE"){
        const parsurl = url.parse(req.url,true);
        const bookId = parsurl.query.id;
        const newbook = db.books.filter((book) => book.id != bookId)
        if(newbook.length ===db.books.length){
            res.writeHead(401,{"content-Type":"application/json"});
            res.write(JSON.stringify({message:"books not found"}));
            res.end()
        }else{
            fs.writeFile("db.json",JSON.stringify({...db,books:newbook}),(err)=>{
            if (err){
                throw err
            }
            res.writeHead(200,{'content-type':'application/json'});
            res.write(JSON.stringify({message :"book remov"}));
            res.end();
        }
    );
        // res.end("test")
    }
    }
        
    
});

server.listen(3000,()=>{
    console.log("ow you are running in 3000 port");
})