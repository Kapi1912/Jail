const express = require('express');
const mongoose = require('mongoose');

const cors = require("cors")

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/PrisonersDB');

const prisonerSchema= new mongoose.Schema({
    name: String,
    surname: String,
    age: Number,
    reason: String,
    sentence: Number,
    is60: Boolean
})

const slaves = mongoose.model("slaves", prisonerSchema)



app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/prisoners', async(req, res) =>
{
    try{
        const prisoners = await slaves.find({})
       res.json(prisoners)
           
       }catch(err){
           res.status(500).json({message: err.message})
      }


});







app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });