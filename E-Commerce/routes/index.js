const homeControllers = require('../controllers/home');

const categoriesRoutes = require('./categories');
const productsRoutes = require('./products');

const init = db => {
    const router = require('express').Router()
    router.get('/', homeControllers.getIndex(db));
    router.use(categoriesRoutes(db))
    router.use(productsRoutes(db))
    return router
};

module.exports = init;