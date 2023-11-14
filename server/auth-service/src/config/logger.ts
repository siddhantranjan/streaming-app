import winston from 'winston';

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({filename: 'D:/Projects/nyx-project/server/error.log', level: 'error'}),
        new winston.transports.File({filename: 'D:/Projects/nyx-project/server/combined.log'})
    ]
});

export const stream = {
    write: (message: string) => {
        logger.info(message);
    }
}

if(process.env.NODE_ENV !== 'production'){
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}
