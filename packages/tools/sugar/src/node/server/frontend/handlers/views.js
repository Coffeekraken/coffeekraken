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
const path_1 = __importDefault(require("path"));
const STemplate_1 = __importDefault(require("../../../template/STemplate"));
const fs_1 = __importDefault(require("fs"));
const SDuration_1 = __importDefault(require("../../../time/SDuration"));
const SPromise_1 = __importDefault(require("../../../promise/SPromise"));
module.exports = function views(req, res, settings = {}) {
    const promise = new SPromise_1.default();
    (() => __awaiter(this, void 0, void 0, function* () {
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
                    SPromise_1.default.pipe(resultPromise, promise);
                    const resultObj = yield resultPromise;
                    promise.resolve(`<bgGreen><black> views </black></bgGreen> file "<yellow>${req.path}</yellow> served in <cyan>${duration.end()}s</cyan>"`);
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
        promise.reject(notFoundObj.content);
    }))();
    return promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2aWV3cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7OztBQUdkLGdEQUEwQjtBQUUxQiw0RUFBc0Q7QUFDdEQsNENBQXNCO0FBQ3RCLHdFQUFrRDtBQUNsRCx5RUFBK0Q7QUFxQi9ELGlCQUFTLFNBQVMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDN0MsTUFBTSxPQUFPLEdBQUcsSUFBSSxrQkFBVSxFQUFFLENBQUM7SUFFakMsQ0FBQyxHQUFTLEVBQUU7UUFDVixJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV0QyxNQUFNLFFBQVEsR0FBRyxJQUFJLG1CQUFXLEVBQUUsQ0FBQztRQUVuQyxJQUFJLFFBQVEsR0FBRyxtQkFBVyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRS9ELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU1QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDaEUsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV0RCxNQUFNLFFBQVEsR0FDWixjQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztnQkFFOUQsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUM3QixNQUFNLGdCQUFnQixHQUFHLGNBQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUM1RCxNQUFNLGdCQUFnQixHQUFHLElBQUksbUJBQVcsQ0FBQyxnQkFBZ0IsRUFBRTt3QkFDekQsUUFBUTtxQkFDVCxDQUFDLENBQUM7b0JBQ0gsTUFBTSxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxtQkFDeEMsQ0FBQyxHQUFHLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxFQUMzQixDQUFDO29CQUNILGtCQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDeEMsTUFBTSxTQUFTLEdBQUcsTUFBTSxhQUFhLENBQUM7b0JBQ3RDLE9BQU8sQ0FBQyxPQUFPLENBQ2IsMkRBQ0UsR0FBRyxDQUFDLElBQ04sNkJBQTZCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUN2RCxDQUFDO29CQUNGLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3RCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3BDO2FBQ0Y7U0FDRjtRQUVELGlCQUFpQjtRQUNqQixNQUFNLHdCQUF3QixHQUFHLElBQUksbUJBQVcsQ0FBQyxXQUFXLEVBQUU7WUFDNUQsT0FBTyxFQUFFLFFBQVE7U0FDbEIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxXQUFXLEdBQUcsTUFBTSx3QkFBd0IsQ0FBQyxNQUFNLGlDQUNwRCxDQUFDLEdBQUcsQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLEtBQzNCLEtBQUssRUFBRSxtQkFBbUIsRUFDMUIsS0FBSyxFQUFFLHVCQUNMLEdBQUcsQ0FBQyxJQUNOOztRQUVFLHdCQUF3QixDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ3ZELE9BQU8sT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUMzQixDQUFDLENBQUM7O09BRUQsSUFDRCxDQUFDO1FBRUgsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlCLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQztJQUVMLE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMsQ0FBQyJ9