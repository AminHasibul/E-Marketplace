var  {logger} = require('./logger');

exports.indexSuccessPlaceHolder = (data, pagination, controllerName) => ({
    success: true,
    total: data.count,
    limit: pagination.limit,
    skip: pagination.skip,
    page: pagination.page,
    message: `Get All ${controllerName} with pagination`,
    data: data.rows
});
exports.indexErrorPlaceHolder = (err, controllerName) => ({
    success: false,
    message: `Error in Get All ${controllerName} with search`,
    error: err
});
exports.showSuccessPlaceHolder = (data, controllerName) => ({
    success: true,
    message: `read single ${controllerName}`,
    data
});
exports.showErrorPlaceHolder = (err, controllerName) => ({
    success: false,
    message: `error in read single ${controllerName}`,
    error: err
});
exports.updateSuccessPlaceHolder = (data, controllerName) => ({
    success: true,
    message: `update  single ${controllerName}`,
    data
});
exports.updateErrorPlaceHolder = (err, controllerName) => ({
    success: false,
    message: `error in update single ${controllerName}`,
    error: err
});
exports.deleteSuccessPlaceHolder = (data, pagination, controllerName) => ({
    success: true,
    message: `delete single ${controllerName}`,
    data
});
exports.deleteErrorPlaceHolder = (err, controllerName) => ({
    success: false,
    message: `error in delete single ${controllerName}`,
    error: err
});

exports.nitLogPlaceHolder = (req, controllarName, callerName = null) => {

    logger.info(`request for ${controllarName}--${callerName}`);
    logger.debug('query =>', req.query);
    logger.debug('body =>', req.body);
    logger.debug('params =>', req.params);

};
