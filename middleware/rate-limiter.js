const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 6000, // 1 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

module.exports = limiter;
