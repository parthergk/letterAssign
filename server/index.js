const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;

app.post('/auth/google', (req, res)=>{
    const {token} = req.body();
    
})

app.listen(port, ()=>{
    console.log("server is runing on port 3000");
})