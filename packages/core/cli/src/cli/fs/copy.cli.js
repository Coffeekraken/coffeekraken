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
        define(["require", "exports", "../../node/fs/interface/SCliFsCopyParamsInterface", "@coffeekraken/s-promise", "@coffeekraken/sugar/node/fs/copySync", "@coffeekraken/sugar/node/is/directory", "@coffeekraken/s-log", "@coffeekraken/s-glob"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // @ts-nocheck
    const SCliFsCopyParamsInterface_1 = __importDefault(require("../../node/fs/interface/SCliFsCopyParamsInterface"));
    const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    const copySync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/copySync"));
    const directory_1 = __importDefault(require("@coffeekraken/sugar/node/is/directory"));
    const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
    const s_glob_1 = __importDefault(require("@coffeekraken/s-glob"));
    exports.default = (stringArgs = '') => {
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
            const finalParams = SCliFsCopyParamsInterface_1.default.apply(stringArgs);
            let files = [finalParams.src];
            if (finalParams.glob) {
                const paths = s_glob_1.default.resolve(finalParams.glob, {
                    cwd: finalParams.src,
                    nodir: false
                });
                files = paths.map(f => f.relPath);
            }
            files.forEach((path, i) => {
                const relPath = path;
                if (finalParams.glob)
                    path = `${finalParams.src}/${path}`;
                const type = (0, directory_1.default)(path) ? 'directory' : 'file';
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>[copy]</yellow> Copying the ${type} <cyan>${path}</cyan> to <cyan>${finalParams.glob ? `${finalParams.dest}/${relPath}` : finalParams.dest}</cyan>`,
                });
                // copy the file/directory
                (0, copySync_1.default)(path, finalParams.glob ? `${finalParams.dest}/${relPath}` : finalParams.dest);
                if (finalParams.chdir && files.length === i + 1) {
                    process.chdir(finalParams.dest);
                    emit('chdir', finalParams.dest);
                }
            });
            resolve();
        }));
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb3B5LmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLGNBQWM7SUFDZCxrSEFBNEY7SUFDNUYsd0VBQWlEO0lBQ2pELG9GQUE4RDtJQUM5RCxzRkFBa0U7SUFDbEUsZ0VBQXlDO0lBQ3pDLGtFQUEyQztJQUUzQyxrQkFBZSxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtRQUMvQixPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLEVBQUUsRUFBRTtZQUMxRCxNQUFNLFdBQVcsR0FBRyxtQ0FBMkIsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFbEUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFOUIsSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFO2dCQUNsQixNQUFNLEtBQUssR0FBRyxnQkFBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO29CQUM1QyxHQUFHLEVBQUUsV0FBVyxDQUFDLEdBQUc7b0JBQ3BCLEtBQUssRUFBRSxLQUFLO2lCQUNmLENBQUMsQ0FBQztnQkFDSCxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNyQztZQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBRXRCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQztnQkFFckIsSUFBSSxXQUFXLENBQUMsSUFBSTtvQkFBRSxJQUFJLEdBQUcsR0FBRyxXQUFXLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUUxRCxNQUFNLElBQUksR0FBRyxJQUFBLG1CQUFhLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO2dCQUV4RCxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLElBQUksRUFBRSxlQUFNLENBQUMsU0FBUztvQkFDdEIsS0FBSyxFQUFFLHVDQUF1QyxJQUFJLFVBQVUsSUFBSSxvQkFBb0IsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsSUFBSSxJQUFJLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxTQUFTO2lCQUN0SyxDQUFDLENBQUM7Z0JBRUgsMEJBQTBCO2dCQUMxQixJQUFBLGtCQUFVLEVBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLElBQUksSUFBSSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUV6RixJQUFJLFdBQVcsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUM3QyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDaEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ25DO1lBRUwsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLEVBQUUsQ0FBQztRQUVkLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMifQ==