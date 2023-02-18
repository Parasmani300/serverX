var admin = require("firebase-admin");

var db = null;
function initializeDB(){
    if(db == null){
        var project_id = process.env.projectId || 'paras-mani';
        var isCredentialRequired = JSON.parse(process.env.isCredentialRequired || "false");

        if(isCredentialRequired){

        }else{
            var serviceAccount = require(__dirname + "/vpart-ccd34-firebase-adminsdk-vpu51-bc9046e293.json");
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: "https://paras-mani.firebaseio.com"
              });
            
            db = admin.firestore();
        }
    }

    return db;
}


module.exports = {initializeDB};