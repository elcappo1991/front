var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET hotel page. */
router.get('/list', function(req, res, next) {
  res.render('roomList');
});

/* GET hotel page. */
router.get('/hotelDetails', function(req, res, next) {
  res.render('hotelDetails');
});

module.exports = router;
