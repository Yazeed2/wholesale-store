require('dotenv').config() 
const express = require('express')
const PORT = process.env.PORT || 5050 
const app = express()
const router = require('./routes/index.js')
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(router)
console.log( process.env.DB_NAME, process.env.DB_USERNAME ,
    process.env.DB_PASSWORD )
app.listen(PORT, ()=>console.log(`server is running on ${PORT} 🔥`));