const express = require ('express')
const router = express.Router()
const snakeToCamel = require('../config/camelSnake')
const db = require('../db/db')

router.get('/', async (req, res)=> { 
        try{ 
        let stores = await db('users').where({user_type: 'store'})
        stores= stores.map(store => {
            delete store.password
            return snakeToCamel(store)
        })
        res.status(200).json({code:'success', stores})
    
        }catch (err){ 
        console.log({err})
        res.status(500).json({code:'server Error',  msg:err})
    }
    })
module.exports = router; 