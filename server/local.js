  var dbm = require('./services/dbm')
  module.exports = function(req, res, next) {
      var url = req.originalUrl.slice(req.originalUrl.lastIndexOf('/') + 1, req.originalUrl.length)
      var db = new dbm(`../db/${url}.json`);
      res.json(db.read());
      // next();
  };