const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sql = `
select player.id, player.player_name, team.team_name as name2
from player inner join team
on player.team_id=team.team_id;
`

db.serialize( () => {
db.all( sql, (error, row) => {
if(error) {
console.log('Error: ', error );
return;
}
for( let data of row ) {
console.log( data.id + ' : ' + data.player_name + ':' + data.name2 );
}
});
});