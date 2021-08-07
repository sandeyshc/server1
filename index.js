require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
// const db = require('./db')
// const Router = require('./routes')
const apiPort = 3006

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(cors())

// db.on('error', console.error.bind(console, 'MongoDB connection error:'))
app.get('/', (req, res) => {
    res.send('Hello World!')
})
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "sql6.freesqldatabase.com",
  user: "sql6429699",
  password: "nqWSjU2GZH",
  database: "sql6429699",
  port:"3306"
});
con.connect()

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });
// con.connect(function(err) {
//   if (err) throw err;
//   con.query("SELECT * FROM sql6429675.covid_19_india", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });



app.post('/get_date_infos',(req,res)=>{
	let date=req.body.date
	let ress=[]
	// con.connect(function(err) {

  // if (err) throw err;
  var sql = mysql.format("SELECT * FROM sql6429699.covid_19_india where Date=?", [date]);
  con.query(sql, function (err, result, fields) {
    console.log(result);
        if (err) {
    	    	console.log("yes",err)
    	res.status(503).json({
    		"bad":err
    	})
    }
    else{
    console.log(result);
    ress=ress+result
    // res.status(200).json({
    // 	'good':ress
    // })
    }
});
    var sql = mysql.format("SELECT * FROM sql6429699.covid_vaccine_statewise where Date=?", [date]);
  con.query(sql, function (err, result, fields) {
    console.log(result);
        if (err) {
    	    	console.log("yes",err)
    	res.status(503).json({
    		"bad":err
    	})
    }
    else{
    console.log(result);
    ress=ress+result
    // res.status(200).json({
    // 	'good':ress
    // })
    }
});
    var sql = mysql.format("SELECT * FROM sql6429699.StatewiseTestingDetails where Date=?", [date]);
  con.query(sql, function (err, result, fields) {
    console.log(result);
        if (err) {
    	    	console.log("yes",err)
    	res.status(503).json({
    		"bad":err
    	})
    }
    else{
    console.log(result);
    ress=ress+result
    console.log(ress)
    res.status(200).json({
    	'good':ress
    })
    }
});



})
app.post('/get_state_infos',(req,res)=>{
	let state_name=req.body.state_name
	let ress=[]

	// console.log(req.body.state_name,con)
	// con.connect(function(err) {
  // if (err) throw err;
  // try{
  	var sql = mysql.format("SELECT * FROM sql6429699.covid_19_india where State=?", [state_name]);
  con.query(sql, function (err, result, fields) {

    if (err) {
    	    	console.log("yes",err)
    	res.status(503).json({
    		"bad":err
    	})
    }
    else{
    console.log(result);
   	// cons.release();
   	ress=ress+result
    // res.status(200).json({
    // 	'good':result
    // })
    }

  });
    	var sql = mysql.format("SELECT * FROM sql6429699.covid_vaccine_statewise where State=?", [state_name]);
  con.query(sql, function (err, result, fields) {

    if (err) {
    	    	console.log("yes",err)
    	res.status(503).json({
    		"bad":err
    	})
    }
    else{
    console.log(result);
   	// cons.release();
   	ress=ress.result
    // res.status(200).json({
    // 	'good':result
    // })
    }

  });
    	var sql = mysql.format("SELECT * FROM sql6429699.StatewiseTestingDetails where State=?", [state_name]);
  con.query(sql, function (err, result, fields) {

    if (err) {
    	    	console.log("yes",err)
    	res.status(503).json({
    		"bad":err
    	})
    }
    else{
    console.log(result);
   	// cons.release();
   	ress=ress+result
    res.status(200).json({
    	'good':result
    })
    }

  });
    // catch(err){
    // 	console.log("yes")
    // 	res.status(503).json({
    // 		"bad":err
    // 	})
    // }
//   con.end((err) => {
//   // The connection is terminated gracefully
//   // Ensures all remaining queries are executed
//   // Then sends a quit packet to the MySQL server.
// });
// });

})
app.post('/pinpoint_states',(req,res)=>{
	let state_name=req.body.state_name
	let date=req.body.date
	 var sql = mysql.format("SELECT * FROM sql6429699.covid_19_india where (State=? and Date=?)", [state_name,date]);
	// con.connect(function(err) {
  // if (err) throw err;
  con.query(sql, function (err, result, fields) {
    // if (err) throw err;
    console.log(result);
    if (err) {
    	    	console.log("yes",err)
    	res.status(503).json({
    		"bad":err
    	})
    }
    else{
    console.log(result);
   	// cons.release();
   	ress=ress+result
    // res.status(200).json({
    // 	'good':result
    // })
    }
    // con.release();
  });
  	 var sql = mysql.format("SELECT * FROM sql6429699.covid_vaccine_statewise where (State=? and Date=?)", [state_name,date]);
	// con.connect(function(err) {
  // if (err) throw err;
  con.query(sql, function (err, result, fields) {
    // if (err) throw err;
    console.log(result);
    if (err) {
    	    	console.log("yes",err)
    	res.status(503).json({
    		"bad":err
    	})
    }
    else{
    console.log(result);
   	// cons.release();
   	ress=ress+result
    // res.status(200).json({
    // 	'good':result
    // })
    }
    // con.release();
  });
  	 var sql = mysql.format("SELECT * FROM sql6429699.StatewiseTestingDetails where (State=? and Date=?)", [state_name,date]);
	// con.connect(function(err) {
  // if (err) throw err;
  con.query(sql, function (err, result, fields) {
    // if (err) throw err;
    console.log(result);
    if (err) {
    	    	console.log("yes",err)
    	res.status(503).json({
    		"bad":err
    	})
    }
    else{
    console.log(result);
   	// cons.release();
   	ress=ress+result
    res.status(200).json({
    	'good':result
    })
    }
    // con.release();
  });
// });

})


// app.use('/api', Router)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))