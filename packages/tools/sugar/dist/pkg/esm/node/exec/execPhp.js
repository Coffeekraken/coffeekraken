import __SDuration from '@coffeekraken/s-duration';
import __SEnv from '@coffeekraken/s-env';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import { __writeJsonSync } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageTmpDir } from '@coffeekraken/sugar/path';
import { __uniqid } from '@coffeekraken/sugar/string';
import __childProcess from 'child_process';
import __fs from 'fs';
export default function __execPhp(scriptPath, params, settings) {
    return new __SPromise(({ resolve, reject, emit }) => {
        var _a;
        const finalSettings = __deepMerge({
            paramsThroughFile: false,
            log: {
                verbose: __SEnv.is('verbose'),
            },
        }, settings !== null && settings !== void 0 ? settings : {});
        let paramsFilePath, paramsStr;
        const duration = new __SDuration();
        if (finalSettings.paramsThroughFile) {
            paramsFilePath = `${__packageTmpDir()}/exec-php/${__uniqid()}-${Math.round(Math.random() * 99999999999)}.json`;
            __writeJsonSync(paramsFilePath, params);
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
                type: __SLog.TYPE_INFO,
                value: `<yellow>[execPhp]</yellow> Executing php command "<magenta>${`php ${scriptPath} "${paramsFilePath !== null && paramsFilePath !== void 0 ? paramsFilePath : paramsStr}"`}</magenta>"`,
            });
        }
        result = __childProcess.exec(`php ${scriptPath} "${paramsFilePath !== null && paramsFilePath !== void 0 ? paramsFilePath : paramsStr}"`, {
            maxBuffer: 1024 * 1024 * 50
        }, (error, stdout, stderr) => {
            var _a;
            if (paramsFilePath) {
                try {
                    __fs.unlinkSync(paramsFilePath);
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
                    type: __SLog.TYPE_INFO,
                    value: `<green>[execPhp]</green> Command executed <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`,
                });
            }
            resolve(stdout);
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLGNBQWMsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBaUN0QixNQUFNLENBQUMsT0FBTyxVQUFVLFNBQVMsQ0FDN0IsVUFBa0IsRUFDbEIsTUFBVyxFQUNYLFFBQW9DO0lBRXBDLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTs7UUFDaEQsTUFBTSxhQUFhLEdBQXFCLFdBQVcsQ0FDL0M7WUFDSSxpQkFBaUIsRUFBRSxLQUFLO1lBQ3hCLEdBQUcsRUFBRTtnQkFDRCxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7YUFDaEM7U0FDSixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FBQztRQUNGLElBQUksY0FBYyxFQUFFLFNBQVMsQ0FBQztRQUU5QixNQUFNLFFBQVEsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBRW5DLElBQUksYUFBYSxDQUFDLGlCQUFpQixFQUFFO1lBQ2pDLGNBQWMsR0FB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