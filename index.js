const Joi = require('joi');
const express = require('express');

const app = express();
app.use(express.json());

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
/***********  GET ALL   ********/
app.get('/api/courses', (req, res) => {
    res.send(courses);
});
/***********  GET ALL   ********/

/***********  GET SINGLE   ********/
app.get('/api/courses/:id', (req, res) => {
   let course = courses.find( c => c.id === parseInt(req.params.id));
   if(!course)
        res.status(404).send('course with the given id not found');
   else
        res.send(course);
});
/***********  GET SINGLE   ********/

/***********  POST   ********/
app.post('/api/courses',(req,res) => {
    let course = {
        id : courses.length +1,
        name : req.body.name,
    }
    courses.push(course);
    res.send(courses);
});
/***********  POST   ********/

/***********  DELETE   ********/
app.delete('/api/courses/:id', (req,res) => {
    let course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course)
        res.status(404).send('course with the given id not found');
    else
    {
        const index = courses.indexOf(course);
        courses.splice(index,1);
        res.send(courses);
    }
});
/***********  DELETE   ********/

/***********  UPDATE   ********/
app.put('/api/courses/:id', (req,res) => {
    if (!req.body.name || req.body.name === '')
    {
        res.status(400).send(' Not vaild body data request');
        return;
    }
    if (!req.params.id || req.params.id === '')
    {
        res.status(400).send(' Not vaild params data request');
        return;
    }
    const scheme = {
        id : Joi.required(),
        name : Joi.string().min(1).required()
    }
    Joi.validate(req.body, scheme);
    
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('course with the given id not found');
    else{
        course.name = req.body.name;
        res.send(course);
    }
});
/***********  UPDATE   ********/

/***********  inputValidate   ********/
function inputValidate(data){
    
}
/***********  inputValidate   ********/
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));