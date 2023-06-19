import __SDuration from '@coffeekraken/s-duration';
import __SEnv from '@coffeekraken/s-env';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __childProcess from 'child_process';
import __fs from 'fs';
import __uniqid from '../../node/string/uniqid';
import __deepMerge from '../../shared/object/deepMerge';
import __writeJsonSync from '../fs/writeJsonSync';
import __packageTmpDir from '../path/packageTmpDir';
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
            maxBuffer: 1024 * 1024 * 50,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxRQUFRLE1BQU0sMEJBQTBCLENBQUM7QUFDaEQsT0FBTyxXQUFXLE1BQU0sK0JBQStCLENBQUM7QUFDeEQsT0FBTyxlQUFlLE1BQU0scUJBQXFCLENBQUM7QUFDbEQsT0FBTyxlQUFlLE1BQU0sdUJBQXVCLENBQUM7QUFzQ3BELE1BQU0sQ0FBQyxPQUFPLFVBQVUsU0FBUyxDQUM3QixVQUFrQixFQUNsQixNQUFXLEVBQ1gsUUFBb0M7SUFFcEMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOztRQUNoRCxNQUFNLGFBQWEsR0FBcUIsV0FBVyxDQUMvQztZQUNJLGlCQUFpQixFQUFFLEtBQUs7WUFDeEIsR0FBRyxFQUFFO2dCQUNELE9BQU8sRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQzthQUNoQztTQUNKLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUFDO1FBQ0YsSUFBSSxjQUFjLEVBQUUsU0FBUyxDQUFDO1FBRTlCLE1BQU0sUUFBUSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFFbkMsSUFBSSxhQUFhLENBQUMsaUJBQWlCLEVBQUU7WUFDakMsY0FBYyxHQUFHLEdBQUcsZUFBZSxFQUFFLGFBQWEsUUFBUSxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FDdEUsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFdBQVcsQ0FDOUIsT0FBTyxDQUFDO1lBQ1QsZUFBZSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUMzQzthQUFNO1lBQ0gsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkMsU0FBUyxHQUFHLFNBQVM7aUJBQ2hCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2lCQUN0QixPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztpQkFDdEIsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7aUJBQ3RCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2lCQUN0QixPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztpQkFDdEIsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7aUJBQ3RCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2lCQUN0QixPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQy9CO1FBRUQsdUNBQXVDO1FBQ3ZDLElBQUksTUFBTSxDQUFDO1FBRVgsSUFBSSxNQUFBLGFBQWEsYUFBYixhQUFhLHVCQUFiLGFBQWEsQ0FBRSxHQUFHLDBDQUFFLE9BQU8sRUFBRTtZQUM3QixJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUztnQkFDdEIsS0FBSyxFQUFFLDhEQUE4RCxPQUFPLFVBQVUsS0FDbEYsY0FBYyxhQUFkLGNBQWMsY0FBZCxjQUFjLEdBQUksU0FDdEIsR0FBRyxhQUFhO2FBQ25CLENBQUMsQ0FBQztTQUNOO1FBRUQsTUFBTSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQ3hCLE9BQU8sVUFBVSxLQUFLLGNBQWMsYUFBZCxjQUFjLGNBQWQsY0FBYyxHQUFJLFNBQVMsR0FBRyxFQUNwRDtZQUNJLFNBQVMsRUFBRSxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUU7U0FDOUIsRUFDRCxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUU7O1lBQ3RCLElBQUksY0FBYyxFQUFFO2dCQUNoQixJQUFJO29CQUNBLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7aUJBQ25DO2dCQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7YUFDakI7WUFFRCxJQUFJLEtBQUssRUFBRTtnQkFDUCxPQUFPLE1BQU0sQ0FDVDtvQkFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQ3hDLEtBQUs7b0JBQ0wsTUFBTTtpQkFDVCxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDZixDQUFDO2FBQ0w7WUFFRCxJQUFJLE1BQUEsYUFBYSxhQUFiLGFBQWEsdUJBQWIsYUFBYSxDQUFFLEdBQUcsMENBQUUsT0FBTyxFQUFFO2dCQUM3QixJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUztvQkFDdEIsS0FBSyxFQUFFLG9GQUNILFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxnQkFDbkIsV0FBVztpQkFDZCxDQUFDLENBQUM7YUFDTjtZQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQ0osQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9