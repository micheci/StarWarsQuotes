const express=require('express')
const app=express()

app.listen(3000,(req,res)=>{
    console.log("hi")
})
app.get('/',(req,res)=>{
    res.send("Hello world")
}
)