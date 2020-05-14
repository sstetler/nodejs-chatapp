const express = require('express');
const router = express.Router();
const NAV_BAR_ACTIVE_LINK = "home"; //TODO: must be a better way to do this

/* GET home page. */
router.get('/', function(req, res, next) {
  const data = { 
    titleSuffix: 'Home',
    currentNavActiveLink: `${NAV_BAR_ACTIVE_LINK}`
  };

  res.render('index', data);
});

module.exports = router;
