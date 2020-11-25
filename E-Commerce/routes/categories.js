const categoriesControllers = require('../controllers/categories');

const init = db => {
    const router = require('express').Router()
    router.get('/categoria/:id/:toSlug', categoriesControllers.getCategories(db))
    return router
};

module.exports = init;
