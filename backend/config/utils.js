const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config({path: "../.env"})

const issueJWT = (user) =>  {
    const id = user.id;
  
    const expiresIn = '1d';
  
    const payload = {
      sub: id,
      iat: Date.now()
    };
  
    const signedToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET , { expiresIn: expiresIn });
   
    return {
      token: "Bearer " + signedToken,
      expires: expiresIn
    } 
  }
  
  
  module.exports = issueJWT