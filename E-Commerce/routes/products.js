const productsControllers = require('../controllers/products');

const init = db => {   
    const router = require('express').Router()
    router.get('/produto/:id/:toSlug', productsControllers.getProducts(db))
    return router
};

module.exports = init;