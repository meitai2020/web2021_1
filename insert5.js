const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');



db.run('UPDATE player SET team_id = ? WHERE id = ?', 2, 1, err => {
    if (err) {
        return console.error(err.message);
    }
});
