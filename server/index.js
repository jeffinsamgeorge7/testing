/*
const express=require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const multer= require("multer")
const api=express()
api.use(cors())
api.use(express.urlencoded({extended: true}))
api.use(express.static("upload"))
api.use(express.json())

main().catch(err => console.log(err))

async function main() {
    await mongoose.connect("mongodb://localhost:27017/empDB")
}
const demo=mongoose.Schema({fileurl:String})
const demoM=mongoose.model('demoTable',demo)

//multer
const store = multer.diskStorage({
    destination:(req,file,cb)=>{cb(null,'upload')},
    filename:(req,file,cb)=>{cb(null,file.originalname)} 
});
const upload = multer({storage:storage})

api.post('/uploadimg',upload.single('file'),(req,res)=>{
    var url=req.file.filename;
    console.log(url);
    res.send({'msg':'sucsess'})
})

api.listen(9000,()=>{
    console.log("Server running http://localhost:9000")
})
*/
//require()
var express=require('express');
var cors=require('cors');
const mongoose=require('mongoose');
const multer= require("multer");
//express object
var api=express()
//cors object
api.use(cors())
api.use(express.urlencoded({extended: true}))
api.use(express.static("upload"))
//json
api.use(express.json())

api.use(express.urlencoded({extended:true}))

//table structure
const empStructure=new mongoose.Schema({fname:String,email:String,password:String})
const prodStructure=new mongoose.Schema({pid:Number,productName:String,category:String,price:Number,stock:Number})
const catgStructure=new mongoose.Schema({category:String})
const demo=mongoose.Schema({fileurl:String});
//create model
const empModel = new mongoose.model('employees',empStructure)
const prodModel = new mongoose.model('products',prodStructure)
const catgModel = new mongoose.model('category',catgStructure)
const demoM=mongoose.model('demoTable',demo);

//multer
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{cb(null,'upload')},
    filename:(req,file,cb)=>{cb(null,file.originalname)} 
});
//upload file
const upload = multer({storage:storage})

/*
api.post('/uploadimg', upload.single('file'), (req, res) => {
    const url = req.file.filename;
    console.log(url);
    res.send({ 'msg': 'success' });
  });
*/
api.post('/uploadimg', upload.single('file'), (req, res) => {
    try {
      const url = req.file.filename;
      console.log(url);
      // Save the file URL in the database
      const demoEntry = new demoM({
        fileurl: url,
      });
     demoEntry.save();
      // Respond with success message
      res.send({ msg: 'success' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Server error' });
    }
  });


//mongoose connection
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/empDB');
  console.log("Database Connected")
}
//server creation 
api.listen(9000,()=>{
    console.log("Server running http://localhost:9000")
})