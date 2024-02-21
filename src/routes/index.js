const express = require('express');
const { version, author } = require('../../package.json');
const { createSuccessResponse } = require('../helpers/response')

const router = express.Router();

// will be added later
//router.use(`/v1`, require('./api')); 

router.get('/', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.status(200).json(
    createSuccessResponse({
      author,
      version,
    })
  );
});

module.exports = router;
