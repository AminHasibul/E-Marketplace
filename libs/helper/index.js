const {logger} = require('./logger');
const {asyncForEach} = require ('./asyncForEach');
const {pagination} = require ('./pagination');
const {restApiPlaceHolder} = require ('./restApiPlaceHolder');
const  {
            indexSuccessPlaceHolder,
            indexErrorPlaceHolder,
            showSuccessPlaceHolder,
            showErrorPlaceHolder,
            updateSuccessPlaceHolder,
            updateErrorPlaceHolder,
            deleteSuccessPlaceHolder,
            deleteErrorPlaceHolder,
            initLogPlaceHolder
        } = require ('./logPlaceHolder');
const {isDefined, baseFilter, getFileName} = require ( '../utility/validation');

module.exports.Helper = {
    logger,
    asyncForEach,
    pagination,
    restApiPlaceHolder,
    initLogPlaceHolder,
    indexSuccessPlaceHolder,
    indexErrorPlaceHolder,
    showSuccessPlaceHolder,
    showErrorPlaceHolder,
    updateSuccessPlaceHolder,
    updateErrorPlaceHolder,
    deleteSuccessPlaceHolder,
    deleteErrorPlaceHolder,
    isDefined,
    baseFilter,
    getFileName,
};
