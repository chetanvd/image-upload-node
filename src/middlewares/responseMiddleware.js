class ResponseMiddleware {
    processResponse(req, res, next) {
        const message = res.context.body;
        message.status = res.context.status;
        res.status(res.context.status).send(message);
    }
}

module.exports = ResponseMiddleware;
