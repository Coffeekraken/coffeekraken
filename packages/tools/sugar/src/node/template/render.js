"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const STemplate_1 = __importDefault(require("./STemplate"));
/**
 * @name              render
 * @namespace         sugar.node.template
 * @type              Function
 * @async
 * @wip
 *
 * This function take a view path, a data object and optionaly a settings object to compile
 * the view and return a simple Promise that will be resolved or rejected depending on the
 * process status.
 *
 * @param       {String}        viewPath        The view path to compile. This has to be a dotted path like "my.cool.view" relative to the @config.views.rootDir directory
 * @param       {Object}        [data={}]       An object of data to use to compile the view correctly
 * @param       {Object}        [settings={}]   An object of settings to configure your rendering process. Here's the list of available settings:
 * - rootDir (__sugarConfig('views.rootDir')) {String|Array<String>}: Specify the root directory where to search for views. Can be an array of directories in which the engine will search through if needed
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import render from '@coffeekraken/sugar/node/template/render';
 * const result = await render('my.cool.template, {
 *    hello: 'world'
 * });
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function render(viewPath, data = null, settings = {}) {
    return new SPromise_1.default((resolve, reject, trigger, cancel) => __awaiter(this, void 0, void 0, function* () {
        const templateInstance = new STemplate_1.default(viewPath, Object.assign({}, settings));
        let resultObj;
        try {
            resultObj = yield templateInstance.render(data, settings);
            resultObj.status = 200;
            return resolve(Object.assign({}, resultObj));
        }
        catch (e) {
            const errorTemplateInstance = new STemplate_1.default('pages.501', settings);
            resultObj = yield errorTemplateInstance.render(Object.assign(Object.assign({}, data), { error: e }), settings);
            resultObj.status = 501;
            return reject(Object.assign({}, resultObj));
        }
    }), {
        id: 'templateRender'
    });
}
module.exports = render;
//# sourceMappingURL=module.js.map