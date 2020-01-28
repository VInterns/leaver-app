const express     = require('express');
const app         = express();
const port        = 3050;
const MongoClient = require('mongodb').MongoClient;
const url         = "mongodb://localhost:27017/test";
var bodyParser = require('body-parser')
var dataa = [];
var userStatus = null;
//communcating with express to use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//create variable for db
var data = [];
var ddb = null;


//function to test given data to the stored data in the db
app.get('/',function(req,res){
MongoClient.connect(url,function(err,db){
        if(err){ throw err; }
        ddb = db.db("test");
        ddb.collection('user-data').find().toArray(function(err, result) {
          if (err) throw err;
          data=result;
          res.send({express: result})
          db.close();
          console.log(data);
});
});});

app.listen(port,()=> console.log(`listening to port: ${port}`))
//Unimportant comment