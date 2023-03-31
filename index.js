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

app.route("/customer/enroll")
    .post(postOrder.makeCustomerEnrollment);


app.route("/customer/get")
    .get(postOrder.getUserInfoById);

app.route("/order/getForUser")
    .get(postOrder.getOrderForUser);

app.route("/order/getShippedOrderForUser")
    .get(postOrder.getShippedOrderForUser);

app.route("/order/getDeliveredOrderForUser")
    .get(postOrder.getDeliveredOrderForUser);

app.route("/order/getOrderById")
    .get(postOrder.getOrderById);

app.route("/order/getAllOrder")
    .get(postOrder.getAllOrderData);

app.route("/order/getShippedOrder")
    .get(postOrder.getShippedOrderData);

app.route("/order/getDeliveredOrder")
    .get(postOrder.getDeliveredOrderData);

app.route("/order/changeOrderStatus")
    .put(postOrder.changeOrderStatus);

var server = app.listen(port,() => {
    console.log(`App running on port ${port}`)
});
server.setTimeout(3000000);
