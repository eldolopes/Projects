const express =require('express');
const path = require('path');
const app = express();

const init = db => {
//VIEWS ENGINE
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//MIDDLEWARE
const categoriesModels = require('./models/categories');
app.use(async(req, res, next) => {
    const allCategoriesWithSlug = await categoriesModels.getAllCategoriesWithSlug(db)()
    res.locals = {
        allCategoriesWithSlug
    }
    next()
});

//ROUTES
const routes = require('./routes/index');
app.use(routes(db));

//STATIC
app.use(express.static('public'));

return app
};

module.exports = init;