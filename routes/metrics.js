/*jshint -W079 */
var _ = require('lodash');
var express = require('express');
var router = express.Router();
var Promise = require('es6-promise').Promise;
var Read = require('../').read;

// Example: 
// Series (since forever): /metrics/css/adf6e9c154cb57a818f7fb407085bff6
// Series between two dates: /metrics/css/adf6e9c154cb57a818f7fb407085bff6/1015711104475..1415711104475

router.get(/^\/(\w+)\/(\w+)(\/(\d+)\.\.(\d+))?$/, function(req, res) {
  var metricreading;
  var asset = req.params[1];
  var options = {
    type: req.params[0],
    start: req.params[3] || 0,
    end: req.params[4] || 0
  };

  res.type('application/json');

  var read = new Read([asset], _.defaults(options, res.locals.config), res.locals.db);

  var assetData = read.getMetrics(asset);

  Promise.all(assetData).then(function(data) {
    res.send(
      JSON.stringify(data, null, 4)
    );
  });
});

module.exports = router;
