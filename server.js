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
        app.set('view engine','ejs')

        app.use(bodyParser.urlencoded({extended:true}))
        app.use(express.static('public'))
        app.use(bodyParser.json())

        app.get('/',(req,res)=>{
            quotesCollection.find().toArray()
                .then(results=>{
                    console.log(results)
                    res.render('index.ejs',{quotes:results})//returns html to response
                })
                .catch(error=>console.error(error))
           })

        app.post('/quotes',(req,res)=>{
            quotesCollection.insertOne(req.body)
                .then(result=>{
                    console.log(result)
                    res.redirect('/')})
                .catch(error=>console.error(error))
            })

        app.put('/quotes',(req,res)=>{
            quotesCollection.findOneAndUpdate(
                {name:'Yoda'},
                {
                    $set:{
                        name:req.body.name,
                        quote:req.body.quote
                    }
                },
                {
                    upsert:true
                }
            ) 
            .then(result=>{
                console.log(result)
                res.json('Success')
            })           
            .catch(error=>console.error(error))
        })    

        app.listen(3000,(req,res)=>{
            console.log("hi")
        })




    })
    .catch(error=>console.error(error))

//gets values and puts them into html object


