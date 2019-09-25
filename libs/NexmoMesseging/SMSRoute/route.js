const logger = require('../../helper/logger');

exports.routesConfig = function (app) {
    app.post('/receiveSMS', (req, res) => {
        logger.info("receiveSMS hit");
        handleParams(req.body, res);
    });
};

function handleParams(params, res) {
    if (!params.to || !params.msisdn) {

        logger.info("This is not a valid inbound SMS message");
        console.log('This is not a valid inbound SMS message!');
    } else {
        logger.info("Success");
        console.log('Success');
        let incomingData = {
            messageId: params.messageId,
            from: params.msisdn,
            text: params.text,
            type: params.type,
            timestamp: params['message-timestamp']
        };
        logger.info(incomingData);
        res.send(incomingData);
    }
    res.status(200).end();
}