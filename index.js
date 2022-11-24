const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 8000

// Mongoose Connection
mongoose.connect("mongodb+srv://MuzamilKhan:ms391retwq@gratitude-app.8l5gq9j.mongodb.net/gratitude")

const gratitude = mongoose.Schema
const MyModel = mongoose.model('gratitude', new gratitude({ 
    name: String,
    gratitude: String
 }));
 
// Cors and Body Parser for Getting His typed project
app.use(cors({
    origin: 'https://gratitude-app-by-muzamil.web.app',
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());


// Getting Post request
app.post('/',(req, res)=>{
        if(req.body.data.Name == 'Anonymous'){
            MyModel.create({
                name: 'Anonymous',
                gratitude: req.body.data.Example
            })   
        }else{
            MyModel.create({
                name: req.body.data.Name.n,
                gratitude: req.body.data.Example
            })
        }
        console.log(req.body.data)
})

// Server Setup
app.get('/uploaded', (req, res) => {
    MyModel.find({ gratitude:  { $gt: 25 } }, function(error,result){
        var array = [];
        array.push(result)
        res.send(array[0])
})
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
