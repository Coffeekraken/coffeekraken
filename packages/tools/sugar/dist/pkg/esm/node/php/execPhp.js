import __childProcess from 'child_process';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';
import __packageTmpDir from '@coffeekraken/sugar/node/path/packageTmpDir';
import { __writeJsonSync } from '@coffeekraken/sugar/fs';
export default function execPhp(scriptPath, params, settings) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sY0FBYyxNQUFNLGVBQWUsQ0FBQztBQUkzQyxPQUFPLFFBQVEsTUFBTSwwQ0FBMEMsQ0FBQztBQUNoRSxPQUFPLGVBQWUsTUFBTSw2Q0FBNkMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUF5QnpELE1BQU0sQ0FBQyxPQUFPLFVBQVUsT0FBTyxDQUMzQixVQUFrQixFQUNsQixNQUFXLEVBQ1gsUUFBb0M7SUFFcEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNuQyxRQUFRLG1CQUNKLGlCQUFpQixFQUFFLEtBQUssSUFDckIsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztRQUNGLElBQUksY0FBYyxFQUFFLFNBQVMsQ0FBQztRQUU5QixJQUFJLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtZQUM1QixjQUFjLEdBQUcsR0FBRyxlQUFlLEVBQUUsYUFBYSxRQUFRLEVBQUUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUN0RSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsV0FBVyxDQUM5QixPQUFPLENBQUM7WUFDVCxlQUFlLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQzNDO2FBQU07WUFDSCxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuQyxTQUFTLEdBQUcsU0FBUztpQkFDaEIsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7aUJBQ3RCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2lCQUN0QixPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztpQkFDdEIsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7aUJBQ3RCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2lCQUN0QixPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztpQkFDdEIsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7aUJBQ3RCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDL0I7UUFFRCx1Q0FBdUM7UUFDdkMsSUFBSSxNQUFNLENBQUM7UUFFWCxNQUFNLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FDeEIsT0FBTyxVQUFVLEtBQUssY0FBYyxhQUFkLGNBQWMsY0FBZCxjQUFjLEdBQUksU0FBUyxHQUFHLEVBQ3BELENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN0Qix3QkFBd0I7WUFDeEIsWUFBWTtZQUNaLDhDQUE4QztZQUM5QyxxQkFBcUI7WUFDckIsSUFBSTtZQUVKLElBQUksS0FBSyxFQUFFO2dCQUNQLE9BQU8sTUFBTSxDQUNUO29CQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDeEMsS0FBSztvQkFDTCxNQUFNO2lCQUNULENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNmLENBQUM7YUFDTDtZQUNELE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQ0osQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9