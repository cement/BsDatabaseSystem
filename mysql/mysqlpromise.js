let mysql = require('mysql');




let pool = mysql.createPool(config);


let queryPromise = function(sql,params) {
	console.log('------params------:',params);
	return new Promise(function(resolve, reject) {

		pool.getConnection(function(err, connection) {
			if(err)  reject(err);
			// Use the connection
			connection.query(sql, params, function(error, rows, fields) {
				//console.log(connection.query.toString());
				// And done with the connection.
				if (error) reject(error);
				// console.log(arguments.length);
				// for (var i in arguments) {
				//     console.log(arguments[i]);
				// }
                if(fields){
                  resolve([fields,rows]);
                }else{
                  resolve(rows);
                }
				// var result = JSON.stringify(rows, null, '\t');
				// //console.log('%j',rows);
				// console.info(result);
				// //console.info(rows);
				connection.release();
			});

		});



	});
} 

// let sql = 'select * from chinesearea37 limit 6';

// async function run(sql,params){
// 	let res = await queryPromise(sql,params);
// 	console.log(res);
// }
// run(sql);
// let queryPromise = function(sql,params){
//     console.log('------params------:',params);
// 	pool.getConnection(function(err, connection) {
// 			if(err)  Promise.reject(err);
// 			// Use the connection
// 			connection.query(sql, params, function(error, rows, fields) {
// 				console.log(connection.query.toString());
// 				// And done with the connection.
// 				if (error) return Promise.reject(err);
// 				// console.log(arguments.length);
// 				// for (var i in arguments) {
// 				//     console.log(arguments[i]);
// 				// }
//                 //console.log(rows);
//                 connection.release();
//                 return Promise.resolve(rows);
// 				// var result = JSON.stringify(rows, null, '\t');
// 				// //console.log('%j',rows);
// 				// console.info(result);
// 				// //console.info(rows);
				
// 			});

// 		});

// }
queryPromise('show tables').then(function(data){
    console.log('------  data -------:',data);
});

module.exports = queryPromise;