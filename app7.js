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
app.get("/playe",(req, res) => {
  const message = "Hello world!!";
  res.render('p_show', {mes:message});
  db.serialize( () => {
        db.all("select  player.id, player.player_name, team.team_name as name2 from player inner join team on player.team_id=team.team_id;", (error, row) => {
            if( error ) {
                res.render('p_show', {mes:"エラーです"});
            }
            res.render('p_select', {data:row});
        })
});
});

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
  



app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
