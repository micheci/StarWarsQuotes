const express=require('express')
const bodyParser=require('body-parser')
const app=express()
const MongoClient=require('mongodb').MongoClient
const connectionString='mongodb+srv://Micheci:Micheci12!@cluster0.6tapr9t.mongodb.net/?retryWrites=true&w=majority'


MongoClient.connect(connectionString,(err,client)=>{
    if (err)return console.error(err)
    console.log("connected to database")
})
app.use(bodyParser.urlencoded({extended:true}))

app.listen(3000,(req,res)=>{
    console.log("hi")
})
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
}
)
app.post('/quotes',(req,res)=>{
console.log(req.body)
})