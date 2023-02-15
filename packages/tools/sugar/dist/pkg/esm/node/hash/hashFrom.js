import { __fileHash, __folderHash } from '@coffeekraken/sugar/fs';
import { __isDirectory, __isGlob } from '@coffeekraken/sugar/is';
import { __packagePath } from '@coffeekraken/sugar/npm';
import { __objectHash } from '@coffeekraken/sugar/object';
import __crypto from 'crypto';
import __fs from 'fs';
export default function __hashFrom(sources, settings) {
    const hashes = [];
    const finalSettings = Object.assign({ algo: 'sha256', digest: 'base64' }, (settings !== null && settings !== void 0 ? settings : {}));
    let hash;
    for (let source of sources) {
        // plain object
        if (typeof source !== 'string') {
            hashes.push(__objectHash(source));
            continue;
        }
        // package
        if (!source.startsWith('/') && source.match(/^[a-zA-Z-_\/\@]+$/)) {
            const path = __packagePath(source);
            if (path) {
                hashes.push(__folderHash(path));
                continue;
            }
        }
        // directory
        if (__isDirectory(source)) {
            hashes.push(__folderHash(source));
            continue;
        }
        // absolute file
        if (__fs.existsSync(source)) {
            hashes.push(__fileHash(source));
            continue;
        }
        // glob
        if (__isGlob(source)) {
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
        // simple string
        hashes.push(source);
    }
    // create the final hash
    if (hashes.length) {
        hash = __crypto
            .createHash(finalSettings.algo)
            .update(hashes.join('-'))
            .digest(finalSettings.digest);
    }
    // return the hash
    return hash;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sUUFBa0MsTUFBTSxRQUFRLENBQUM7QUFDeEQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBMEN0QixNQUFNLENBQUMsT0FBTyxVQUFVLFVBQVUsQ0FDOUIsT0FBeUIsRUFDekIsUUFBcUM7SUFFckMsTUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFDO0lBRTVCLE1BQU0sYUFBYSxtQkFDZixJQUFJLEVBQUUsUUFBUSxFQUNkLE1BQU0sRUFBRSxRQUFRLElBQ2IsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLElBQUksSUFBSSxDQUFDO0lBRVQsS0FBSyxJQUFJLE1BQU0sSUFBSSxPQUFPLEVBQUU7UUFDeEIsZUFBZTtRQUNmLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbEMsU0FBUztTQUNaO1FBRUQsVUFBVTtRQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsRUFBRTtZQUM5RCxNQUFNLElBQUksR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkMsSUFBSSxJQUFJLEVBQUU7Z0JBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDaEMsU0FBUzthQUNaO1NBQ0o7UUFFRCxZQUFZO1FBQ1osSUFBSSxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNsQyxTQUFTO1NBQ1o7UUFFRCxnQkFBZ0I7UUFDaEIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEMsU0FBUztTQUNaO1FBRUQsT0FBTztRQUNQLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2xCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEMsS0FBSyxJQUFJLFFBQVEsSUFBSSxLQUFLLEVBQUU7Z0JBQ3hCLElBQUksYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUN6QixzQ0FBc0M7b0JBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7aUJBQ3ZDO3FCQUFNO29CQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7aUJBQ3JDO2FBQ0o7WUFDRCxTQUFTO1NBQ1o7UUFFRCxnQkFBZ0I7UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN2QjtJQUVELHdCQUF3QjtJQUN4QixJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7UUFDZixJQUFJLEdBQUcsUUFBUTthQUNWLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO2FBQzlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3hCLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDckM7SUFFRCxrQkFBa0I7SUFDbEIsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9