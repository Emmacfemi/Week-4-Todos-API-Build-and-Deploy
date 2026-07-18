const logRequest = (req, res, next) => {
    const timeStamp = new Date().toISOString();
    console.log(`${timeStamp} - ${req.method} ${req.url} from ${req.ip}`);
    next();
};

// npm i joi

module.exports = logRequest;