const express = require('express')
const productController = require('./../controllers/productController')
const appConfig = require("./../config/appConfig")

const logger = require("./../middlewares/routeLogger");
const authentication = require('./../middlewares/authentication')


let setRouter = (app) => {
    let baseUrl = appConfig.apiVersion+'/products';

    app.post(baseUrl+'/create',authentication.isAuthenticated,productController.createProduct);

    /**
 * @api {post} /api/v1/products/create Create/Add new Product details
 * @apiVersion 0.0.1
 * @apiGroup Create
 *
 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
 * @apiParam {String} productId ID of product passed as a URL parameter(Required)
 * @apiParam {String} name Name of product passed as a body parameter
 * @apiParam {String} description Description of product passed as a body parameter
 * @apiParam {Number} price Price of product passed as a body parameter
 * @apiParam {String} brand Brand of product passed as a body parameter
 * @apiParam {Boolean} cashOnDelivery Cash On Delivery option for product passed as a body parameter
 * @apiParam {String} category Category of product passed as a body parameter
 *
 *  @apiSuccessExample {json} Success-Response:
 *  {
        "error": false,
        "message": "Product Details created/added successfully",
        "status": 200,
        "data": [
            {
                "productId": "String",
                "title": "String",
                "description": "String",
                "price":  Number,
                "brand": "String",
                "cashOnDelivery": false,
                "category":  "String"
            }
        ]
    }
  @apiErrorExample {json} Error-Response:
 *
 * {
    "error": true,
    "message": "Failed to create product",
    "status": 500,
    "data": null
    }
 */

    app.get(baseUrl+'/all',authentication.isAuthenticated,productController.getAllProducts);

    /**
* @api {get} /api/v1/products/all Get All Products
* @apiVersion 0.0.1
* @apiGroup Read
*
* @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
*
*  @apiSuccessExample {json} Success-Response:
*
{
  "error": false,
  "message": "All Products Found",
  "status": 200,
  "data": [
      {
        "productId": "String",
        "title": "String",
        "description": "String",
        "price":  Number,
        "brand": "String",
        "cashOnDelivery": false,
        "category":  "String"
      }
  ]
}
@apiErrorExample {json} Error-Response:
*
* {
"error": true,
"message": "Failed to find product details",
"status": 500,
"data": null
}
{
"error": true,
"message": "No Product Found",
"status": 404,
"data": null
}
*/

    app.get(baseUrl+'/view/:productId',authentication.isAuthenticated,productController.viewByProductId);

    /**
 * @api {get} /api/v1/products/view/:productId Get Product Details by productId
 * @apiVersion 0.0.1
 * @apiGroup Read
 *
 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
 * @apiParam {String} productId ID of product passed as a URL parameter(Required)
 *
 *  @apiSuccessExample {json} Success-Response:
 *  {
        "error": false,
        "message": "Product found",
        "status": 200,
        "data": [
            {
              "productId": "String",
              "title": "String",
              "description": "String",
              "price":  Number,
              "brand": "String",
              "cashOnDelivery": false,
              "category":  "String"
            }
        ]
    }
  @apiErrorExample {json} Error-Response:
 *
 * {
    "error": true,
    "message": "Error Occured",
    "status": 500,
    "data": null
    }
    {
    "error": true,
    "message": "No Product Found with given ID",
    "status": 404,
    "data": null
   }
 */

    app.get(baseUrl+'/view/by/brand/:brand',authentication.isAuthenticated,productController.viewByBrand);

    /**
 * @api {get} /api/v1/products/view/by/brand/:brand Get Products by brand
 * @apiVersion 0.0.1
 * @apiGroup Read
 *
 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
 * @apiParam {String} brand name of product passed as a URL parameter(Required)
 *
 *  @apiSuccessExample {json} Success-Response:
 *  {
        "error": false,
        "message": "Products found",
        "status": 200,
        "data": [
            {
              "productId": "String",
              "title": "String",
              "description": "String",
              "price":  Number,
              "brand": "String",
              "cashOnDelivery": false,
              "category":  "String"
            }
        ]
    }
  @apiErrorExample {json} Error-Response:
 *
 * {
    "error": true,
    "message": "Error Occured",
    "status": 500,
    "data": null
    }
    {
    "error": true,
    "message": "No Product Found of given brand",
    "status": 404,
    "data": null
   }
 */

    app.get(baseUrl+'/view/by/category/:category',authentication.isAuthenticated,productController.viewByCategory);

    /**
 * @api {get} /api/v1/products/view/by/category/:category Get Products by category
 * @apiVersion 0.0.1
 * @apiGroup Read
 *
 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
 * @apiParam {String} category of product passed as a URL parameter(Required)
 *
 *  @apiSuccessExample {json} Success-Response:
 *  {
        "error": false,
        "message": "Products found",
        "status": 200,
        "data": [
            {
              "productId": "String",
              "title": "String",
              "description": "String",
              "price":  Number,
              "brand": "String",
              "cashOnDelivery": false,
              "category":  "String"
            }
        ]
    }
  @apiErrorExample {json} Error-Response:
 *
 * {
    "error": true,
    "message": "Error Occured",
    "status": 500,
    "data": null
    }
    {
    "error": true,
    "message": "No Product Found in given category",
    "status": 404,
    "data": null
   }
 */


    app.put(baseUrl+'/:productId/edit',authentication.isAuthenticated,productController.editProduct);

    /**
 * @api {put} /api/v1/products/:productId/edit Edit Product Details
 * @apiVersion 0.0.1
 * @apiGroup Edit
 *
 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
 * @apiParam {String} productId ID of product passed as a URL parameter(Required)
 * @apiParam {String} name Name of product passed as a body parameter
 * @apiParam {String} description Description of product passed as a body parameter
 * @apiParam {Number} price Price of product passed as a body parameter
 * @apiParam {String} brand Brand of product passed as a body parameter
 * @apiParam {Boolean} cashOnDelivery Cash On Delivery option for product passed as a body parameter
 * @apiParam {String} category Category of product passed as a body parameter
 *
 *  @apiSuccessExample {json} Success-Response:
 *  {
        "error": false,
        "message": "Product Details edited/updated successfully",
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
    "message": "Failed to edit product",
    "status": 500,
    "data": null
    }
    {
    "error": true,
    "message": "No Product Found",
    "status": 404,
    "data": null
   }
 */

 app.post(baseUrl+'/:productId/delete',authentication.isAuthenticated,productController.deleteProduct);

 /**
* @api {post} /api/v1/products/:productId/delete Delete Product Details
* @apiVersion 0.0.1
* @apiGroup Delete
*
* @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
* @apiParam {String} productId ID of product passed as a URL parameter(Required)
*
*  @apiSuccessExample {json} Success-Response:
     {
         "error": false,
         "message": "Product Deleted",
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
 "message": "Error Occured",
 "status": 500,
 "data": null
 }
 {
 "error": true,
 "message": "No Product Found",
 "status": 404,
 "data": null
}
*/





}// end setRouter function

module.exports = {
    setRouter: setRouter
}
