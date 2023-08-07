const loggerTest = (req, res) => {
    const tests = () => {
        req.logger.debug('Esto es un mensaje debug');
        req.logger.http('Esto es un mensaje http');
        req.logger.info('Esto es un mensaje info');
        req.logger.warning('Esto es un mensaje warnings');
        req.logger.error('Esto es un mensaje error');
        req.logger.fatal('Esto es un mensaje fatal');
    };
    res.send(tests());
};

export default loggerTest;