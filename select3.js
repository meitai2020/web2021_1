const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sql = `
select player.id, player.player_name, dasuu, hit, average, homerun, daten from player inner join seiseki2 on player.id = seiseki2.seiseki_id ;
`

db.serialize( () => {
db.all( sql, (error, row) => {
if(error) {
console.log('Error: ', error );
return;
}
for( let data of row ) {
console.log( data.id + ' : ' + data.player_name + ':' + data.dasuu + ':' + data.hit + ':' + data.average + ':' + data.homerun + ':' + data.daten );
}
});
});