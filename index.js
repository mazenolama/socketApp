const express = require('express');

const app = express();

//app.get(); .post(); .put(); .delete();

app.get('/api/courses/:id/:name' ,(req,res) => {
    //var id =req.params.id; var name =req.params.name;
    //res.send(`id : ${id} \n name : ${name}`);
    //res.send(req.params);
    res.send(req.query);
});

var courses = [
    {id:1,name:'OOP'},
    {id:2,name:'DS'},
    {id:3,name:'CS'},
];

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
   let course = courses.find( c => c.id === parseInt(req.params.id));
   if(!course)
        res.status(404).send('course with the given id not found');
   else
        res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));