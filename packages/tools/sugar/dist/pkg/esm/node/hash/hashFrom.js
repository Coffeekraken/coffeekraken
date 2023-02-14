import { __fileHash, __folderHash } from '@coffeekraken/sugar/fs';
import { __isDirectory, __isGlob } from '@coffeekraken/sugar/is';
import { __packagePath } from '@coffeekraken/sugar/npm';
import { __objectHash } from '@coffeekraken/sugar/object';
import __crypto from 'crypto';
import __fs from 'fs';
import __glob from 'glob';
export default function __hashFrom(sources, settings) {
    const hashes = [];
    const finalSettings = Object.assign({ algo: 'sha256', digest: 'base64' }, (settings !== null && settings !== void 0 ? settings : {}));
    for (let source of sources) {
        // plain object
        if (typeof source !== 'string') {
            hashes.push(__objectHash(source));
            continue;
        }
        // package
        if (typeof source === 'string' && !source.startsWith('/')) {
            const path = __packagePath(source);
            if (path) {
                hashes.push(__folderHash(path));
                continue;
            }
        }
        // directory
        if (typeof source === 'string' && __isDirectory(source)) {
            hashes.push(__folderHash(source));
            continue;
        }
        // absolute file
        if (typeof source === 'string' && __fs.existsSync(source)) {
            hashes.push(__fileHash(source));
            continue;
        }
        // glob
        if (typeof source === 'string' && __isGlob(source)) {
            const files = __glob.sync(source);
            for (let filePath of files) {
                if (__isDirectory(filePath)) {
                    // console.log('Directory', filePath);
                    hashes.push(__folderHash(filePath));
                }
                else {
                    hashes.push(__fileHash(filePath));
                }
            }
            continue;
        }
        // otherwise it's an unsupported source
        console.error(source);
        throw new Error(`<red>[__hashFrom]</red> The logged source above is not a supported one...`);
    }
    // create the final hash
    const hash = __crypto
        .createHash(finalSettings.algo)
        .update(hashes.join('-'))
        .digest(finalSettings.digest);
    // return the hash
    return hash;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sUUFBa0MsTUFBTSxRQUFRLENBQUM7QUFDeEQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQTBDMUIsTUFBTSxDQUFDLE9BQU8sVUFBVSxVQUFVLENBQzlCLE9BQXlCLEVBQ3pCLFFBQXFDO0lBRXJDLE1BQU0sTUFBTSxHQUFhLEVBQUUsQ0FBQztJQUU1QixNQUFNLGFBQWEsbUJBQ2YsSUFBSSxFQUFFLFFBQVEsRUFDZCxNQUFNLEVBQUUsUUFBUSxJQUNiLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRixLQUFLLElBQUksTUFBTSxJQUFJLE9BQU8sRUFBRTtRQUN4QixlQUFlO1FBQ2YsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNsQyxTQUFTO1NBQ1o7UUFFRCxVQUFVO1FBQ1YsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZELE1BQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuQyxJQUFJLElBQUksRUFBRTtnQkFDTixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxTQUFTO2FBQ1o7U0FDSjtRQUVELFlBQVk7UUFDWixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDckQsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNsQyxTQUFTO1NBQ1o7UUFFRCxnQkFBZ0I7UUFDaEIsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN2RCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLFNBQVM7U0FDWjtRQUVELE9BQU87UUFDUCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDaEQsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsQyxLQUFLLElBQUksUUFBUSxJQUFJLEtBQUssRUFBRTtnQkFDeEIsSUFBSSxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQ3pCLHNDQUFzQztvQkFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztpQkFDdkM7cUJBQU07b0JBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztpQkFDckM7YUFDSjtZQUNELFNBQVM7U0FDWjtRQUVELHVDQUF1QztRQUN2QyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUMsMkVBQTJFLENBQUMsQ0FBQztLQUNoRztJQUVELHdCQUF3QjtJQUN4QixNQUFNLElBQUksR0FBRyxRQUFRO1NBQ2hCLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1NBQzlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3hCLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFbEMsa0JBQWtCO0lBQ2xCLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==