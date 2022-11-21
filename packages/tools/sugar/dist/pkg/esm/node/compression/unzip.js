import __SDuration from '@coffeekraken/s-duration';
import { __fileName, __folderPath } from '@coffeekraken/sugar/fs';
import __fs from 'fs';
import __unzipper from 'unzipper';
export default function __unzip(zipFilePath, settings) {
    return new Promise((resolve, reject) => {
        settings = Object.assign({}, (settings !== null && settings !== void 0 ? settings : {}));
        if (!__fs.existsSync(zipFilePath)) {
            throw new Error(`The passed file "${zipFilePath}" does not exists...`);
        }
        const duration = new __SDuration();
        const folderName = __fileName(zipFilePath).replace(/\.g?zip$/, '');
        let dest = settings.dest
            ? `${settings.dest}/${folderName}`
            : `${__folderPath(zipFilePath)}/${folderName}`;
        __fs.createReadStream(zipFilePath)
            .pipe(__unzipper.Extract({ path: dest }))
            .on('close', () => {
            if (!__fs.existsSync(dest)) {
                throw new Error(`Something went wrong during the unzip process of the file "${zipFilePath}"...`);
            }
            resolve(Object.assign({ dest }, duration.end()));
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbEUsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sVUFBVSxNQUFNLFVBQVUsQ0FBQztBQW1DbEMsTUFBTSxDQUFDLE9BQU8sVUFBVSxPQUFPLENBQzNCLFdBQW1CLEVBQ25CLFFBQWtDO0lBRWxDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbkMsUUFBUSxxQkFDRCxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO1FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FDWCxvQkFBb0IsV0FBVyxzQkFBc0IsQ0FDeEQsQ0FBQztTQUNMO1FBRUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUVuQyxNQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNuRSxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSTtZQUNwQixDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsSUFBSSxJQUFJLFVBQVUsRUFBRTtZQUNsQyxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksVUFBVSxFQUFFLENBQUM7UUFFbkQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQzthQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQ3hDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQ1gsOERBQThELFdBQVcsTUFBTSxDQUNsRixDQUFDO2FBQ0w7WUFDRCxPQUFPLGlCQUNILElBQUksSUFDRCxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQ25CLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9