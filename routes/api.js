const express = require('express');
const router = express.Router();
const { repository } = require('../mongo');

// /products?abc=123&efg=456
// if parameter is given via the "?" then it's 
// req.query.abc -- 123
// req.query.efg -- 456
//
// /products/:id/:id2/bob/:id3
// /products/123/456/bob/789
// if marked with ":" then it's given via req.params, e.g. 
// req.params.id --  123
// req.params.id2 -- 456
// req.paramsi -- 789
//
// POST, PUT, DELETE (kind of difficult to make these requests easily in browser, which is why we use postman)
// if it's one of these type of requests, then it's given via req.body

//
// GET
//

router.get('/products', async function (req, res, next) {
  const { name } = req.query;
  const { Product } = repository;

  const filter = name ? { name: { $regex: name } } : {};
  const result = await Product.find(filter);

  res.contentType('application/json');
  return res.send(JSON.stringify({ 'result': result }));
});

router.get('/products/:id', async function (req, res, next) {
  const { id } = req.params;
  const { Product } = repository;

  // looking for a Product where it has a field named _id, which has a value of id(that was given in the url)\
  const result = await Product.findOne({ _id: id });

  res.contentType('application/json');
  return res.send(JSON.stringify({ 'result': result }));
});

//
// POST
//

router.post('/products', async function (req, res, next) {
  const { name, description, price, quantity, category } = req.body;
  const { Product } = repository;

  try {
    const product = new Product({
      'name': name,
      'description': description,
      'price': price,
      'quantity': quantity,
      'category': category
    });

    const result = await product.save();

    res.contentType('application/json');
    return res.send(JSON.stringify({ 'result': result }));
  }
  catch (ex) {
    const message = ex.toString();
    res.contentType('application/json');
    return res.send(JSON.stringify({ 'error': message }));
  }
});

//
// PUT
//

router.put('/products/:id', async function (req, res, next) {
  const { id } = req.params;
  const { name, description, price, quantity, category } = req.body;
  const { Product } = repository;

  try {
    const result = await Product.updateOne({ _id: id }, {
      'name': name,
      'description': description,
      'price': price,
      'quantity': quantity,
      'category': category
    });

    res.contentType('application/json');
    return res.send(JSON.stringify({ 'result': result }));
  }
  catch (ex) {
    const message = ex.toString();
    res.contentType('application/json');
    return res.send(JSON.stringify({ 'error': message }));
  }
});

//
// DELETE
//

router.delete('/products/:id', async function (req, res, next) {
  const { id } = req.params
  const { Product } = repository;

  const result = await Product.deleteOne({ _id: id });

  res.contentType('application/json');
  return res.send(JSON.stringify({ 'result': result }));
});

router.delete('/products', async function (req, res, next) {
  const { Product } = repository;

  const result = await Product.deleteMany({});

  res.contentType('application/json');
  return res.send(JSON.stringify({ 'result': result }));
});


module.exports = router;
