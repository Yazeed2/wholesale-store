const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy; 
const ExtractJwt = require('passport-jwt').ExtractJwt; 
const bcrypt = require('bcryptjs')
const db = require('../db/db')
require('dotenv').config({path: "../.env"})




  
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET , 

};

const strategy  = new JwtStrategy(options,async (payload, done)=> { 
    try { 
        const id = payload.sub
        const user = await db('users').select('*').where({id}).first()
        delete user.password
        if(!user) return done(null, false)
        return done(null, user)
}catch (err){ 
    return done(err, null)
}
})

module.exports = strategy