const fs = require("fs");
// const index = fs.readFileSync("index.html", "UTF-8");
const data = JSON.parse(fs.readFileSync("db.json", "UTF-8"));
const products = data.products;

const express = require("express");
const server = express();
const morgan = require("morgan");

//body Parse
const bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(express.json());
server.use(morgan("default"));
server.use(express.static("public"));

//GET request

server.get("/product", (req, res) => {
  res.json(products);
});

server.get("/product/:id", (req, res) => {
  const id = +req.params.id;
  const product = products.find((p) => p.id === id);
  res.json(product);
});

server.post("/product", (req, res) => {
  console.log(req.body);
  res.json({ type:'POST'});
});

server.listen(3900, () => console.log("server run"));
