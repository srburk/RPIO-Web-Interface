var express = require('express');
var router = express.Router();

/* GET JSON */
router.get('/', function(req, res, next) {
  res.json({ name: "Sam" });
});

module.exports = router;
