const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 8001;
require('dotenv').config();

let db;
const uri = process.env.MONGODB_URI;
const dbName = "grocery-list";

MongoClient.connect(uri, {useUnifiedTopology: true})
    .then(client => {
        console.log("CONNECTED TO MONGODB");
        db = client.db(dbName);
    });

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res) => {
    db.collection("groceries").find().toArray()
    .then(data => {
        res.render("index.ejs", {info: data});
    })
    .catch(error => console.error(error));
});

app.post("/addItem", (req, res) => {
    db.collection("groceries").insertOne({listItem: req.body.listItem})
    .then(result => {
        console.log("ITEM ADDED");
        res.redirect("/")
    })
})


app.delete("/deleteItem", (req, res) => {
    db.collection("groceries").deleteOne({listItem: req.body.listItemS})
    .then(result => {
        console.log("ITEM DELETED");
        res.json("ITEM DELETED");
    })
    .catch(error => console.error(error))
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`)
});

