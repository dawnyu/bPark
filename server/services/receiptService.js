  var dbm = require('./dbm');
  var Q = require('q');

  function ReceiptService() {}
  ReceiptService.prototype = new dbm('../db/TodayReceipts.json');
  ReceiptService.prototype.find = function(parkId, tokenId) {
    return this.read();
  };
  module.exports = new ReceiptService();