const express = require('express')
const router = express.Router()

const teachersControllers = require('../controllers/teachers')

const init = () => {
    router.get('/', (req, res) => {
        return res.render('index')
    })
    router.get('/study', teachersControllers.teachers())

    router.get('/give-classes', teachersControllers.giveClasses())
        
    return router
}


module.exports = init