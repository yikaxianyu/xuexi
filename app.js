const express = require('express');
const http = require('http');
const routerProduct = require('./router/product');
var app = express();
var server = http.createServer(app);
server.listen(3000);
app.use(express.static("./public"));
app.use("/product",routerProduct);