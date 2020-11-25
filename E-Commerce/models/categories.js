const slug = require('../utils/slug');

const getOneCategoryById = db => async(id) => {
    const oneCategoryById = await db('categories').select('*').where('id', id)
    return oneCategoryById
}

const getAllCategoriesWithSlug = db =>  async() => {
    const allCategories = await db('categories').select('*')   
    const allCategoriesWithSlug = allCategories.map( listCategory => {
        const newCategoryToSlug = {...listCategory, toSlug: slug(listCategory.category)}
        return newCategoryToSlug        
    })
    return allCategoriesWithSlug
}

module.exports = {
    getOneCategoryById,
    getAllCategoriesWithSlug,
}