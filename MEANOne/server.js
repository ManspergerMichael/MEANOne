const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/PetShelter/dist/PetShelter'));
var path = require('path')
mongoose.connect('mongodb://localhost/pets')

var petSchema = new mongoose.Schema({
    name:{type:String, required:[true,"Name is required"], minlength:[3,"Name must be at least 3 characters long"],unique:true},
    type:{type:String, required:[true,"Type is required"], minlength:[3,"Type must be at least 3 characters long"]},
    description:{type:String, required:[true,"Description is required"], minlength:[3,"Description must be at least 3 characters long"]},
    likes:{type:Number, default:0},
    skill1:{type:String},
    skill2:{type:String},
    skill3:{type:String}
})
petSchema.plugin(uniqueValidator);
mongoose.model('Pets', petSchema);
var Pet = mongoose.model('Pets');

app.get('/getAll', function(req,res){
    Pet.find({}, function(err,pet){
        if(err){
            console.log("returned error", err);
            res.json({message: "Error", error: err})
        }
        else {
            res.json({data:pet})
        }
    })
})

app.post('/create', function(req,res){
    Pet.create({name: req.body.name, type: req.body.type, description: req.body.description, skill1: req.body.skill1,skill2: req.body.skill2,skill3: req.body.skill3},function(err,pet){
        if(err){
            console.log("returned error", err);
            res.json({message: "Error", error: err})
        }
        else {
            res.json({message: "Success", data:pet})
        }
    })
})

app.get('/getPet/:id', function(req,res){
    console.log("Getting pet!")
    Pet.find({_id:req.params.id}, function(err,pet){
        if(err){
            console.log("returned error", err);
            res.json({message: "Error", error: err})
        }
        else {
            console.log(pet);
            res.json({message: "Success", data:pet})
        }
    })
})

app.post('/edit/:id', function(req,res){
    Pet.findByIdAndUpdate({_id:req.params.id}, {name:req.body.name,
        type:req.body.type,
        description:req.body.description,
        likes:req.body.likes,
        skill1:req.body.skill1,
        skill2:req.body.skill2,
        skill3:req.body.skill3}, function(err,pet){
        if(err){
            console.log("returned error", err);
            res.json({message: "Error", error: err})
        }
        else {
            console.log(pet);
            res.json({message: "Success", data:pet})
        }
    })
})

app.get('/delete/:id', function(req,res){
    Pet.findByIdAndRemove({_id:req.params.id}, function(err,pet){
        if(err){
            console.log("returned error", err);
            res.json({message: "Error", error: err})
        }
        else {
            console.log(pet);
            res.json({message: "Success", data:pet})
        }
    })
})

app.all("*", (request,response,next) =>{
    response.sendFile(path.resolve('./PetShelter/dist/PetShelter/index.html'))
});


app.listen(8000, function(errs){
    console.log("Server at 8000");
})