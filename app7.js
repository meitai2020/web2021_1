const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  const message = "Hello world";
  res.render('p_show', {mes:message});
})
app.get("/player", (req, res) => {
    //console.log(req.query.pop);    // ①
    let sql = "select id, player.id, player.player_name, team.team_name as name2 from player inner join team on player.team_id=team.team_id;";
    //console.log(sql);    // ②
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('p_show', {mes:"エラーです"});
            }
            //console.log(data);    // ③
            res.render('p_select', {data:data});
        })
    })
})

app.get("/db", (req, res) => {
    db.serialize( () => {
        db.all("select player.id, player.player_name, team.team_name as name2 from player inner join team on player.team_id=team.team_id;", (error, row) => {
            if( error ) {
                res.render('p_show', {mes:"エラーです"});
            }
            res.render('p_select', {data:row});
        })
});
  

});//

app.get("/team", (req, res) => {
    db.serialize( () => {
        db.all("select team_id, team_name from team;", (error, row) => {
            if( error ) {
                res.render('p_show', {mes:"エラーです"});
            }
            res.render('t_itirann', {data:row});
        })
});
      
    
});
        

app.get("/t_db/:name", (req, res) => {
    db.serialize( () => {
        db.all("select id, player_name from player where team_id=" + req.params.id + ";", (error, row) => {
            if( error ) {
                res.render('p_show', {mes:"エラーです"});
            }
            res.render('p_select', {data:row});
        })
});
  

});

app.get("/db/:id", (req, res) => {
  //console.log(req.params.id);
db.serialize( () => {
db.all("select player.id, player.player_name, dasuu, hit, average, homerun, daten from player inner join seiseki2 on player.id = seiseki2.seiseki_id where player.id=" + req.params.id + ";", (error, row) => {
if( error ) {
res.render('p_show', {mes:"エラーです"});
}//47行目where以降を消すと成績が出る
res.render('p_seiseki', {data:row});
})
})
});
app.get("/all", (req, res) => {
  //console.log(req.params.id);
db.serialize( () => {
db.all("select player.id, player.player_name, dasuu, hit, average, homerun, daten from player inner join seiseki2 on player.id = seiseki2.seiseki_id ;", (error, row) => {
if( error ) {
res.render('p_show', {mes:"エラーです"});
}
res.render('p_seiseki', {data:row});
})
})
});

app.post("/insert", (req, res) => {
let sql = `
insert into player (player_name,team_id) values (` + req.body.name + `,` + req.body.id + `);
`
console.log(sql);
db.serialize( () => {
db.run( sql, (error, row) => {
console.log(error);
if(error) {
res.render('p_show', {mes:"エラーです"});
}
res.render('p_show', {mes:"成功です"});
});
});
console.log(req.body);
});

app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
