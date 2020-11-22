"use strict";
const __packageRoot = require('../../../path/packageRoot');
const __SPromise = require('../../../promise/SPromise');
const __toHtml = require('../../../convert/toHtml');
const __SDocMap = require('../../../doc/SDocMap');
const __SDocblock = require('../../../docblock/SDocblock');
const __SDocblockHtmlOutput = require('../../../docblock/outputs/SDocblockHtmlOutput');
const __render = require('../../../template/render');
/**
 * @name                styleguide
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 *
 * This function is responsible of responding to express requests made on the "styleguide" section
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          server          The express server instance
 * @return        {Promise}                         A promise that will be resolved with the response to send to the client
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = async function doc(req, res, settings = {}) {
    let params = req.params[0].split('/');
    let namespace = params[0];
    const docMap = await __SDocMap.read();
    // check if we have the requested doc
    if (!docMap[namespace]) {
        const resultObj = __render('pages.404', {
            title: `Doc "${namespace}" not found`,
            error: `The documentation namespaced "${namespace}" does not exists...`
        });
        res.status(404);
        res.type('text/html');
        return res.send(resultObj.content);
    }
    const docMapItem = docMap[namespace];
    // read file with docblock parser
    const docblock = new __SDocblock(docMapItem.path);
    const docblockObj = docblock.toObject();
    const dockblockHtmlOutput = new __SDocblockHtmlOutput(docblock);
    // render the view
    const resultObj = await __render('pages.doc', {
        title: docblockObj.name,
        body: await dockblockHtmlOutput.render()
    });
    res.status(resultObj.status);
    res.type('text/html');
    res.send(resultObj.content);
};
