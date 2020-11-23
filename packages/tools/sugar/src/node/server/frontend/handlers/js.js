"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SDuration_1 = __importDefault(require("../../../time/SDuration"));
const SJsCompiler_1 = __importDefault(require("../../../js/SJsCompiler"));
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
async function js(req, res, settings = {}) {
    let filePath = req.path.slice(0, 1) === '/' ? req.path.slice(1) : req.path;
    const duration = new SDuration_1.default();
    const compiler = new SJsCompiler_1.default({});
    const resultObj = await compiler.compile(filePath);
    if (settings.log) {
        console.log(`<bgGreen><black> js </black></bgGreen> Js file "<yellow>${req.path}</yellow> served in <cyan>${duration.end()}s</cyan>"`);
    }
    res.type('text/javascript');
    res.status(200);
    res.send(resultObj.js);
}
exports.default = js;
