
var mongodb = require('mongodb');
url='mongodb://aneeshapunreddy:aneeshapunreddy@c870.candidate.51.mongolayer.com:10870/cmpe285project'
	
var db;
db = new mongodb.Db('cmpe285project', new mongodb.Server('c870.candidate.51.mongolayer.com', 10870, {auto_reconnect:true}), {});


function createGraph(callback, name)
{ 
//The 10056 is the port!
db = new mongodb.Db('cmpe285project', new mongodb.Server('c870.candidate.51.mongolayer.com', 10870, {auto_reconnect:true}), {});

db.open(function(err, p_client) {
	
  //Notice the USERNAME and PASSWORD!
  db.authenticate('aneeshapunreddy', 'aneeshapunreddy', function(err) {
   //Change error handler when going into production 
   if (err) console.log(err);
   else{
	   var collection1 = new mongodb.Collection(db, name);
	   var results = [];
	   
	   collection1.aggregate(
			   [
			     { $group: {
			         _id: {
			        	 VClass: "$VClass",
			        	 fuelCost08 : "$fuelCostPerAnnum",
			        	 year: "$year"
			         }, total_products: { $sum: 1 } } }
			   ],function(err,result) {
				   results.push(result);
				   callback(err,result);

			   });

   }
  });
});
}


exports.createGraph = createGraph;