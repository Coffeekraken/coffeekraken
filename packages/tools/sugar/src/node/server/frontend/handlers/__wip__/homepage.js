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
    return new SPromise_1.default(({ resolve, reject, emit }) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZXBhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lcGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7OztBQUdkLDRDQUFzQjtBQUN0Qiw0RUFBc0Q7QUFDdEQseUVBQW1EO0FBQ25ELGlFQUFrRDtBQUNsRCxrRUFBa0Q7QUFDbEQsNEVBQXNEO0FBQ3RELDRFQUFvRDtBQUVwRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsU0FBUyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUN2QyxnQ0FBZ0M7SUFDaEMsTUFBTSxXQUFXLEdBQUcscUJBQWEsRUFBRSxDQUFDO0lBQ3BDLE1BQU0sV0FBVyxHQUFHLGNBQWEsRUFBRSxDQUFDO0lBRXBDLElBQUksSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztJQUV0QywwQkFBMEI7SUFDMUIsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsV0FBVyxhQUFhLENBQUMsRUFBRTtRQUNoRCxNQUFNLElBQUksR0FBRyxZQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsV0FBVyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEUsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNaLEtBQUssR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBQ3pCLElBQUksR0FBRyxhQUFhLENBQUM7S0FDdEI7U0FBTTtRQUNMLE1BQU0sUUFBUSxHQUFHLGVBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3BELE1BQU0sV0FBVyxHQUFHLG1CQUFXLENBQUMsV0FBVyxDQUFDLEdBQUcsUUFBUSxRQUFRLENBQUMsQ0FBQztRQUNqRSxJQUFJLFdBQVcsRUFBRTtZQUNmLElBQUksR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDO1NBQzVCO2FBQU07WUFDTCxJQUFJLEdBQUcsV0FBVyxDQUFDO1lBQ25CLEtBQUssR0FBRyx5QkFBeUIsQ0FBQztZQUNsQyxLQUFLLEdBQUc7O1FBRU4sTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBUyxDQUFDLE9BQU8sQ0FBQztpQkFDN0IsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ2QsT0FBTyxLQUFLLFFBQVEsVUFBVSxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQzVDLEdBQUcscUJBQWEsRUFBRSxHQUFHLEVBQ3JCLEVBQUUsQ0FDSCxDQUFDO1lBQ0osQ0FBQyxDQUFDO2lCQUNELElBQUksQ0FBQyxLQUFLLENBQUM7T0FDYixDQUFDO1NBQ0g7S0FDRjtJQUNELE9BQU8sSUFBSSxrQkFBVSxDQUNuQixDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzVCLE9BQU8sT0FBTyxDQUFDO1lBQ2IsT0FBTztZQUNQLElBQUk7WUFDSixJQUFJLEVBQUU7Z0JBQ0osS0FBSyxFQUFFLEdBQUcsV0FBVyxDQUFDLElBQUksRUFBRTtnQkFDNUIsSUFBSTtnQkFDSixLQUFLO2FBQ047U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLEVBQ0Q7UUFDRSxFQUFFLEVBQUUsK0JBQStCO0tBQ3BDLENBQ0YsQ0FBQztBQUNKLENBQUM7QUFDRCxpQkFBUyxRQUFRLENBQUMifQ==