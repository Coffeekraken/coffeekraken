"use strict";
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
// @ts-nocheck
const s_glob_1 = __importDefault(require("@coffeekraken/s-glob"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const copySync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/copySync"));
const directory_1 = __importDefault(require("@coffeekraken/sugar/node/is/directory"));
const SCliFsCopyParamsInterface_1 = __importDefault(require("../../node/fs/interface/SCliFsCopyParamsInterface"));
exports.default = (stringArgs = '') => {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
        const finalParams = SCliFsCopyParamsInterface_1.default.apply(stringArgs);
        let files = [finalParams.src];
        if (finalParams.glob) {
            const paths = s_glob_1.default.resolve(finalParams.glob, {
                cwd: finalParams.src,
                nodir: false,
            });
            files = paths.map((f) => f.relPath);
        }
        files.forEach((path, i) => {
            const relPath = path;
            if (finalParams.glob)
                path = `${finalParams.src}/${path}`;
            const type = (0, directory_1.default)(path) ? 'directory' : 'file';
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>[copy]</yellow> Copying the ${type} <cyan>${path}</cyan> to <cyan>${finalParams.glob
                    ? `${finalParams.dest}/${relPath}`
                    : finalParams.dest}</cyan>`,
            });
            // copy the file/directory
            (0, copySync_1.default)(path, finalParams.glob
                ? `${finalParams.dest}/${relPath}`
                : finalParams.dest);
            if (finalParams.chdir && files.length === i + 1) {
                process.chdir(finalParams.dest);
                emit('chdir', finalParams.dest);
            }
        });
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLGtFQUEyQztBQUMzQyxnRUFBeUM7QUFDekMsd0VBQWlEO0FBQ2pELG9GQUE4RDtBQUM5RCxzRkFBa0U7QUFDbEUsa0hBQTRGO0FBRTVGLGtCQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQy9CLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzVELE1BQU0sV0FBVyxHQUFHLG1DQUEyQixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVsRSxJQUFJLEtBQUssR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU5QixJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUU7WUFDbEIsTUFBTSxLQUFLLEdBQUcsZ0JBQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTtnQkFDNUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxHQUFHO2dCQUNwQixLQUFLLEVBQUUsS0FBSzthQUNmLENBQUMsQ0FBQztZQUNILEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdkM7UUFFRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQztZQUVyQixJQUFJLFdBQVcsQ0FBQyxJQUFJO2dCQUFFLElBQUksR0FBRyxHQUFHLFdBQVcsQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFFMUQsTUFBTSxJQUFJLEdBQUcsSUFBQSxtQkFBYSxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUV4RCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLElBQUksRUFBRSxlQUFNLENBQUMsU0FBUztnQkFDdEIsS0FBSyxFQUFFLHVDQUF1QyxJQUFJLFVBQVUsSUFBSSxvQkFDNUQsV0FBVyxDQUFDLElBQUk7b0JBQ1osQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLElBQUksSUFBSSxPQUFPLEVBQUU7b0JBQ2xDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFDdEIsU0FBUzthQUNaLENBQUMsQ0FBQztZQUVILDBCQUEwQjtZQUMxQixJQUFBLGtCQUFVLEVBQ04sSUFBSSxFQUNKLFdBQVcsQ0FBQyxJQUFJO2dCQUNaLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxJQUFJLElBQUksT0FBTyxFQUFFO2dCQUNsQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FDekIsQ0FBQztZQUVGLElBQUksV0FBVyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzdDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNuQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDIn0=