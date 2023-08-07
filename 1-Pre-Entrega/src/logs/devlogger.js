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
        error: 'blue',
        warning: 'yellow',
        info: 'grenn',
        http: 'cyan',
        debug: 'white'
    }
}

winston.addColors(customLevelsOption.colors);

const log = winston.createLogger({
    level: 'debug', 
    levels: customLevelsOption.levels, 
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({ all: true }), 
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