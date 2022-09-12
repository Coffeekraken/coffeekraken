"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(require("child_process"));
const string_1 = require("@coffeekraken/sugar/string");
const path_1 = require("@coffeekraken/sugar/path");
const fs_1 = require("@coffeekraken/sugar/fs");
function __execPhp(scriptPath, params, settings) {
    return new Promise((resolve, reject) => {
        settings = Object.assign({ paramsThroughFile: false }, (settings !== null && settings !== void 0 ? settings : {}));
        let paramsFilePath, paramsStr;
        if (settings.paramsThroughFile) {
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
exports.default = __execPhp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0VBQTJDO0FBRzNDLHVEQUFzRDtBQUN0RCxtREFBMkU7QUFDM0UsK0NBQXlEO0FBeUJ6RCxTQUF3QixTQUFTLENBQzdCLFVBQWtCLEVBQ2xCLE1BQVcsRUFDWCxRQUFvQztJQUVwQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLFFBQVEsbUJBQ0osaUJBQWlCLEVBQUUsS0FBSyxJQUNyQixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO1FBQ0YsSUFBSSxjQUFjLEVBQUUsU0FBUyxDQUFDO1FBRTlCLElBQUksUUFBUSxDQUFDLGlCQUFpQixFQUFFO1lBQzVCLGNBQWMsR0FBRyxHQUFHLElBQUEsc0JBQWUsR0FBRSxhQUFhLElBQUEsaUJBQVEsR0FBRSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQ3RFLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxXQUFXLENBQzlCLE9BQU8sQ0FBQztZQUNULElBQUEsb0JBQWUsRUFBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDM0M7YUFBTTtZQUNILFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25DLFNBQVMsR0FBRyxTQUFTO2lCQUNoQixPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztpQkFDdEIsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7aUJBQ3RCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2lCQUN0QixPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztpQkFDdEIsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7aUJBQ3RCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2lCQUN0QixPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztpQkFDdEIsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMvQjtRQUVELHVDQUF1QztRQUN2QyxJQUFJLE1BQU0sQ0FBQztRQUVYLE1BQU0sR0FBRyx1QkFBYyxDQUFDLElBQUksQ0FDeEIsT0FBTyxVQUFVLEtBQUssY0FBYyxhQUFkLGNBQWMsY0FBZCxjQUFjLEdBQUksU0FBUyxHQUFHLEVBQ3BELENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN0Qix3QkFBd0I7WUFDeEIsWUFBWTtZQUNaLDhDQUE4QztZQUM5QyxxQkFBcUI7WUFDckIsSUFBSTtZQUVKLElBQUksS0FBSyxFQUFFO2dCQUNQLE9BQU8sTUFBTSxDQUNUO29CQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDeEMsS0FBSztvQkFDTCxNQUFNO2lCQUNULENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNmLENBQUM7YUFDTDtZQUNELE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQ0osQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQXZERCw0QkF1REMifQ==