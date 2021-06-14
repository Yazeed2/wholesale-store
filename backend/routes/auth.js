const express = require ('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const issueJWT = require('../config/utils')
const db = require('../db/db')
const snakeToCamel = require('../config/camelSnake')


router.post('/login', async(req, res)=> {   
    const {username, password} = req.body
try{ 

    const user = await db('users').select('*').where({username}).first()
    if( !user){ 
        res.status(401).json({code: 'unauthorized', msg: 'username or password are wrong'})
    }
    const auth = await bcrypt.compareSync( password, user.password)
    if(auth){ 
        delete user.password 
        const tokenObj = issueJWT(user)

        const userObj = snakeToCamel(user)
        res.status(200).json({token: tokenObj.token,user:userObj, expiresIn: tokenObj.expires })
    }else{ 
        res.status(401).json({code: 'unauthorized', msg: 'username or password are wrong' })

    }
}catch (err) { 
    console.log({err})
    res.status(500).json({code:'server Error',  msg:err})
}

})

router.post('/register', async (req, res)=> {   
    const {password, username, userType} = req.body 
    try{

        bcrypt.hash(password, 10, async(err, hash)=> { 
            if(err) return res.status(500).json({code:'server Error',  msg:err})
            try{ 
            const [newUserId] = await db('users').insert({password: hash, username, user_type: userType}).returning('id')
            const user = {id: newUserId, username, userType}
            const jwt = issueJWT(user)
            res.status(200).json({token: jwt.token, user})
              }catch (err) { 
                if(err.code == "23505" ) return res.status(401).json({code: 'duplicate username', msg: 'username is found please use another username' })
                res.status(500).json({code:'server Error',  msg:err})
            }
        }) 
    }catch (err) { 

        return res.status(500).json({code:'server Error',  msg:err})
    }
})

router.get('/', passport.authenticate('jwt', {session: false}) , (req, res) => { 
    let {user} = req 
    user = snakeToCamel(user)
    res.status(200).json({ code: 'authenticated', user})


})
module.exports = router; 