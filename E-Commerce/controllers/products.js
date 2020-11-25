const productsModels = require('../models/products');

const getProducts = db =>  async(req, res) => {
    const oneProductById = await productsModels.getOneProductById(db)(req.params.id)
    const productVariationsById = await productsModels.getProductVariationsById(db)(req.params.id)
    res.render('produto-detalhado', {
        oneProductById,
        productVariationsById
    })
    console.log(oneProductById)
    console.log(productVariationsById)
};




module.exports = {
    getProducts
};