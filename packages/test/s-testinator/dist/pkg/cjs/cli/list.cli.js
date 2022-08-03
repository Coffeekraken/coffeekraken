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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const SCliMonoListParamsInterface_1 = __importDefault(require("../node/interface/SCliMonoListParamsInterface"));
const s_glob_1 = __importDefault(require("@coffeekraken/s-glob"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const readJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/readJsonSync"));
exports.default = (stringArgs = '') => {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
        const finalParams = SCliMonoListParamsInterface_1.default.apply(stringArgs);
        const root = (0, packageRoot_1.default)(process.cwd(), {
            highest: true,
        });
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
                console.log(file.relPath);
                if (json.type !== 'module') {
                }
            }
            // emit('log', {
            //     value: `<yellow>${
            //         name ?? file.relPath.split('/').pop()
            //     }</yellow> (<${
            //         version === rootPackageJson.version ? 'green' : 'red'
            //     }>${version}</${
            //         version === rootPackageJson.version ? 'green' : 'red'
            //     }>) <cyan>${path}</cyan>`,
            // });
        });
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLHdFQUFpRDtBQUNqRCxnSEFBMEY7QUFDMUYsa0VBQTJDO0FBQzNDLDRGQUFzRTtBQUN0RSw0RkFBc0U7QUFFdEUsa0JBQWUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDL0IsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDNUQsTUFBTSxXQUFXLEdBQUcscUNBQTZCLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXBFLE1BQU0sSUFBSSxHQUFHLElBQUEscUJBQWEsRUFBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDdEMsT0FBTyxFQUFFLElBQUk7U0FDaEIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxlQUFlLEdBQUcsSUFBQSxzQkFBYyxFQUFDLEdBQUcsSUFBSSxlQUFlLENBQUMsQ0FBQztRQUUvRCxNQUFNLEtBQUssR0FBRyxnQkFBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFO1lBQ3JELEdBQUcsRUFBRSxJQUFJO1NBQ1osQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLEtBQUssRUFBRSxTQUFTLEtBQUssQ0FBQyxNQUFNLHlCQUF5QjtTQUN4RCxDQUFDLENBQUM7UUFFSCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDbkIsSUFBSSxPQUFPLEdBQUcsU0FBUyxFQUNuQixJQUFJLEVBQ0osSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFFeEIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO2dCQUN0QyxNQUFNLElBQUksR0FBRyxJQUFBLHNCQUFjLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN2QyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDdkIsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBRWpCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMxQixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO2lCQUMzQjthQUNKO1lBRUQsZ0JBQWdCO1lBQ2hCLHlCQUF5QjtZQUN6QixnREFBZ0Q7WUFDaEQsc0JBQXNCO1lBQ3RCLGdFQUFnRTtZQUNoRSx1QkFBdUI7WUFDdkIsZ0VBQWdFO1lBQ2hFLGlDQUFpQztZQUNqQyxNQUFNO1FBQ1YsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMifQ==