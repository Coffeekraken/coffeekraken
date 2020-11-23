"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SScssCompiler_1 = __importDefault(require("../../../scss/SScssCompiler"));
const SDuration_1 = __importDefault(require("../../../time/SDuration"));
const SBuildScssInterface_1 = __importDefault(require("../../../scss/build/interface/SBuildScssInterface"));
/**
 * @name                scss
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
async function scss(req, res, settings = {}) {
    const defaultValuesObj = SBuildScssInterface_1.default.getDefaultValues();
    const compiler = new SScssCompiler_1.default(defaultValuesObj);
    const duration = new SDuration_1.default();
    const compileRes = await compiler.compile(req.path, {
        ...(req.query || {})
    });
    if (settings.log) {
        console.log(`<bgGreen><black> scss </black></bgGreen> Scss file "<yellow>${req.path}</yellow> served in <cyan>${duration.end()}s</cyan>"`);
    }
    res.type('text/css');
    res.status(200);
    res.send(compileRes.css);
}
exports.default = scss;
