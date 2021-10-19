const __jsdomMock = require('./jsdomMock');
// import __sugarConfigLoad from './sugarConfigLoad';

module.exports = async function () {
    __jsdomMock();
    // await __sugarConfigLoad();
    return true;
};
