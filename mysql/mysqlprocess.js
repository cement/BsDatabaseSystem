//用于html输出

var process = require('child_process');
var sql = 'select * from chinesearea37 limit 20';
var db = 'chinesearea';
//var cmd = 'J:\\mysql-5.6.39-winx64\\bin\\mysql.exe -uroot -p';
var cmd = `mysql -uroot -proot -e "${sql}" -D ${db} -H`;

function processPromise(cmd) {
	return new Promise(function(resolve, reject) {
		process.exec(cmd, function(err, stdout, stderr) {
			if(err) reject(err);
			resolve(stdout);
			console.log(stdout);
		});
	});
}
// processPromise(cmd)
module.exports = processPromise;

