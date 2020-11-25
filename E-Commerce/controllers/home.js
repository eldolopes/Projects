const productsModels = require('../models/products');

const getIndex =  db => async(req, res) => { 
    const allProductsStandard = await productsModels.getAllProductsStandard(db)()
    const allProductVariations = await productsModels.getAllProductVariations(db)() 
    res.render('home', {        
        allProductsStandard,
        allProductVariations
    })
};

module.exports = {
    getIndex
}