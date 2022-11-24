const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sql = `
select *  from seiseki2;
`

db.serialize( () => {
	db.all( sql, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		for( let data of row ) {
			console.log( data.id + ' : ' + data.dasuu + ' : ' + data.hit + ' : '  + data.average + ' : ' + data.homerun + ' : ' + data.daten + ' : ' + data.seiseki_id );
		}
	});
});