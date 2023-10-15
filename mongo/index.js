const { productSchema, categoriesSchema } = require("./schema");
const repository = require("./repository");

const mongoose = require("mongoose");

function start(uri)
{
    mongoose.set('runValidators', true);
    mongoose.pluralize(null); // disable mongo pluralizing collections
    mongoose.connect(uri);

    repository.Product = mongoose.model('product', productSchema);
    repository.Categories = mongoose.model('categories', categoriesSchema);

    return mongoose;
}

module.exports = {
    start,
    repository
}