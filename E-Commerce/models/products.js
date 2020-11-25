const getAllProductsByCategoryId = db => async(id) => {
        
    const allProducts = await db('products').select('*')
    .where('id', function () {
        this
        .select('categories_products.products_id')
        .from('categories_products')
        .whereRaw('categories_products.products_id = products.id')
        .where('categories_id', id)         
    })   
    return allProducts
}

const getAllProductsStandard = db => async() => {
    const allProductsStandard = await db('products').select('*')
    return allProductsStandard
}

const getOneProductById = db => async(id) => {
    const oneProductById = await db('products').select('*')
    .where('id', id)
    return oneProductById[0]    
}

const getProductVariationsById = db => async(id) => {
    const productVariationsById = await db('product_variations').select('*')
    .where('id', id)
    return productVariationsById[0]
}

const getAllProductVariations = db => async() => {
const productVariationsById = await db('product_variations').select('*')
return productVariationsById
}

module.exports = {
    getAllProductsByCategoryId,
    getAllProductsStandard,
    getOneProductById,
    getProductVariationsById,
    getAllProductVariations
}
