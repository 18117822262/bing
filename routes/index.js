var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Welcome to Penang',
    categories: [
      {
        name: 'Tourist Spots',
        description: 'Explore the beautiful attractions of Penang'
      },
      {
        name: 'Food & Beverages',
        description: 'Taste the famous local delicacies'
      },
      {
        name: 'Hotels',
        description: 'Find your perfect accommodation'
      }
    ]
  });
});

module.exports = router; 