const sharedFunctions = require('../utils/sharedFunctions');

const makeOrder = async(req,res) => {
    const data = req.body;

    var db = sharedFunctions.initializeDB();
    const uuid = await db.collection("tmp").doc().id;
    console.log(uuid);
    data['orderId'] = uuid;
    const response = await db.collection('MyOrder').doc(uuid).set(data);
    console.log(response);

    res.status(200).send({"message":"Record inserted successfully",uuid});
}

const makeCustomerEnrollment = async(req,res) => {
    const data = req.body;

    var db = sharedFunctions.initializeDB();
    const uuid = req.body.uid; //await db.collection("tmp").doc().id;
    console.log(uuid);
    const response = await db.collection('CustomerEnrollment').doc(uuid).set(data);
    console.log(response);

    res.status(200).send({"message":"Record inserted successfully",uuid});
}

const getUserInfoById = async(req,res) => {
    const uid = req.query.uid;
    var db = sharedFunctions.initializeDB();
    const response = await db.collection('CustomerEnrollment').doc(uid).get();
    const data = await response.data();
    res.status(200).send({...data});
}

const getOrderForUser = async(req,res) => {
    let uid = req.query.uid;
    var db = sharedFunctions.initializeDB();
    const response = await db.collection('MyOrder').where('uid','in',[uid]).get();
    let dataArray = [];
    response.forEach(data => {
        dataArray.push(data.data());
    });
    dataArray = dataArray.filter((data)=> data.status === 'Ordered');
    res.status(200).send(dataArray);
}

const getShippedOrderForUser = async(req,res) => {
    let uid = req.query.uid;
    var db = sharedFunctions.initializeDB();
    const response = await db.collection('MyOrder').where('uid','in',[uid]).get();
    let dataArray = [];
    response.forEach(data => {
        dataArray.push(data.data());
    });
    dataArray = dataArray.filter((data)=> data.status === 'Shipped');
    res.status(200).send(dataArray);
}

const getOrderById = async(req,res) => {
    let uid = req.query.uid;
    var db = sharedFunctions.initializeDB();
    const response = await db.collection('MyOrder').where('orderId','in',[uid]).get();
    let dataArray = [];
    response.forEach(data => {
        dataArray.push(data.data());
    });
    res.status(200).send(dataArray);
}

const getDeliveredOrderForUser = async(req,res) => {
    let uid = req.query.uid;
    var db = sharedFunctions.initializeDB();
    const response = await db.collection('MyOrder').where('uid','in',[uid]).get();
    let dataArray = [];
    response.forEach(data => {
        dataArray.push(data.data());
    });
    dataArray = dataArray.filter((data)=> data.status === 'Delivered');
    res.status(200).send(dataArray);
}

const getAllOrderData = async(req,res) => {
    let pageNo = req.query.pageNo;
    let pageSize = req.query.pageSize;

    var db = sharedFunctions.initializeDB();
    let response = await db.collection('MyOrder')
                            .where('status','in',['Ordered'])
                            .get();
                            
    const responseArray  = [];
    response.forEach((
        snap)=>{
        responseArray.push(snap.data());
    });
    res.status(200).send(responseArray);
}

const getShippedOrderData = async(req,res) => {
    let pageNo = req.query.pageNo;
    let pageSize = req.query.pageSize;

    var db = sharedFunctions.initializeDB();
    let response = await db.collection('MyOrder')
                            .where('status','in',['Shipped'])
                            .get();
                            
    const responseArray  = [];
    response.forEach((
        snap)=>{
        responseArray.push(snap.data());
    });
    res.status(200).send(responseArray);
}

const getDeliveredOrderData = async(req,res) => {
    let pageNo = req.query.pageNo;
    let pageSize = req.query.pageSize;

    var db = sharedFunctions.initializeDB();
    let response = await db.collection('MyOrder')
                            .where('status','in',['Delivered'])
                            .get();
                            
    const responseArray  = [];
    response.forEach((
        snap)=>{
        responseArray.push(snap.data());
    });
    res.status(200).send(responseArray);
}

const changeOrderStatus = async(req,res) => {
    const uid = req.query.uid;
    const status =  req.query.status;

    var db = sharedFunctions.initializeDB();
    let responseRef = await db.collection('MyOrder').doc(uid);

    let response = await responseRef.update({'status':status});

    res.status(200).send({'response':"Record updated sucessfully"});

}






module.exports = {makeOrder,makeCustomerEnrollment,getUserInfoById,getOrderForUser,getShippedOrderForUser
    ,getDeliveredOrderForUser,getOrderById,getAllOrderData,changeOrderStatus,getShippedOrderData,getDeliveredOrderData};