const express = require('express')
const mongoose = require('mongoose');
const shortid = require('shortid');

const logger = require('../libraries/loggerLib')

//Importing the model here
const ProductModel = mongoose.model('Product')

let getAllProducts = (req, res) => {
    ProductModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(`Error occured : ${err}`, 'Database', 10)
                res.send(err)
            } else if (result == undefined || result == null || result == '') {
                logger.info('No Product Found', 'Product Controller : getAllProducts')
                console.log('No Product Found')
                res.send("No Product Found")
            } else {
                logger.info('Displaying Products', 'Product Controller : getAllProducts')
                res.send(result)
            }
        })
}// end get all products

/**
 * function to view single product.
 */
let viewByProductId = (req, res) => {

    ProductModel.findOne({ 'productId': req.params.productId }, (err, result) => {

        if (err) {
            console.log(err)
            logger.error(`Error occured : ${err}`, 'Database', 10)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            logger.info('No Product Found', 'Product Controller : viewByProductId')
            console.log('No Product Found')
            res.send("No Product Found")
        } else {
            logger.info('Displaying The Product', 'Product Controller : viewByProductId')
            res.send(result)

        }
    })
}

/**
 * function to view products by category.
 */
let viewByCategory = (req, res) => {

    ProductModel.find({ 'category': req.params.category }, (err, result) => {

        if (err) {
            console.log(err)
            logger.error(`Error occured : ${err}`, 'Database', 10)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            logger.info('No Product Found', 'Product Controller : viewByCategory')
            console.log('No Product Found')
            res.send("No Product Found")
        } else {
            logger.info('Displaying The Products', 'Product Controller : viewByCategory')
            res.send(result)

        }
    })
}

/**
 * function to view products by brand.
 */
let viewByBrand = (req, res) => {

    ProductModel.find({ 'brand': req.params.brand }, (err, result) => {

        if (err) {
            console.log(err)
            logger.error(`Error occured : ${err}`, 'Database', 10)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            logger.info('No Product Found', 'Product Controller : viewByBrand')
            console.log('No product Found')
            res.send("No product Found")
        } else {
            res.send(result)
            logger.info('Displaying The Products', 'Product Controller : viewByBrand')
        }
    })
}

/**
 * function to edit product.
 */
let editProduct = (req, res) => {

    let options = req.body;
    console.log(options);
    ProductModel.update({ 'productId': req.params.productId }, options, { multi: true }).exec((err, result) => {

        if (err) {
            console.log(err)
            logger.error(`Error occured : ${err}`, 'Database', 10)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            logger.info('No Product Found', 'Product Controller : editProduct')
            console.log('No Product Found')
            res.send("No Product Found")
        } else {
            res.send(result)
            logger.info('Product Edited', 'Product Controller : editProduct')
        }
    })
}



/**
 * function to delete the product
 */
let deleteProduct = (req, res) => {
    ProductModel.remove({ 'productId': req.params.productId }, (err, result) => {
        if (err) {
            console.log(err)
            logger.error(`Error occured : ${err}`, 'Database', 10)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            logger.info('No Product Found', 'Product Controller : deleteProduct')
            console.log('No Product Found')
            res.send("No Product Found")
        } else {
            res.send(result)
            logger.info('Product Deleted', 'Product Controller : deleteProduct')
        }
    })
}

/**
 * function to create the product.
 */
let createProduct = (req, res) => {
    let productId = shortid.generate()

    let newProduct = new ProductModel({

        productId: productId,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        brand: req.body.brand,
        cashOnDelivery: req.body.cashOnDelivery
    }) // end new product model


    newProduct.save((err, result) => {
        if (err) {
            console.log(err)
            logger.error(`Error occured : ${err}`, 'Database', 10)
            res.send(err)
        } else {
            res.send(result)
            logger.info('Product created', 'Product Controller : createProduct')
        }
    }) // end new product save
}




module.exports = {
    getAllProducts: getAllProducts,
    createProduct: createProduct,
    viewByProductId: viewByProductId,
    viewByCategory: viewByCategory,
    viewByBrand: viewByBrand,
    editProduct: editProduct,
    deleteProduct: deleteProduct
}
