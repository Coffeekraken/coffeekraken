import __childProcess from 'child_process';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';
import { __packageTmpDir } from '@coffeekraken/sugar/path';
import { __writeJsonSync } from '@coffeekraken/sugar/fs';
export default function __execPhp(scriptPath, params, settings) {
    return new Promise((resolve, reject) => {
        settings = Object.assign({ paramsThroughFile: false }, (settings !== null && settings !== void 0 ? settings : {}));
        let paramsFilePath, paramsStr;
        if (settings.paramsThroughFile) {
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
        result = __childProcess.exec(`php ${scriptPath} "${paramsFilePath !== null && paramsFilePath !== void 0 ? paramsFilePath : paramsStr}"`, (error, stdout, stderr) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sY0FBYyxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLFFBQVEsTUFBTSwwQ0FBMEMsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZUFBZSxFQUFrQixNQUFNLDBCQUEwQixDQUFDO0FBQzNFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQXlCekQsTUFBTSxDQUFDLE9BQU8sVUFBVSxTQUFTLENBQzdCLFVBQWtCLEVBQ2xCLE1BQVcsRUFDWCxRQUFvQztJQUVwQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLFFBQVEsbUJBQ0osaUJBQWlCLEVBQUUsS0FBSyxJQUNyQixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO1FBQ0YsSUFBSSxjQUFjLEVBQUUsU0FBUyxDQUFDO1FBRTlCLElBQUksUUFBUSxDQUFDLGlCQUFpQixFQUFFO1lBQzVCLGNBQWMsR0FBRyxHQUFHLGVBQWUsRUFBRSxhQUFhLFFBQVEsRUFBRSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQ3RFLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxXQUFXLENBQzlCLE9BQU8sQ0FBQztZQUNULGVBQWUsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDM0M7YUFBTTtZQUNILFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25DLFNBQVMsR0FBRyxTQUFTO2lCQUNoQixPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztpQkFDdEIsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7aUJBQ3RCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2lCQUN0QixPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztpQkFDdEIsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7aUJBQ3RCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2lCQUN0QixPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztpQkFDdEIsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMvQjtRQUVELHVDQUF1QztRQUN2QyxJQUFJLE1BQU0sQ0FBQztRQUVYLE1BQU0sR0FBRyxjQUFjLENBQUMsSUFBSSxDQUN4QixPQUFPLFVBQVUsS0FBSyxjQUFjLGFBQWQsY0FBYyxjQUFkLGNBQWMsR0FBSSxTQUFTLEdBQUcsRUFDcEQsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3RCLHdCQUF3QjtZQUN4QixZQUFZO1lBQ1osOENBQThDO1lBQzlDLHFCQUFxQjtZQUNyQixJQUFJO1lBRUosSUFBSSxLQUFLLEVBQUU7Z0JBQ1AsT0FBTyxNQUFNLENBQ1Q7b0JBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUN4QyxLQUFLO29CQUNMLE1BQU07aUJBQ1QsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ2YsQ0FBQzthQUNMO1lBQ0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDIn0=