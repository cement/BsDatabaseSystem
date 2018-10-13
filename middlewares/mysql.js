let mysql = require('mysql');

//let pool = mysql.createPool(config);
//let config;
let pool;
module.exports = {
	 query:async function(sql,params) {
		// console.log('------------------------>>>>>');
		return new Promise(function(resolve, reject) {

				pool.getConnection(function(err, connection) {
					if (err) reject(err);
					// Use the connection
					connection.query(sql, params, function(error, rows, fields) {
						if (error) reject(error);
						if (fields) {
							resolve([fields, rows]);
						} else {
							resolve(rows);
						}
						connection.release();
					});

				});

			});
		},
		login:async function(cfg) {
             return new Promise(function(resolve, reject) {
                if(!cfg) reject(new myerr.DatabaseError('cofig must be not empty!'))
                console.log('.........server config............:   ',cfg);
                pool = mysql.createPool(cfg);
				pool.getConnection(function(err, connection) {
					if (err){
						reject(err);
					}else{
						if(!connection) reject(new DBError('连接失败！'));
					    let config = connection.config;
						// console.log(connection);
						//config=cfg;
						resolve('成功连接 '+config.host+':'+config.port+'/'+config.database+'/'+config.clientFlags);
					}
					
				});

			});
		}
		


}
// config = {
// 	host: '',
// 	port:'',
// 	user: '',
// 	password: '',
// 	database: '',
// 	multipleStatements: true 
// }
// pool = mysql.createPool(config);
// console.log(pool);
