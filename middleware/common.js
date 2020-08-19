/**
 * will be applied to all routes (hence the name common)
 */
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const logger = require("./logger");
const cors = require("cors");
const helmet = require("helmet");
const rateLimiter = require("./rate-limiter");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require("../public/swagger.json");

module.exports = function CommonMiddleware(app) {
    app.use(bodyParser.json());
    app.use(morgan("common"));
    app.use(cors());
    app.use(helmet());
    app.use(rateLimiter);
    app.use(morgan('combined', { stream: logger.stream }));
    app.use(express.static("public"));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
