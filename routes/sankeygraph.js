
var mongodb = require('mongodb');
url='mongodb://aneeshapunreddy:aneeshapunreddy@c870.candidate.51.mongolayer.com:10870/cmpe285project'
	
var db;
db = new mongodb.Db('cmpe285project', new mongodb.Server('c870.candidate.51.mongolayer.com', 10870, {auto_reconnect:true}), {});

function createGraph(callback, name)
{ 
//The 10796 is the port!
db = new mongodb.Db('cmpe285project', new mongodb.Server('c870.candidate.51.mongolayer.com', 10870, {auto_reconnect:true}), {});

db.open(function(err, p_client) {
	
  //Notice the USERNAME and PASSWORD!
  db.authenticate('aneeshapunreddy', 'aneeshapunreddy', function(err) {
   //Change error handler when going into production 
   if (err) console.log(err);
   else{
       var collection1 = new mongodb.Collection(db, name);
       var results2013 = [];
       var results2014 = [];
       var results2015 = [];
 
                                   // Get All drive type for year 2013
								   collection1.aggregate(
										   [
										     {$match : {year : 2013}},
                                             { $group: { _id: "$driveType", total_products: { $sum: 1 } } }
                                               
										   ],function(err,result) {
											   results2013.push(result);
                                               //console.log(results2013);
                                              // Get All drive type for year 2014
                                               collection1.aggregate(
                                               [
                                                 {$match : {year : 2014}},
                                                 { $group: { _id: "$driveType", total_products: { $sum: 1 } } }
                                                   
                                               ],function(err,result) {
                                                   results2014.push(result);
                                                   //console.log(results2014);
                                                   // Get All drive type for year 2015
                                                   collection1.aggregate(
                                                   [
                                                     {$match : {year : 2015}},
                                                     { $group: { _id: "$driveType", total_products: { $sum: 1 } } }
                                                       
                                                   ],function(err,result) {
                                                       
                                                       results2015.push(result);
                                                       //console.log(results2015);
                                                       callback(err, results2013, results2014, results2015);

                                                    }); 
                                                   
                                               });
                                               
										   });
				  
	       }   
        });
    });
}

exports.createGraph = createGraph;
