const express = require('express');
const router = express.Router();
const NAV_BAR_ACTIVE_LINK = "about"; //TODO: must be a better way to do this

/* GET about page. */
router.get('/', function(req, res, next) {
  const data = { 
    titleSuffix: 'About',
    currentNavActiveLink: `${NAV_BAR_ACTIVE_LINK}`
  };

  res.render('about', data);
});

module.exports = router;