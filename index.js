const sharedFunctions = require('./utils/sharedFunctions');
const express = require('express');
var compression = require('compression');
const cors = require('cors');
const app = express();
app.use(cors());

const postOrder = require('./app/postOrder');

const port = process.env.PORT || 8080;

app.use(express.json({limit:'100mb'}));
app.use(express.urlencoded({limit:'100mb'}));
app.use(compression());


app.route("/order/post")
    .post(postOrder.makeOrder);


var server = app.listen(port,() => {
    console.log(`App running on port ${port}`)
});
server.setTimeout(3000000);
