var receiptService = require('../../../services/receiptService.js');

exports.get = {
  handler: function(req, res, next) {
    var parkId = req.body.parkId,
      tokenId = req.body.tokenId;
    res.json(receiptService.find({ parkId: parkId, tokenId: tokenId }));
  }
};
exports.get = {
  handler: function(req, res, next) {
    var parkId = req.body.parkId,
      tokenId = req.body.tokenId;
    res.json(receiptService.find({ parkId: req.body.parkId, tokenId: req.body.tokenId }));
  }
};
exports.post = {
  handler: function(req, res, next) {
    res.json(receiptService.find({ parkId: req.body.parkId, tokenId: req.body.tokenId }));
  }
};