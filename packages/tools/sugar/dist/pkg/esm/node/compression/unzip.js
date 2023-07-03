import __SDuration from '@coffeekraken/s-duration';
import __fs from 'fs';
import __unzipper from 'unzipper';
import __fileName from '../fs/filename';
import __folderPath from '../fs/folderPath';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFDbEMsT0FBTyxVQUFVLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEMsT0FBTyxZQUFZLE1BQU0sa0JBQWtCLENBQUM7QUFxQzVDLE1BQU0sQ0FBQyxPQUFPLFVBQVUsT0FBTyxDQUMzQixXQUFtQixFQUNuQixRQUFrQztJQUVsQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLFFBQVEscUJBQ0QsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztRQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQy9CLE1BQU0sSUFBSSxLQUFLLENBQ1gsb0JBQW9CLFdBQVcsc0JBQXNCLENBQ3hELENBQUM7U0FDTDtRQUVELE1BQU0sUUFBUSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFFbkMsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbkUsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUk7WUFDcEIsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksSUFBSSxVQUFVLEVBQUU7WUFDbEMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBRW5ELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUM7YUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUN4QyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN4QixNQUFNLElBQUksS0FBSyxDQUNYLDhEQUE4RCxXQUFXLE1BQU0sQ0FDbEYsQ0FBQzthQUNMO1lBQ0QsT0FBTyxpQkFDSCxJQUFJLElBQ0QsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUNuQixDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMifQ==