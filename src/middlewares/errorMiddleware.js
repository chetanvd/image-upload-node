class ErrorMiddleware {
    handle(err, req, res, next) {
        res.status(err.status || 500).send(err);
    }
}

module.exports = ErrorMiddleware;
