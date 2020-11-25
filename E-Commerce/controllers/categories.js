const categoryModels = require('../models/categories');
const productsModels = require('../models/products');

const getCategories = db => async(req, res) => {
    const allProductsByCategoryId = await productsModels.getAllProductsByCategoryId(db)(req.params.id)
    const oneCategoryById = await categoryModels.getOneCategoryById(db)(req.params.id) 
        res.render('categoria', {
        allProductsByCategoryId,
        oneCategoryById,            
    })
}

module.exports = {
    getCategories
}