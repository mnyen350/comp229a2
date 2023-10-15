const mongoose = require('mongoose');
const { Schema } = mongoose;
const { categoryExists } = require('./utility');

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { 
    type: String, 
    required: true,
    validate: {
      validator: async (value) => await categoryExists(value),
      message: ({ value }) => `Category ${value} does not exist.`
    } 
  }
});

const categoriesSchema = new Schema({
  name: String
});

module.exports = {
  productSchema,
  categoriesSchema
};