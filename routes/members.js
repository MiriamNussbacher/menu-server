const express = require('express')
const router = express.Router()
const controller = require('../controllers/members')

router.get('/:id',controller.getMemberById )
router.get('/', controller.getAll)

module.exports=router