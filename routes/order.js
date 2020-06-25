const express = require('express')
const router = express.Router()

const OrderController = require('../controllers/OrderController')

router.post('/addOrder' , OrderController.addOrder)

module.exports = router