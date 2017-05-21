module.exports = function(req, res, next) {

    if (!req.session.user) {
        return next({
            _status: 50001,
            _msg: 'You need to log in for further operations'
        });
    }

    next();
};