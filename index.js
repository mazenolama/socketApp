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
/**********************  GET ALL   *******************/
app.get('/api/courses', (req, res) => {
    res.send(courses);
});
/**********************  GET ALL      *******************/

/**********************  GET SINGLE   **********************/
app.get('/api/courses/:id', (req, res) => {
   let course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) 
        return res.status(404).send('course with the given id not found');
    else
        res.send(course);
});
/**********************  GET SINGLE   **********************/

/**********************    POST    **************************/
app.post('/api/courses',(req,res) => {
    const {error} = inputValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let course = {
        id : courses.length +1,
        name : req.body.name,
    }
    courses.push(course);
    res.send(courses);
});
/**********************    POST    **********************/

/**********************  DELETE   ***********************/
app.delete('/api/courses/:id', (req,res) => {
    
    let course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) 
        return res.status(404).send('course with the given id not found');
    else
    {
        const index = courses.indexOf(course);
        courses.splice(index,1);
        res.send(courses);
    }
});
/**********************  DELETE   **********************/

/**********************  UPDATE   **********************/
app.put('/api/courses/:id', (req,res) => {
    
    const {error} = inputValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) 
        return res.status(404).send('course with the given id not found');
    else{
        course.name = req.body.name;
        res.send(course);
    }
});
/************************   UPDATE     *****************************/


/**********************  inputValidate  ************************/
function inputValidate(body){
    const scheme = {name : Joi.string().min(2).required()}
    return Joi.validate(body, scheme);
}
/**********************  inputValidate  ************************/


/**********************  start server   ************************/
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));
/**********************  start server   **************************/