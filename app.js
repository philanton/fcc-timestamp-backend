const express = require('express');
const bodyParser = require('body-parser');
const api = express.Router();

api.use(express.static(__dirname + "/public"));
api.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

api.use(bodyParser.urlencoded({extended: false}));
api.use(bodyParser.json());

api.use("/timestamp/:date?", (req, res, next) => {
  if(!isNaN(+req.params.date)) {
    req.date = new Date(+req.params.date);
  } else if(!req.params.date) {
    req.date = new Date();
  } else {
    req.date = new Date(req.params.date);
  }
  next();
});

api.get("/timestamp/:date?", (req, res) => {
  if(req.date.getTime()) {
    res.json({
      unix: req.date.getTime(),
      utc: req.date.toUTCString()
    });
  } else {
    res.json({ error: req.date.toUTCString() });
  }
});

 module.exports = api;
