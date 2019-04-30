const express = require('express')
const mongoose = require('mongoose');
const shortid = require('shortid');

const logger = require('./../libraries/loggerLib')
const time = require('./../libraries/timeLib')

//Importing the model here
const CartModel = mongoose.model('Cart')

let viewCart = (req, res) => {
    CartModel.find({ 'userId': req.params.userId })
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(`Error occured : ${err}`, 'Database', 10)
                res.send(err)
            } else if (result == undefined || result == null || result == '') {
                logger.info('No Cart Item Found', 'Cart Controller : viewCart')
                console.log('No cart item Found')
                res.send("No cart item Found")
            } else {
                res.send(result)
                logger.info('Displaying Cart Info', 'Cart Controller : viewCart')
            }
        })
}// end view cart

/**
 * function to edit cart.
 */
let editCart = (req, res) => {

    let options = req.body;
    console.log(options);
    CartModel.update({ 'userId': req.params.userId,'productId': req.params.productId }, options, { multi: true }).exec((err, result) => {

        if (err) {
            console.log(err)
            logger.error(`Error occured : ${err}`, 'Database', 10)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            logger.info('No Cart Item Found', 'Cart Controller : editCart')
            console.log('No cart item Found')
            res.send("No cart item Found")
        } else {
            res.send(result)
            console.log('Product Edited Successfully')
            logger.info('Product Edited Successfully', 'Cart Controller : editCart')
        }
    })
}

/**
 * function to delete the product
 */
let removeFromCart = (req, res) => {
    CartModel.remove({ 'userId': req.params.userId,'productId': req.params.productId }, (err, result) => {
        if (err) {
            console.log(err)
            logger.error(`Error occured : ${err}`, 'Database', 10)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            logger.info('No Cart Item Found', 'Cart Controller : removeFromCart')
            console.log('No Cart Item Found')
            res.send("No Cart Item Found")
        } else {
            res.send(result)
            console.log('Product Removed Successfully')
            logger.info('Product Removed Successfully', 'Cart Controller : removeFromCart')
        }
    })
}

/**
 * function to create the product.
 */
let addToCart = (req, res) => {

  var today = time.getLocalTime()

    let cartItems = new CartModel({

      userId: req.params.userId,
      productId: req.body.productId,
      quantity: req.body.quantity,
      created: today,
      lastModified: today
    }) // end new product model


    cartItems.save((err, result) => {
        if (err) {
            console.log(err)
            logger.error(`Error occured : ${err}`, 'Database', 10)
            res.send(err)
        } else {
            res.send(result)
            logger.info('Added Successfully', 'Cart Controller : addToCart')
        }
    }) // end new product save
}


module.exports = {
    viewCart: viewCart,
    editCart: editCart,
    removeFromCart: removeFromCart,
    addToCart: addToCart
}
