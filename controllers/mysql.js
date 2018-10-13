//var mysqlQuery = require('../mysql/mysqlpromise.js');
var mysql = require('../middlewares/mysql.js');
let baseConfig = {
	host: '',
	port:'',
	user: '',
	password: '',
	database: '',
	multipleStatements: true 
}

 
 module.exports = {
 	login:async ctx => {
          try{

            let config = ctx.request.body;
            config.port=parseInt(config.port);
            //config = Object.assign(baseConfig,config);
            console.log('---------------8------------',config);
            let res = await mysql.login(config);
            // let redirectUrl = encodeURI('/index.html');

			// let table = params.shift().replace(/\W+?/img,'');
			// ctx.redirect(redirectUrl);
            ctx.body = res;
          }catch(e){
          	ctx.body = e;

          }
            
        // }
        // console.log('-------confg-----------');
 	},
 	showdb:async ctx=>{
 		try{
	        let sql = `SHOW databases`;
	     	let result = await mysql.query(sql);
			let resp = JSON.stringify(result);
			ctx.body = resp;

 		}catch(e){
            ctx.body='-------------';
 		}
 	},
 	showtb:async ctx=>{
 		try{
 			let params = ctx.request.query;
			if(!Object.keys(params).length){
               params = ctx.request.body;
			}
			console.log('--------showtb--------params:',params);
			var useSql = params.db?` USE  ${params.db}`:'';
            if(useSql) await mysql.query(useSql);
	        
	        let sql = `SHOW tables`;
	     	let result = await mysql.query(sql);
			let resp = JSON.stringify(result);
			ctx.body = resp;

 		}catch(e){
            ctx.body=e;
 		}
 	},
	query: async ctx => {

		try {
			let params = ctx.request.query;
			if(!Object.keys(params).length){
               params = ctx.request.body;
			}
			console.log('ctx.request.query',ctx.request.query);
			console.log('ctx.request.body',ctx.request.body);
            if(!params.table) throw new Error('表名不能为空！');
            
            var useSql = params.db?` USE  ${params.db}`:'';
            if(useSql) await mysql.query(useSql);
            var baseSql = ` SELECT *  FROM  ${params.table}`;
            var asSql = params.alias?` AS ${params.alias} `:'';
            // if(!params.offset) params.offset = 0;
            var limitSql = ` limit ${params.offset?params.offset:0},${params.count?params.count:30}`;
			var sql = baseSql+asSql+limitSql;
			console.log(sql);
			//var sql = 'SELECT * FROM `chinesearea111` as 中华人民共和国地区表 limit 50';
			// var countSql = `SELECT count(*) as count FROM ${params.table}`;

			//let count  = await mysql.query(countSql);
			//     count = JSON.stringify(count)[1][0].count;

			// console.log('---------------------count----------',count[1][0].count);
			let result = await mysql.query(sql);
			//result.count=count;
			let resp = JSON.stringify(result);
			//result.count=count;
			ctx.body = resp;
		} catch (e) {
			ctx.body = e.message;
		}


	},

	insert: async ctx => {
		try {
			let params = ctx.request.body;
			let table = params.shift().replace(/\W+?/img,'');
			let sql = `INSERT ${table}  set ?`;
			let result = await mysql.query(sql, params);
			ctx.body = result;
		} catch (e) {
			ctx.body = e;
		}
	},
	update: async ctx => {
		try {
			let params = ctx.request.body;
			console.log(params);
			let table = params.shift().replace(/\W+?/img,'');

			let sql = `UPDATE ${table} set ? where ?`;
			console.log(params);
			let result = await mysql.query(sql, params);
			ctx.body = result;
		} catch (e) {
			ctx.body = e;
		}
	},
	delete: async ctx => {
		try {
			let params = ctx.request.body;
			let table = params.shift().replace(/\W+?/img,'');
			let sql = `DELETE FROM ${table} WHERE ?`
			console.log(params);
			let result = await mysql.query(sql, params);
			ctx.body = result;
		} catch (e) {
			ctx.body = e;
		}
	}



}

// mysql.query('show databases').then(function(data){
//   console.log(data);
// });