"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
const packageRoot_1 = __importDefault(require("../../../path/packageRoot"));
const SPromise_1 = __importDefault(require("../../../promise/SPromise"));
const json_1 = __importDefault(require("../../../package/json"));
const sugar_1 = __importDefault(require("../../../config/sugar"));
const STemplate_1 = __importDefault(require("../../../template/STemplate"));
const STemplate_2 = __importDefault(require("../../../template/STemplate"));
/**
 * @name                homepage
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 * @wip
 *
 * This function is responsible of responding to express requests made on the home page
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          res             The express response object
 * @param         {Object}         [settings={}]    The handler settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function homepage(req, res, settings = {}) {
    // search for the view to render
    const packageRoot = packageRoot_1.default();
    const packageJson = json_1.default();
    let body, content, view, title, error;
    // index.html file at root
    if (fs_1.default.existsSync(`${packageRoot}/index.html`)) {
        const html = fs_1.default.readFileSync(`${packageRoot}/index.html`, 'utf8');
        body = html;
        title = packageJson.name;
        view = 'pages.index';
    }
    else {
        const viewsDir = sugar_1.default('frontend.viewsDir');
        const viewInfoObj = STemplate_1.default.getViewInfo(`${viewsDir}/index`);
        if (viewInfoObj) {
            view = viewInfoObj.relPath;
        }
        else {
            view = 'pages.404';
            title = `Index view not found...`;
            error = `No index view has been found. You have these choices:
      - index.html
      ${Object.keys(STemplate_2.default.engines)
                .map((engine) => {
                return `- ${viewsDir}/index.${engine}`.replace(`${packageRoot_1.default()}/`, '');
            })
                .join('\n-')}
      `;
        }
    }
    return new SPromise_1.default((resolve, reject, trigger) => {
        return resolve({
            content,
            view,
            data: {
                title: `${packageJson.name}`,
                body,
                error
            }
        });
    }, {
        id: 'frontendServerHomepageHandler'
    });
}
module.exports = homepage;
