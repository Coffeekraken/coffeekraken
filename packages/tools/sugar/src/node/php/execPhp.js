import __childProcess from 'child_process';
import __base64 from '@coffeekraken/sugar/shared/crypt/base64';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';
import __packageTmpDir from '@coffeekraken/sugar/node/path/packageTmpDir';
import __writeJsonSync from '@coffeekraken/sugar/node/fs/writeJsonSync';
export default function execPhp(scriptPath, params, settings) {
    return new Promise((resolve, reject) => {
        settings = Object.assign({ encryptParams: false, paramsThroughFile: false }, (settings !== null && settings !== void 0 ? settings : {}));
        let paramsFilePath, paramsStr;
        if (settings.encryptParams) {
            paramsStr = __base64.encrypt(paramsStr);
        }
        else if (settings.paramsThroughFile) {
            paramsFilePath = `${__packageTmpDir()}/exec-php-${__uniqid()}.json`;
            __writeJsonSync(paramsFilePath, params);
        }
        const result = __childProcess.spawnSync(`php ${scriptPath} '${paramsFilePath !== null && paramsFilePath !== void 0 ? paramsFilePath : paramsStr}'`, [], {
            shell: true,
        });
        if (result.stderr.toString()) {
            return reject(result.stderr.toString());
        }
        resolve(result.stdout.toString());
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY1BocC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4ZWNQaHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxjQUFjLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sUUFBUSxNQUFNLHlDQUF5QyxDQUFDO0FBRy9ELE9BQU8sUUFBUSxNQUFNLDBDQUEwQyxDQUFDO0FBQ2hFLE9BQU8sZUFBZSxNQUFNLDZDQUE2QyxDQUFDO0FBQzFFLE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBd0J4RSxNQUFNLENBQUMsT0FBTyxVQUFVLE9BQU8sQ0FBQyxVQUFrQixFQUFFLE1BQVcsRUFBRSxRQUFvQztJQUNqRyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLFFBQVEsbUJBQ0osYUFBYSxFQUFFLEtBQUssRUFDcEIsaUJBQWlCLEVBQUUsS0FBSyxJQUNyQixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO1FBQ0YsSUFBSSxjQUFjLEVBQUUsU0FBUyxDQUFDO1FBRTlCLElBQUksUUFBUSxDQUFDLGFBQWEsRUFBRTtZQUN4QixTQUFTLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUMzQzthQUFNLElBQUksUUFBUSxDQUFDLGlCQUFpQixFQUFFO1lBQ25DLGNBQWMsR0FBRyxHQUFHLGVBQWUsRUFBRSxhQUFhLFFBQVEsRUFBRSxPQUFPLENBQUM7WUFDcEUsZUFBZSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUMzQztRQUVELE1BQU0sTUFBTSxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUMsT0FBTyxVQUFVLEtBQUssY0FBYyxhQUFkLGNBQWMsY0FBZCxjQUFjLEdBQUksU0FBUyxHQUFHLEVBQUUsRUFBRSxFQUFFO1lBQzlGLEtBQUssRUFBRSxJQUFJO1NBQ2QsQ0FBQyxDQUFDO1FBRUgsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQzFCLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUMzQztRQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDIn0=