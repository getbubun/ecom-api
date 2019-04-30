// Importing packages in our application

const fs = require('fs')
const express =  require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const appConfig = require('./config/appConfig')
const routeLogger = require('./middlewares/routeLogger');

//Creating application 

const app = express()


//middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(routeLogger.logIp);


//Bootstrap models

let modelsPath = './models'
fs.readdirSync(modelsPath).forEach(function (file){

    if (~file.indexOf('.js')){
        console.log(file)
        require(modelsPath + '/' + file)
    }
})
//End Bootstrap models



//Bootstrap Routes

let routesPath = './routes'
fs.readdirSync(routesPath).forEach(function (file){
    if (~file.indexOf('.js')){
        console.log('Including the following files')
        console.log(routesPath + '/' + file)
        let route = require(routesPath +'/' + file)
        route.setRouter(app)
    }
})
//End Bootstrap Routes


//Listening the server - creating a local server
    app.listen(appConfig.port, () => {
    console.log('Example app listening on port 3000!');

//Creating the mongo db connection here
    let db = mongoose.connect(appConfig.db.uri, { useMongoClient: true });

})


//Handling Mongoose connection error
mongoose.connection.on('error', function (err) {
    console.log('database connection error');
    console.log(err)

}); // end mongoose connection error



//Handling Mongoose success event
mongoose.connection.on('open', function (err) {
    if (err) {
        console.log("database error");
        console.log(err);

    } else {
        console.log("database connection open success");
    }

}); // end mongoose connection open handler