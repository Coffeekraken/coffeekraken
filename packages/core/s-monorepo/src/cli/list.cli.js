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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/s-promise", "../node/interface/SCliMonoListParamsInterface", "@coffeekraken/s-glob", "@coffeekraken/sugar/node/path/packageRoot", "@coffeekraken/sugar/node/fs/readJsonSync"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // @ts-nocheck
    const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    const SCliMonoListParamsInterface_1 = __importDefault(require("../node/interface/SCliMonoListParamsInterface"));
    const s_glob_1 = __importDefault(require("@coffeekraken/s-glob"));
    const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
    const readJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/readJsonSync"));
    exports.default = (stringArgs = '') => {
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
            const finalParams = SCliMonoListParamsInterface_1.default.apply(stringArgs);
            const root = (0, packageRoot_1.default)(process.cwd(), true);
            const rootPackageJson = (0, readJsonSync_1.default)(`${root}/package.json`);
            const files = s_glob_1.default.resolve(finalParams.packagesGlobs, {
                cwd: root,
            });
            emit('log', {
                value: `<cyan>${files.length}</cyan> packages found:`,
            });
            files.forEach((file) => {
                let version = 'unknown', name, path = file.relPath;
                if (file.relPath.match(/package\.json$/)) {
                    const json = (0, readJsonSync_1.default)(file.path);
                    version = json.version;
                    name = json.name;
                }
                emit('log', {
                    value: `<yellow>${name !== null && name !== void 0 ? name : file.relPath.split('/').pop()}</yellow> (<${version === rootPackageJson.version ? 'green' : 'red'}>${version}</${version === rootPackageJson.version ? 'green' : 'red'}>) <cyan>${path}</cyan>`,
                });
            });
            resolve();
        }));
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLGNBQWM7SUFDZCx3RUFBaUQ7SUFDakQsZ0hBQTBGO0lBQzFGLGtFQUEyQztJQUMzQyw0RkFBc0U7SUFDdEUsNEZBQXNFO0lBRXRFLGtCQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO1FBQy9CLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQzVELE1BQU0sV0FBVyxHQUFHLHFDQUE2QixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUVwRSxNQUFNLElBQUksR0FBRyxJQUFBLHFCQUFhLEVBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRWhELE1BQU0sZUFBZSxHQUFHLElBQUEsc0JBQWMsRUFBQyxHQUFHLElBQUksZUFBZSxDQUFDLENBQUM7WUFFL0QsTUFBTSxLQUFLLEdBQUcsZ0JBQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRTtnQkFDckQsR0FBRyxFQUFFLElBQUk7YUFDWixDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLEtBQUssRUFBRSxTQUFTLEtBQUssQ0FBQyxNQUFNLHlCQUF5QjthQUN4RCxDQUFDLENBQUM7WUFFSCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ25CLElBQUksT0FBTyxHQUFHLFNBQVMsRUFDbkIsSUFBSSxFQUNKLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUV4QixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7b0JBQ3RDLE1BQU0sSUFBSSxHQUFHLElBQUEsc0JBQWMsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3ZDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUN2QixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztpQkFDcEI7Z0JBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixLQUFLLEVBQUUsV0FDSCxJQUFJLGFBQUosSUFBSSxjQUFKLElBQUksR0FBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQ3ZDLGVBQ0ksT0FBTyxLQUFLLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FDcEQsSUFBSSxPQUFPLEtBQ1AsT0FBTyxLQUFLLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FDcEQsWUFBWSxJQUFJLFNBQVM7aUJBQzVCLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDIn0=