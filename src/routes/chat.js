const express = require('express');
const router = express.Router();
const NAV_BAR_ACTIVE_LINK = "chat"; //TODO: must be a better way to do this

/* GET index page. */
router.get('/', function(req, res, next) {
  const data = { 
    titleSuffix: 'Chat',
    currentNavActiveLink: `${NAV_BAR_ACTIVE_LINK}`
  };

  res.render('chat', data);
});

module.exports = router;
