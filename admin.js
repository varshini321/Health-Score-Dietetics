var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/' , function(req, res, next) {
  res.render('admin/index');
});


router.get('/practioner.ejs', function(req, res, next) {
  res.render('user/practioner');
});
router.get('/forgotpassword.ejs', function(req, res, next) {
  res.render('user/forgotpassword');
});

router.get('/index.ejs', function(req, res, next) {
  res.render('admin/index');
});

router.get('/patientsignup.ejs', function(req, res, next) {
  res.render('user/patientsignup');
});

router.post('/check.ejs', function(req, res, next) {
  res.render('user/check');
});

router.get('/adminhomepage.ejs', function(req, res, next) {
  res.render('user/adminhomepage');
});

router.post('/inserthealthpractitioner.ejs', function(req, res, next) {
  res.render('user/inserthealthpractitioner');
});

module.exports = router;
