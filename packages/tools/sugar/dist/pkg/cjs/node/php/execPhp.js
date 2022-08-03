"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(require("child_process"));
const uniqid_1 = __importDefault(require("@coffeekraken/sugar/shared/string/uniqid"));
const packageTmpDir_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageTmpDir"));
const writeJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeJsonSync"));
function execPhp(scriptPath, params, settings) {
    return new Promise((resolve, reject) => {
        settings = Object.assign({ paramsThroughFile: false }, (settings !== null && settings !== void 0 ? settings : {}));
        let paramsFilePath, paramsStr;
        if (settings.paramsThroughFile) {
            paramsFilePath = `${(0, packageTmpDir_1.default)()}/exec-php/${(0, uniqid_1.default)()}-${Math.round(Math.random() * 99999999999)}.json`;
            (0, writeJsonSync_1.default)(paramsFilePath, params);
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
        result = child_process_1.default.exec(`php ${scriptPath} "${paramsFilePath !== null && paramsFilePath !== void 0 ? paramsFilePath : paramsStr}"`, (error, stdout, stderr) => {
            // if (paramsFilePath) {
            //     try {
            //         // __fs.unlinkSync(paramsFilePath);
            //     } catch (e) {}
            // }
            if (error) {
                return reject([
                    stdout.split('\n').slice(-10).join('\n'),
                    error,
                    stderr,
                ].join('\n'));
            }
            resolve(stdout);
        });
    });
}
exports.default = execPhp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0VBQTJDO0FBSTNDLHNGQUFnRTtBQUNoRSxnR0FBMEU7QUFDMUUsOEZBQXdFO0FBeUJ4RSxTQUF3QixPQUFPLENBQzNCLFVBQWtCLEVBQ2xCLE1BQVcsRUFDWCxRQUFvQztJQUVwQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLFFBQVEsbUJBQ0osaUJBQWlCLEVBQUUsS0FBSyxJQUNyQixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO1FBQ0YsSUFBSSxjQUFjLEVBQUUsU0FBUyxDQUFDO1FBRTlCLElBQUksUUFBUSxDQUFDLGlCQUFpQixFQUFFO1lBQzVCLGNBQWMsR0FBRyxHQUFHLElBQUEsdUJBQWUsR0FBRSxhQUFhLElBQUEsZ0JBQVEsR0FBRSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQ3RFLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxXQUFXLENBQzlCLE9BQU8sQ0FBQztZQUNULElBQUEsdUJBQWUsRUFBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDM0M7YUFBTTtZQUNILFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25DLFNBQVMsR0FBRyxTQUFTO2lCQUNoQixPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztpQkFDdEIsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7aUJBQ3RCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2lCQUN0QixPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztpQkFDdEIsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7aUJBQ3RCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2lCQUN0QixPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztpQkFDdEIsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMvQjtRQUVELHVDQUF1QztRQUN2QyxJQUFJLE1BQU0sQ0FBQztRQUVYLE1BQU0sR0FBRyx1QkFBYyxDQUFDLElBQUksQ0FDeEIsT0FBTyxVQUFVLEtBQUssY0FBYyxhQUFkLGNBQWMsY0FBZCxjQUFjLEdBQUksU0FBUyxHQUFHLEVBQ3BELENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN0Qix3QkFBd0I7WUFDeEIsWUFBWTtZQUNaLDhDQUE4QztZQUM5QyxxQkFBcUI7WUFDckIsSUFBSTtZQUVKLElBQUksS0FBSyxFQUFFO2dCQUNQLE9BQU8sTUFBTSxDQUNUO29CQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDeEMsS0FBSztvQkFDTCxNQUFNO2lCQUNULENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNmLENBQUM7YUFDTDtZQUNELE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQ0osQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQXZERCwwQkF1REMifQ==