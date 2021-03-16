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
const SDuration_1 = __importDefault(require("../../../time/SDuration"));
const s_promise_1 = __importDefault(require("../@coffeekraken/s-promise"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbm9kZS9zZXJ2ZXIvZnJvbnRlbmQvaGFuZGxlcnMvdmlld3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0FBR2QsZ0RBQTBCO0FBRTFCLDRFQUFzRDtBQUN0RCw0Q0FBc0I7QUFDdEIsd0VBQWtEO0FBQ2xELDJFQUFnRTtBQUVoRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsU0FBd0IsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDbkQsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUN4RCxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV0QyxNQUFNLFFBQVEsR0FBRyxJQUFJLG1CQUFXLEVBQUUsQ0FBQztRQUVuQyxJQUFJLFFBQVEsR0FBRyxtQkFBVyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRS9ELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU1QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDaEUsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV0RCxNQUFNLFFBQVEsR0FDWixjQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztnQkFFOUQsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUM3QixNQUFNLGdCQUFnQixHQUFHLGNBQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUM1RCxNQUFNLGdCQUFnQixHQUFHLElBQUksbUJBQVcsQ0FBQyxnQkFBZ0IsRUFBRTt3QkFDekQsUUFBUTtxQkFDVCxDQUFDLENBQUM7b0JBQ0gsTUFBTSxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxtQkFDeEMsQ0FBQyxHQUFHLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxFQUMzQixDQUFDO29CQUNILElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDcEIsTUFBTSxTQUFTLEdBQUcsTUFBTSxhQUFhLENBQUM7b0JBQ3RDLE9BQU8sQ0FDTCwyREFDRSxHQUFHLENBQUMsSUFDTiw2QkFBNkIsUUFBUSxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQ3ZELENBQUM7b0JBQ0YsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDdEIsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDcEM7YUFDRjtTQUNGO1FBRUQsaUJBQWlCO1FBQ2pCLE1BQU0sd0JBQXdCLEdBQUcsSUFBSSxtQkFBVyxDQUFDLFdBQVcsRUFBRTtZQUM1RCxPQUFPLEVBQUUsUUFBUTtTQUNsQixDQUFDLENBQUM7UUFFSCxNQUFNLFdBQVcsR0FBRyxNQUFNLHdCQUF3QixDQUFDLE1BQU0saUNBQ3BELENBQUMsR0FBRyxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUMsS0FDM0IsS0FBSyxFQUFFLG1CQUFtQixFQUMxQixLQUFLLEVBQUUsdUJBQ0wsR0FBRyxDQUFDLElBQ047O1FBRUUsd0JBQXdCLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDdkQsT0FBTyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQzNCLENBQUMsQ0FBQzs7T0FFRCxJQUNELENBQUM7UUFFSCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdEIsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQS9ERCx3QkErREMifQ==