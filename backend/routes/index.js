const express = require ('express')
const router = express.Router()
const authRoute = require('./auth')
const inventoryRoute = require('./inventory')
const storeRoute = require('./store')

router.use('/auth', authRoute)
router.use('/inventory', inventoryRoute)
router.use('/store', storeRoute)

module.exports = router; 