"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const string_1 = require("@coffeekraken/sugar/string");
const child_process_1 = __importDefault(require("child_process"));
const fs_2 = __importDefault(require("fs"));
function __execPhp(scriptPath, params, settings) {
    return new s_promise_1.default(({ resolve, reject, emit }) => {
        var _a;
        const finalSettings = (0, object_1.__deepMerge)({
            paramsThroughFile: false,
            log: {
                verbose: s_env_1.default.is('verbose'),
            },
        }, settings !== null && settings !== void 0 ? settings : {});
        let paramsFilePath, paramsStr;
        const duration = new s_duration_1.default();
        if (finalSettings.paramsThroughFile) {
            paramsFilePath = `${(0, path_1.__packageTmpDir)()}/exec-php/${(0, string_1.__uniqid)()}-${Math.round(Math.random() * 99999999999)}.json`;
            (0, fs_1.__writeJsonSync)(paramsFilePath, params);
        }
        else {
            paramsStr = JSON.stringify(params);
            paramsStr = paramsStr
                .replace(/\\n/g, '\\n')
                .replace(/\\'/g, "\\'")
                .replace(/\\"/g, '\\"')
                .replace(/\\&/g, '\\&')
                .replace(/\\r/g, '\\r')
                .replace(/\\t/g, '\\t')
                .replace(/\\b/g, '\\b')
                .replace(/\\f/g, '\\f');
        }
        // quicker with execSync than spawnSync
        let result;
        if ((_a = finalSettings === null || finalSettings === void 0 ? void 0 : finalSettings.log) === null || _a === void 0 ? void 0 : _a.verbose) {
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>[execPhp]</yellow> Executing php command "<magenta>${`php ${scriptPath} "${paramsFilePath !== null && paramsFilePath !== void 0 ? paramsFilePath : paramsStr}"`}</magenta>"`,
            });
        }
        result = child_process_1.default.exec(`php ${scriptPath} "${paramsFilePath !== null && paramsFilePath !== void 0 ? paramsFilePath : paramsStr}"`, (error, stdout, stderr) => {
            var _a;
            if (paramsFilePath) {
                try {
                    fs_2.default.unlinkSync(paramsFilePath);
                }
                catch (e) { }
            }
            if (error) {
                return reject([
                    stdout.split('\n').slice(-10).join('\n'),
                    error,
                    stderr,
                ].join('\n'));
            }
            if ((_a = finalSettings === null || finalSettings === void 0 ? void 0 : finalSettings.log) === null || _a === void 0 ? void 0 : _a.verbose) {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<green>[execPhp]</green> Command executed <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`,
                });
            }
            resolve(stdout);
        });
    });
}
exports.default = __execPhp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMEVBQW1EO0FBQ25ELGdFQUF5QztBQUN6QyxnRUFBeUM7QUFDekMsd0VBQWlEO0FBQ2pELCtDQUF5RDtBQUN6RCx1REFBeUQ7QUFDekQsbURBQTJEO0FBQzNELHVEQUFzRDtBQUN0RCxrRUFBMkM7QUFDM0MsNENBQXNCO0FBaUN0QixTQUF3QixTQUFTLENBQzdCLFVBQWtCLEVBQ2xCLE1BQVcsRUFDWCxRQUFvQztJQUVwQyxPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOztRQUNoRCxNQUFNLGFBQWEsR0FBcUIsSUFBQSxvQkFBVyxFQUMvQztZQUNJLGlCQUFpQixFQUFFLEtBQUs7WUFDeEIsR0FBRyxFQUFFO2dCQUNELE9BQU8sRUFBRSxlQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQzthQUNoQztTQUNKLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUFDO1FBQ0YsSUFBSSxjQUFjLEVBQUUsU0FBUyxDQUFDO1FBRTlCLE1BQU0sUUFBUSxHQUFHLElBQUksb0JBQVcsRUFBRSxDQUFDO1FBRW5DLElBQUksYUFBYSxDQUFDLGlCQUFpQixFQUFFO1lBQ2pDLGNBQWMsR0FBRyxHQUFHLElBQUEsc0JBQWUsR0FBRSxhQUFhLElBQUEsaUJBQVEsR0FBRSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQ3RFLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxXQUFXLENBQzlCLE9BQU8sQ0FBQztZQUNULElBQUEsb0JBQWUsRUFBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDM0M7YUFBTTtZQUNILFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25DLFNBQVMsR0FBRyxTQUFTO2lCQUNoQixPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztpQkFDdEIsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7aUJBQ3RCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2lCQUN0QixPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztpQkFDdEIsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7aUJBQ3RCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2lCQUN0QixPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztpQkFDdEIsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMvQjtRQUVELHVDQUF1QztRQUN2QyxJQUFJLE1BQU0sQ0FBQztRQUVYLElBQUksTUFBQSxhQUFhLGFBQWIsYUFBYSx1QkFBYixhQUFhLENBQUUsR0FBRywwQ0FBRSxPQUFPLEVBQUU7WUFDN0IsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixJQUFJLEVBQUUsZUFBTSxDQUFDLFNBQVM7Z0JBQ3RCLEtBQUssRUFBRSw4REFBOEQsT0FBTyxVQUFVLEtBQ2xGLGNBQWMsYUFBZCxjQUFjLGNBQWQsY0FBYyxHQUFJLFNBQ3RCLEdBQUcsYUFBYTthQUNuQixDQUFDLENBQUM7U0FDTjtRQUVELE1BQU0sR0FBRyx1QkFBYyxDQUFDLElBQUksQ0FDeEIsT0FBTyxVQUFVLEtBQUssY0FBYyxhQUFkLGNBQWMsY0FBZCxjQUFjLEdBQUksU0FBUyxHQUFHLEVBQ3BELENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRTs7WUFDdEIsSUFBSSxjQUFjLEVBQUU7Z0JBQ2hCLElBQUk7b0JBQ0EsWUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztpQkFDbkM7Z0JBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTthQUNqQjtZQUVELElBQUksS0FBSyxFQUFFO2dCQUNQLE9BQU8sTUFBTSxDQUNUO29CQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDeEMsS0FBSztvQkFDTCxNQUFNO2lCQUNULENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNmLENBQUM7YUFDTDtZQUVELElBQUksTUFBQSxhQUFhLGFBQWIsYUFBYSx1QkFBYixhQUFhLENBQUUsR0FBRywwQ0FBRSxPQUFPLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLGVBQU0sQ0FBQyxTQUFTO29CQUN0QixLQUFLLEVBQUUsb0ZBQ0gsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUNuQixXQUFXO2lCQUNkLENBQUMsQ0FBQzthQUNOO1lBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBakZELDRCQWlGQyJ9