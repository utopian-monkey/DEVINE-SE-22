const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "Syntax",
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
  });

app.get("/items", (req, res) => {
    console.log("Running...");
    db.query("SELECT * FROM Syntax.Items;", (err, result) => {
      console.log(err,result);
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM Items WHERE ItemID = ?;", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.post('/additem',(req,res) => {
    const id = req.body.id;
    const name = req.body.name;
    const avl = req.body.avl;
    db.query(
        'INSERT INTO Items(ItemID,Item_Name,Availability) VALUES (?,?,?)',
        [id,name,avl],
        (err,result) => {
            if (err) {
                console.log(err);
            } else{
                res.send("Item added.")
            }
        }

    );
});
app.listen(3001, () => {
    console.log("Server connected.");
 });