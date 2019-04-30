const express = require('express')
const cartController = require('./../controllers/cartController')
const appConfig = require("./../config/appConfig")

const logger = require("./../middlewares/routeLogger");
const authentication = require('./../middlewares/authentication')

let setRouter = (app) => {
    let baseUrl = appConfig.apiVersion+'/cart';

    app.post(baseUrl+'/:userId/add',authentication.isAuthenticated,cartController.addToCart);

    /**
 * @api {post} /api/v1/cart/:userId/add Add new Product to cart
 * @apiVersion 0.0.1
 * @apiGroup Create
 *
 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
 * @apiParam {String} userId ID of user passed as a URL parameter(Required)
 * @apiParam {String} productId ID of product passed as a body parameter
 * @apiParam {Number} quantity Quantity of product passed as a body parameter
 *
 *  @apiSuccessExample {json} Success-Response:
 *  {
        "error": false,
        "message": "Product added to cart successfully",
        "status": 200,
        "data": [
            {
              "userId": "String",
              "productId": "String",
              "quantity": Number,
              "created": "Date",
              "lastModified": "Date"
            }
        ]
    }
    @apiErrorExample {json} Error-Response:
  	 *
  	 * {
  	    "error": true,
  	    "message": "Error Occured.",
  	    "status": 500,
  	    "data": null
         }
         {
  	    "error": true,
  	    "message": "required parameters are missing",
  	    "status": 403,
  	    "data": null
  	   }
 */

    app.get(baseUrl+'/:userId/viewcart',authentication.isAuthenticated,cartController.viewCart);

    /**
	 * @api {get} /api/v1/cart/:userId/viewcart View the all items of user's cart
	 * @apiVersion 0.0.1
	 * @apiGroup Read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} userId user Id passed as a URL parameter(Required)
     *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
            "error": false,
            "message": "Displaying Cart items",
            "status": 200,
            "data": [
                {
                    "userId": "String",
                    "productId": "String",
                    "quantity": Number,
                    "created": "Date",
                    "lastModified": "Date"
                }
            ]
        }
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
       }
       {
	    "error": true,
	    "message": "Cart items not found",
	    "status": 404,
	    "data": null
	   }
	 */


    app.put(baseUrl+'/:userId/:productId/edit',authentication.isAuthenticated,cartController.editCart);

    /**
	 * @api {put} /api/v1/cart/:userId/:productId/edit Edit the quantity of product from user's cart
	 * @apiVersion 0.0.1
	 * @apiGroup Edit
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productId Product Id passed as a URL parameter(Required)
	 * @apiParam {String} userId User Id passed as a URL parameter(Required)
	 * @apiParam {Number} quantity Quantity of product passed as a body parameter(Required)
     *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
            "error": false,
            "message": "Product Edited Successfully.",
            "status": 200,
            "data": {
                "n": 1,
                "nModified": 1,
                "ok": 1
            }
        }
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
       }
       {
	    "error": true,
	    "message": "Product not found",
	    "status": 404,
	    "data": null
	   }
	 */


    app.post(baseUrl+'/:userId/:productId/delete',authentication.isAuthenticated,cartController.removeFromCart);

    /**
	 * @api {post} /api/v1/cart/:userId/:productId/delete Delete product from user's cart
	 * @apiVersion 0.0.1
	 * @apiGroup Delete
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productId product Id passed as a URL parameter(Required)
	 * @apiParam {String} userId user Id passed as a URL parameter(Required)
     *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
            "error": false,
            "message": "Product Deleted Successfully",
            "status": 200,
            "data": {
                "n": 1,
                "ok": 1
            }
        }
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
       }
       {
	    "error": true,
	    "message": "Product not found",
	    "status": 404,
	    "data": null
	   }
	 */



}// end setRouter function

module.exports = {
    setRouter: setRouter
}
