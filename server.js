const express=require('express')
const bodyParser=require('body-parser')
const app=express()
const MongoClient=require('mongodb').MongoClient
const connectionString='mongodb+srv://Micheci:Micheci12!@cluster0.6tapr9t.mongodb.net/?retryWrites=true&w=majority'


// MongoClient.connect(connectionString,(err,client)=>{
//     if (err)return console.error(err)
//     console.log("connected to database")
// })
MongoClient.connect(connectionString,{useUnifiedtopology:true})
    .then(client=>{
        console.log("connected to database")
        const db=client.db('star-wars-quotes')
        const quotesCollection=db.collection('quotes')
       
        app.use(bodyParser.urlencoded({extended:true}))

        app.get('/',(req,res)=>{
            res.sendFile(__dirname+'/index.html') })

        app.post('/quotes',(req,res)=>{
            quotesCollection.insertOne(req.body)
                .then(result=>{
                    console.log(result)})
                .catch(error=>console.error(error))
            })

        app.listen(3000,(req,res)=>{
            console.log("hi")
        })



    })
    .catch(error=>console.error(error))

//gets values and puts them into html object


