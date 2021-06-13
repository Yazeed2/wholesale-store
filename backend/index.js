require('dotenv').config() 
const express = require('express')
const PORT = process.env.PORT || 5050 
const app = express()
const router = require('./routes/index.js')
const passport = require('passport');
const cors = require('cors');
const strategy = require('./config/passportConfig')


app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(cors())

passport.use(strategy)
app.use(passport.initialize());
app.use(router)

app.listen(PORT, ()=>console.log(`server is running on ${PORT} 🔥`));