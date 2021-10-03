import __fs from 'fs';
import __unzipper from 'unzipper';
import __folderPath from '../fs/folderPath';
import __fileName from '../fs/filename';
import __SDuration from '@coffeekraken/s-duration';
export default function unzip(zipFilePath, settings) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW56aXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1bnppcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sWUFBWSxNQUFNLGtCQUFrQixDQUFDO0FBQzVDLE9BQU8sVUFBVSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hDLE9BQU8sV0FBaUMsTUFBTSwwQkFBMEIsQ0FBQztBQW1DekUsTUFBTSxDQUFDLE9BQU8sVUFBVSxLQUFLLENBQ3pCLFdBQW1CLEVBQ25CLFFBQWtDO0lBRWxDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbkMsUUFBUSxxQkFDRCxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO1FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FDWCxvQkFBb0IsV0FBVyxzQkFBc0IsQ0FDeEQsQ0FBQztTQUNMO1FBRUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUVuQyxNQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNuRSxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSTtZQUNwQixDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsSUFBSSxJQUFJLFVBQVUsRUFBRTtZQUNsQyxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksVUFBVSxFQUFFLENBQUM7UUFFbkQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQzthQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQ3hDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQ1gsOERBQThELFdBQVcsTUFBTSxDQUNsRixDQUFDO2FBQ0w7WUFDRCxPQUFPLGlCQUNILElBQUksSUFDRCxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQ25CLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9