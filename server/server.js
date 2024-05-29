const express = require('express');
const mongoose = require('mongoose');

const cors = require("cors")
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;

const upload = multer({ dest: 'uploads/' })

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

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

app.post('/prisoners', upload.none(), async(req, res) =>
    {

        try {
            const newPrisoner = new slaves(req.body)
            await newPrisoner.save()
            res.status(201).json(newPrisoner)

            
        } catch(err){
            console.log(`post error ${err.message}`)
            res.status(400).json(err)
        }
    
});

app.delete('/prisoners/:name/:surname', async(req, res) =>
{
    try {
        const deletedPrisoner = await slaves.findOneAndDelete({name: req.params.name, surname: req.params.surname})
        if(!deletedPrisoner){
            return res.status(404).json({message:"Prisoner not found"})
        }
        res.json({message:"Prisoner deleted!"})


    } catch(err) {
        res.status(500).json({message: err.message})
    }

});
 





app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    
  });