const sharedFunctions = require('../utils/sharedFunctions');

const makeOrder = async(req,res) => {
    const data = req.body;

    var db = sharedFunctions.initializeDB();
    const uuid = await db.collection("tmp").doc().id;
    console.log(uuid);
    const response = await db.collection('MyOrder').doc(uuid).set(data);
    console.log(response);

    res.status(200).send({"message":"Record inserted successfully",uuid});
}

module.exports = {makeOrder};