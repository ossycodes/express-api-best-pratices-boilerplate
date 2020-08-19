const chalk = require("chalk");
const { ValidationError, AuthenticationError, AuthourizationError } = require("../errors/errors");

//this middleware runs anytime an error happens
function errorLogger(err, req, res, next) {
    console.log(err);
    if (err.message) {
        console.log(chalk.red(err.message));
    }
    if (err.stack) {
        console.log(chalk.red(err.message));
    }
    //pass to the next error handler middleware
    next(err);
}

function authenticationErrorHandler(err, req, res, next) {
    if (err instanceof AuthenticationError) {
        return res.status(401).send("not authenticated");
    }
    //pass to next handler
    next(err);
}

function validationErroHandler(err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(400).send("bad request")
    }
    //pass to next handler
    next(err);
}

function authorizationErrorHandler(err, req, res, next) {
    if (err instanceof AuthourizationError) {
        return res.status(403).send("not authorized");
    }
    //pass to next handler
    next(err);
}

function genericErrorHandler(err, req, res, next) {

    // development error handler
    // will print stacktrace
    // if (app.get('env') === 'development') {
    //     res.status(500).send({
    //         message: err.message,
    //         error: err
    //     });
    // }

    //production no stack traces
    // res.status(500).send({
    //     message: err.message,
    //     error: {}
    // });

    res.status(500).send("internal sever error");
}

module.exports = function ErrorHandlingMiddleware(app) {
    app.use([
        errorLogger,
        authenticationErrorHandler,
        validationErroHandler,
        authorizationErrorHandler,
        genericErrorHandler
    ]);
}