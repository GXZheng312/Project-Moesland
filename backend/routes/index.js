const express = require('express');
const { requestLimiter } = require('../middlewares/security');

const router = express.Router();

// default
router.get('/', (req, res) => {
  res.send('hello from home route');
});

// add here all other routes
router.use('/api/auth', requestLimiter, require('./api/auth'));
router.use('/api/role', require('./api/role'));
router.use('/api/user', require('./api/user'));
router.use('/api/authToken', require('./api/authToken'));
router.use('/api/newsArticle/create', require('./api/newsArticle/create'));
  
module.exports = router;
