
/**
 * Module dependencies.
 */

var express = require('express')
 // , routes = require('./routes')
  , bar = require('./routes/barGraph')
  , bubble = require('./routes/bubbleGraph')
  , modelBar = require('./routes/modelBarGraph')
  , pie = require('./routes/piegraph')
  , sankey = require('./routes/sankeygraph')
  , http = require('http')
  , ejs = require("ejs")
  , fs = require('fs')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


//get
app.get('/', function(req, res){
  ejs.renderFile('./views/index.html',function(err, result) {
	  console.log("yoddle");
		// render on success
		if (!err) {
			res.end(result);
		}
		// render or error
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
  
});

var title = 'Car Dashboard Design';
var output1 = '';
var output2 = '';
var output3 = '';


app.get('/audi', function(req, res){
	ejs.renderFile('./views/audi.ejs',function(err, result) {
		// render on success
		if (!err) {
			res.end(result);
		}
		// render or error
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
});

app.get('/jaguar', function(req, res){
        ejs.renderFile('./views/jaguar.ejs',function(err, result) {
                // render on success
                if (!err) {
                        res.end(result);
                }
                // render or error
                else {
                        res.end('An error occurred');
                        console.log(err);
                }
        });
});


app.get('/porche', function(req, res){
        ejs.renderFile('./views/porche.ejs',function(err, result) {
                // render on success
                if (!err) {
                        res.end(result);
                }
                // render or error
                else {
                        res.end('An error occurred');
                        console.log(err);
                }
        });
});

app.get('/:car/barGraph', function (req, res) {
	var car = req.params.car;
	console.log("name of " + car);
	var name = "";
	var file = "/../images/mercedes.jpg";
	var carName = 'Mercedes';
	
    console.log(car);
	if(car=="jaguar") {
		name = "jaguarCollection";
		file = './views/jaguarMileageBarGraph.ejs'
		carName = 'Jaguar';
	}	
	else if(car=="audi"){
		name = "audiCollection";
		file = './views/audiMileageBarGraph.ejs'
		carName = 'Audi';
	}	
	else if(car=="porche"){
		name = "porcheCollection";
		file = './views/porcheMileageBarGraph.ejs'
		carName = 'Porche';
	}	
	bar.createGraph(function(err,results){
		if(err){
			throw err;
		}else{
			ejs.renderFile(file,
					{title : title, output1 : results, output2 : file, output3 : carName},	//sending results to user
					function(err, result) {
				// render on success
				if (!err) {
					res.end(result);
				}
				// render or error
				else {
					res.end('An error occurred');
					console.log(err);
				}
			});
		}
	}, name);
});


app.get('/:car/modelBarGraph', function (req, res) {
	var car = req.params.car;
	console.log("name of " + car);
	var name = "";
	var file = "/../images/mercedes.jpg";
	var carName = 'Mercedes';
	
    console.log(car);
	if(car=="jaguar") {
		name = "jaguarCollection";
		file = './views/jaguarBarGraph.ejs'
		carName = 'Jaguar';
	}	
	else if(car=="audi"){
		name = "audiCollection";
		file = './views/audiBarGraph.ejs'
		carName = 'Audi';
	}	
	else if(car=="porche"){
		name = "porcheCollection";
		file = './views/porcheBarGraph.ejs'
		carName = 'Porche';
	}	
	modelBar.createGraph(function(err,results){
		if(err){
			throw err;
		}else{
			ejs.renderFile(file,
					{title : title, output1 : results, output2 : file, output3 : carName},	//sending results to user
					function(err, result) {
				// render on success
				if (!err) {
					res.end(result);
				}
				// render or error
				else {
					res.end('An error occurred');
					console.log(err);
				}
			});
		}
	}, name);
});

app.get('/:car/bubbleGraph', function (req, res) {
	var car = req.params.car;
	var name = "";
		
	if(car=="audi"){
		name = "audiCollection";
		file = './views/pieAudiVClass.ejs'
	}	
	else if(car=="jaguar"){
        name = "jaguarCollection";
        file = './views/pieJaguarVClass.ejs'
    }		
    else if(car=="porche"){
        name = "porcheCollection";
        file = './views/piePorcheVClass.ejs'
    }


	bubble.createGraph(function(err,results){
		if(err){
			throw err;
		}else{
			ejs.renderFile(file,
					{title : title, output1 : results},	//sending results to user
					function(err, result) {
				// render on success
				if (!err) {
					res.end(result);
					console.log("printing result");
					console.log(result);
				}
				// render or error
				else {
					res.end('An error occurred');
					console.log(err);
				}
			});
		}
	}, name);
});


app.get('/:car/piegraph', function(req, res, results) {
	var car = req.params.car;
	var name = "";
		
	if(car=="audi"){
		name = "audiCollection";
		file = './views/pieAudi.ejs'
	}	
	else if(car=="jaguar"){
        name = "jaguarCollection";
        file = './views/pieJaguar.ejs'
    }		
    else if(car=="porche"){
        name = "porcheCollection";
        file = './views/piePorche.ejs'
    }


	pie.createGraph(function(err,results){
		if(err){
			throw err;
		}else{
			ejs.renderFile(file,
					{title : title, output1 : results},	//sending results to user
					function(err, result) {
				// render on success
				if (!err) {
					res.end(result);
					console.log("printing result");
					console.log(result);
				}
				// render or error
				else {
					res.end('An error occurred');
					console.log(err);
				}
			});
		}
	}, name);
	
});

app.get('/:car/sankeygraph', function(req, res, results) {
	var car = req.params.car;
	var name = "";
	var file = './views/sankeyMerc.ejs';
	
    if(car=="jaguar") {
		name = "jaguarCollection";
		file = './views/sankeyJaguar.ejs'
	}	
	else if(car=="audi"){
		name = "audiCollection";
		file = './views/sankeyAudi.ejs'
	}	
	else if(car=="porche"){
		name = "porcheCollection";
		file = './views/sankeyPorche.ejs'
	}	
    
    sankey.createGraph(function(err,results2013,results2014,results2015){
    	if(err){
			throw err;
		}else{
            console.log(results);
            ejs.renderFile(file,
				{
                    title : title,  
                    output2013 : results2013,
                    output2014 : results2014,
                    output2015 : results2015
                },	//sending results to user
					function(err, result) {
				// render on success
				if (!err) {
					res.end(result);
				}
				// render or error
				else {
					res.end('An error occurred');
					console.log(err);
				}
			});
		  }
   }, name);
     
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
