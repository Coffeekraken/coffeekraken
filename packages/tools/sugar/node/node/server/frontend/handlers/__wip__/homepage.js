"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
 * @status              wip
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
exports.default = homepage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZXBhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbm9kZS9zZXJ2ZXIvZnJvbnRlbmQvaGFuZGxlcnMvX193aXBfXy9ob21lcGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFHZCw0Q0FBc0I7QUFDdEIsNEVBQXNEO0FBQ3RELHlFQUFtRDtBQUNuRCxpRUFBa0Q7QUFDbEQsa0VBQWtEO0FBQ2xELDRFQUFzRDtBQUN0RCw0RUFBb0Q7QUFFcEQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILFNBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDdkMsZ0NBQWdDO0lBQ2hDLE1BQU0sV0FBVyxHQUFHLHFCQUFhLEVBQUUsQ0FBQztJQUNwQyxNQUFNLFdBQVcsR0FBRyxjQUFhLEVBQUUsQ0FBQztJQUVwQyxJQUFJLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7SUFFdEMsMEJBQTBCO0lBQzFCLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFdBQVcsYUFBYSxDQUFDLEVBQUU7UUFDaEQsTUFBTSxJQUFJLEdBQUcsWUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLFdBQVcsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BFLElBQUksR0FBRyxJQUFJLENBQUM7UUFDWixLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztRQUN6QixJQUFJLEdBQUcsYUFBYSxDQUFDO0tBQ3RCO1NBQU07UUFDTCxNQUFNLFFBQVEsR0FBRyxlQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNwRCxNQUFNLFdBQVcsR0FBRyxtQkFBVyxDQUFDLFdBQVcsQ0FBQyxHQUFHLFFBQVEsUUFBUSxDQUFDLENBQUM7UUFDakUsSUFBSSxXQUFXLEVBQUU7WUFDZixJQUFJLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQztTQUM1QjthQUFNO1lBQ0wsSUFBSSxHQUFHLFdBQVcsQ0FBQztZQUNuQixLQUFLLEdBQUcseUJBQXlCLENBQUM7WUFDbEMsS0FBSyxHQUFHOztRQUVOLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQVMsQ0FBQyxPQUFPLENBQUM7aUJBQzdCLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUNkLE9BQU8sS0FBSyxRQUFRLFVBQVUsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUM1QyxHQUFHLHFCQUFhLEVBQUUsR0FBRyxFQUNyQixFQUFFLENBQ0gsQ0FBQztZQUNKLENBQUMsQ0FBQztpQkFDRCxJQUFJLENBQUMsS0FBSyxDQUFDO09BQ2IsQ0FBQztTQUNIO0tBQ0Y7SUFDRCxPQUFPLElBQUksa0JBQVUsQ0FDbkIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUM1QixPQUFPLE9BQU8sQ0FBQztZQUNiLE9BQU87WUFDUCxJQUFJO1lBQ0osSUFBSSxFQUFFO2dCQUNKLEtBQUssRUFBRSxHQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUU7Z0JBQzVCLElBQUk7Z0JBQ0osS0FBSzthQUNOO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxFQUNEO1FBQ0UsRUFBRSxFQUFFLCtCQUErQjtLQUNwQyxDQUNGLENBQUM7QUFDSixDQUFDO0FBQ0Qsa0JBQWUsUUFBUSxDQUFDIn0=