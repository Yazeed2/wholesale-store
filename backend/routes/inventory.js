const express = require ('express')
const router = express.Router()
const passport = require('passport')
const db = require('../db/db')


// create inventory 
router.post('/',passport.authenticate('jwt', {session: false}) , async(req, res)=> { 
    const {user , body} = req
    if(user.userType !== 'store') return res.status(401).json({code: 'unauthorized', msg: "user has to be a store to be able to create an inventory"})
    const  {minQtyPrice, maxQtyPrice, pricePerQty, name} = body 
    
    try{ 
        await db('inventory').insert({name, store_id:user.id, price_per_qty:pricePerQty, max_qty_price:maxQtyPrice , min_qty_price: minQtyPrice})
        res.status(200).json({code:'success', msg:'inventory created successfully'})
    }catch (err){ 
        console.log({err})
        res.status(500).json({code:'server Error',  msg:err})
    }

})
// edit inventory :id
// get inventory :id 
// get inventory :storeId 



module.exports = router; 