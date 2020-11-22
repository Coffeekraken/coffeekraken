"use strict";
const __SDuration = require('../../../time/SDuration');
const __SJsCompiler = require('../../../js/SJsCompiler');
/**
 * @name                js
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 *
 * This function is responsible of responding to express requests made on the home page
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          res             The express response object
 * @param         {Object}         [settings={}]    The handler settings
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = async function js(req, res, settings = {}) {
    let filePath = req.path.slice(0, 1) === '/' ? req.path.slice(1) : req.path;
    const duration = new __SDuration();
    const compiler = new __SJsCompiler({});
    const resultObj = await compiler.compile(filePath);
    if (settings.log) {
        console.log(`<bgGreen><black> js </black></bgGreen> Js file "<yellow>${req.path}</yellow> served in <cyan>${duration.end()}s</cyan>"`);
    }
    res.type('text/javascript');
    res.status(200);
    res.send(resultObj.js);
};
