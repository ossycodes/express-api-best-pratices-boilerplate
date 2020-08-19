const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middleware/logger");
const Middleware = require("./middleware/middleware");
const ErrorHandlingMiddleware = require("./middleware/error-handler");
// const showBanner = require("./utilities/banner");

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

const PlansController = require("./controllers/plans-controller");
const SubscriptionsController = require("./controllers/subscriptions-controller");

Middleware(app);

app.use("/api/v1/plans", PlansController);
app.use("/api/v1/subscriptions", SubscriptionsController);

// Error middleware must be defined after all other middleware routes
ErrorHandlingMiddleware(app);

app.listen(PORT,  () => {
    // await showBanner();
    logger.info(`server is listening on port ${PORT}`);
});

//for test framework purposes.
module.exports = app;