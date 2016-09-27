var express = require('express');
var router = express.Router();
// var env = require('../nunjucks-config');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index.html', {
    title: '好甜的白菜'
  });
});
router.get('/get', (req, res, next) => {
  res.send({
    message: "甜甜的白菜，我永远永远都只爱你！"
  });
});
module.exports = router;
