const showBanner = require("node-banner");

/**
 * Displays a RediSolar banner as an into level log message.
 */
module.exports = async () => {
    await showBanner('NODEJS EXPRESS API BOILER PLATE', 'Best pratices, error-handling, validation, rate-limiting, etc...');
};
