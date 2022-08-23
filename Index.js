const { request } = require('express');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'},
]

app.get('/', (req,res)=>{
    res.send('hello world')
})

app.get('/api/courses', (req,res)=>{
    res.send(courses);
});

app.post('/api/courses', (req,res)=>{
    const course = {
        id: courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
} );



app.get('/api/courses/:id', (req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id) );
    if(!course) res.status(404).send('course id requested not found');
    res.status(200).send(course);
})
// //for reading query parameter
// app.get('/api/post/:year/:month', (req,res)=>{
//     res.send(req.query);
// })

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`running on port ${port}`));