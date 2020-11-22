"use strict";
const __SDocMap = require('../../node/doc/SDocMap');
module.exports = async function docMapPath(stringArgs = '') {
    const pathes = await __SDocMap.find();
    console.log(pathes);
    process.exit();
};
