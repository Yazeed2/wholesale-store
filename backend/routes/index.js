const express = require ('express')
const router = express.Router()
const authRoute = require('./auth')
const inventoryRoute = require('./inventory')

router.use('/auth', authRoute)
router.use('/inventory', inventoryRoute)

module.exports = router; 