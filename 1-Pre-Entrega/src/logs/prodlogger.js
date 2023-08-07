import winston from "winston";

const customLevelsOption = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'green',
        warning: 'yellow',
        info: 'blue',
        http: 'cyan',
        debug: 'white'
    }
}

const log = winston.createLogger({
    level: customLevelsOption,
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelsOption.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: 'logs/errors.log',
            level: 'error',
            format: winston.format.simple()
        })
    ]
});

export default log;