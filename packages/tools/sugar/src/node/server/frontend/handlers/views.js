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
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const STemplate_1 = __importDefault(require("../../../template/STemplate"));
const fs_1 = __importDefault(require("fs"));
const SDuration_1 = __importDefault(require("../../../../shared/time/SDuration"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
/**
 * @name                views
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 * @status              wip
 *
 * This function is responsible of responding to express requests made on the "views" section
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          server          The express server instance
 * @return        {Promise}                         A promise that will be resolved with the response to send to the client
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function views(req, res, settings = {}) {
    return new s_promise_1.default(({ resolve, reject, pipe }) => __awaiter(this, void 0, void 0, function* () {
        let params = req.params[0].split('/');
        const duration = new SDuration_1.default();
        let rootDirs = STemplate_1.default.getRootDirs(settings.rootDir || []);
        for (let i = 0; i < rootDirs.length; i++) {
            const rootDir = rootDirs[i];
            for (let j = 0; j < Object.keys(STemplate_1.default.engines).length; j++) {
                const engineExt = Object.keys(STemplate_1.default.engines)[j];
                const viewPath = path_1.default.resolve(rootDir, params.join('/')) + `.${engineExt}`;
                if (fs_1.default.existsSync(viewPath)) {
                    const relativeViewPath = path_1.default.relative(rootDir, viewPath);
                    const templateInstance = new STemplate_1.default(relativeViewPath, {
                        rootDirs
                    });
                    const resultPromise = templateInstance.render(Object.assign({}, (res.templateData || {})));
                    pipe(resultPromise);
                    const resultObj = yield resultPromise;
                    resolve(`<bgGreen><black> views </black></bgGreen> file "<yellow>${req.path}</yellow> served in <cyan>${duration.end()}s</cyan>"`);
                    res.status(200);
                    res.type('text/html');
                    return res.send(resultObj.content);
                }
            }
        }
        // view not found
        const notFoundTemplateInstance = new STemplate_1.default('pages.404', {
            rootDir: rootDirs
        });
        const notFoundObj = yield notFoundTemplateInstance.render(Object.assign(Object.assign({}, (res.templateData || {})), { title: `View not found...`, error: `The requested view "${req.path}" does not exists in any of these directories:
      <ol>  
      ${notFoundTemplateInstance._settings.rootDir.map((dir) => {
                return `<li>${dir}</li>`;
            })}
      </ol>
      ` }));
        res.status(404);
        res.type('text/html');
        res.send(notFoundObj.content);
        reject(notFoundObj.content);
    }));
}
exports.default = views;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2aWV3cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFHZCxnREFBMEI7QUFFMUIsNEVBQXNEO0FBQ3RELDRDQUFzQjtBQUN0QixrRkFBNEQ7QUFDNUQsd0VBQTZEO0FBRTdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxTQUF3QixLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNuRCxPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ3hELElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXRDLE1BQU0sUUFBUSxHQUFHLElBQUksbUJBQVcsRUFBRSxDQUFDO1FBRW5DLElBQUksUUFBUSxHQUFHLG1CQUFXLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUM7UUFFL0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEMsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTVCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNoRSxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXRELE1BQU0sUUFBUSxHQUNaLGNBQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO2dCQUU5RCxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQzdCLE1BQU0sZ0JBQWdCLEdBQUcsY0FBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQzVELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxtQkFBVyxDQUFDLGdCQUFnQixFQUFFO3dCQUN6RCxRQUFRO3FCQUNULENBQUMsQ0FBQztvQkFDSCxNQUFNLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLG1CQUN4QyxDQUFDLEdBQUcsQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLEVBQzNCLENBQUM7b0JBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUNwQixNQUFNLFNBQVMsR0FBRyxNQUFNLGFBQWEsQ0FBQztvQkFDdEMsT0FBTyxDQUNMLDJEQUNFLEdBQUcsQ0FBQyxJQUNOLDZCQUE2QixRQUFRLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FDdkQsQ0FBQztvQkFDRixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUN0QixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUNwQzthQUNGO1NBQ0Y7UUFFRCxpQkFBaUI7UUFDakIsTUFBTSx3QkFBd0IsR0FBRyxJQUFJLG1CQUFXLENBQUMsV0FBVyxFQUFFO1lBQzVELE9BQU8sRUFBRSxRQUFRO1NBQ2xCLENBQUMsQ0FBQztRQUVILE1BQU0sV0FBVyxHQUFHLE1BQU0sd0JBQXdCLENBQUMsTUFBTSxpQ0FDcEQsQ0FBQyxHQUFHLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxLQUMzQixLQUFLLEVBQUUsbUJBQW1CLEVBQzFCLEtBQUssRUFBRSx1QkFDTCxHQUFHLENBQUMsSUFDTjs7UUFFRSx3QkFBd0IsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUN2RCxPQUFPLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDM0IsQ0FBQyxDQUFDOztPQUVELElBQ0QsQ0FBQztRQUVILEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0QixHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QixNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDTCxDQUFDO0FBL0RELHdCQStEQyJ9