const express = require('express');
const app = express();

let courses = [
    {id:1,name:'OOP'},
    {id:2,name:'DS'},
    {id:3,name:'CS'},
];

/***********  POST   ********/



const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`Listening on Port ${port}...`));