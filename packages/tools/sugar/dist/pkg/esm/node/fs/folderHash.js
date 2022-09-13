import { __fileHash } from '@coffeekraken/sugar/fs';
import { __isDirectory } from '@coffeekraken/sugar/is';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __sha256 from '../../shared/crypto/sha256';
export default function __folderHash(folderPath, settings = {}) {
    settings = __deepMerge({
        recursive: true,
        algo: 'sha256',
        digest: 'base64',
        include: {
            ctime: false,
        },
    }, settings !== null && settings !== void 0 ? settings : {});
    const paths = [];
    function readDir(dir) {
        const files = __fs.readdirSync(dir);
        files.forEach((filePath) => {
            if (settings.recursive && __isDirectory(`${dir}/${filePath}`)) {
                return readDir(`${dir}/${filePath}`);
            }
            paths.push(`${dir}/${filePath}`);
        });
    }
    readDir(folderPath);
    const filesHashes = [];
    paths.forEach((path) => {
        if (__isDirectory(path))
            return;
        filesHashes.push(__fileHash(path, settings));
    });
    return __sha256.encrypt(filesHashes.join('-'));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFFdEUsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sUUFBUSxNQUFNLDRCQUE0QixDQUFDO0FBeUNsRCxNQUFNLENBQUMsT0FBTyxVQUFVLFlBQVksQ0FDaEMsVUFBa0IsRUFDbEIsV0FBeUMsRUFBRTtJQUUzQyxRQUFRLEdBQUcsV0FBVyxDQUNsQjtRQUNJLFNBQVMsRUFBRSxJQUFJO1FBQ2YsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsUUFBUTtRQUNoQixPQUFPLEVBQUU7WUFDTCxLQUFLLEVBQUUsS0FBSztTQUNmO0tBQ0osRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7SUFDRixNQUFNLEtBQUssR0FBYSxFQUFFLENBQUM7SUFFM0IsU0FBUyxPQUFPLENBQUMsR0FBRztRQUNoQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUN2QixJQUFJLFFBQVEsQ0FBQyxTQUFTLElBQUksYUFBYSxDQUFDLEdBQUcsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDLEVBQUU7Z0JBQzNELE9BQU8sT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDLENBQUM7YUFDeEM7WUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXBCLE1BQU0sV0FBVyxHQUFhLEVBQUUsQ0FBQztJQUVqQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDbkIsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQUUsT0FBTztRQUNoQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDbkQsQ0FBQyJ9