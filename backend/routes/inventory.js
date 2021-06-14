const { response } = require('express')
const express = require ('express')
const router = express.Router()
const passport = require('passport')
const db = require('../db/db')
const snakeToCamel = require('../config/camelSnake')

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
router.put('/:id',passport.authenticate('jwt', {session: false}) , async(req, res)=> { 
    const {user , body, params} = req
    const inventory_id = params.id
    if(user.userType !== 'store') return res.status(401).json({code: 'unauthorized', msg: "user has to be a store to be able to edit an inventory"})
    const  {minQtyPrice, maxQtyPrice, pricePerQty, name} = body 
    let edit = {}
    if (name)edit.name =name
    if (pricePerQty)edit.price_per_qty =pricePerQty
    if (minQtyPrice)edit.min_qty_price =minQtyPrice
    if (maxQtyPrice)edit.max_qty_price =maxQtyPrice
    try{ 
        const oldInventory = await db('inventory').where({id:inventory_id}).first()
        if(oldInventory.store_id != user.id ) return res.status(401).json({code: 'unauthorized', msg: "this inventory does not belong to this store"})
        await db('inventory').where({id:inventory_id}).update(edit)
        res.status(200).json({code:'success', msg:'inventory created successfully'})
    }catch (err){ 
        console.log({err})
        res.status(500).json({code:'server Error',  msg:err})
    }
})

// get inventory :id 
router.get('/:id',async (req, res)=> { 
    const {id} = req.params 

    try{ 
    let inventory = await db('inventory').where({id}).first()
    inventory = snakeToCamel(inventory)
    res.status(200).json({code:'success', inventory})
    }catch (err){ 
    console.log({err})
    res.status(500).json({code:'server Error',  msg:err})
}
})

// get inventory :storeId 
router.get('/store/:storeId', async (req, res)=> { 
    const {storeId} = req.params
    try{ 
    let inventories = await db('inventory').where({store_id: storeId})
    inventories= inventories.map(inv => snakeToCamel(inv))
    res.status(200).json({code:'success', inventories})

    }catch (err){ 
    console.log({err})
    res.status(500).json({code:'server Error',  msg:err})
}
})


module.exports = router; 