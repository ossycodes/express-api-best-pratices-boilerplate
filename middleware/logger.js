const winston = require('winston');

// Create a logger based on the log level in config.json
const logger = winston.createLogger({
    level: "debug",
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
                winston.format.timestamp()
            ),
        }),
        new winston.transports.File({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
                winston.format.timestamp(),
                winston.format.json()
            ),
            filename: 'error.log', level: 'debug'
        })
    ],
    exceptionHandlers: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
                winston.format.timestamp()
            ),
        }),
        new winston.transports.File({ filename: 'exceptions.log' })
    ]
});

logger.stream = {
    // Write the text in 'message' to the log.
    write: (message) => {
        // Removes double newline issue with piping morgan server request
        // log through winston logger.
        logger.info(message.length > 0 ? message.substring(0, message.length - 1) : message);
    },
};

module.exports = logger;
