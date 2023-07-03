import __isGlob from '../../shared/is/isGlob';
import __objectHash from '../../shared/object/objectHash';
import __fileHashSync from '../fs/fileHashSync';
import __folderHashSync from '../fs/folderHashSync';
import __isDirectory from '../is/isDirectory';
import __packagePathSync from '../npm/packagePathSync';
import __crypto from 'crypto';
import __fs from 'fs';
export default function __hashFromSync(sources, settings) {
    const hashes = [];
    if (!Array.isArray(sources)) {
        sources = [sources];
    }
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
            const path = __packagePathSync(source);
            if (path) {
                hashes.push(__folderHashSync(path));
                continue;
            }
        }
        // directory
        if (__isDirectory(source)) {
            hashes.push(__folderHashSync(source));
            continue;
        }
        // absolute file
        if (__fs.existsSync(source)) {
            hashes.push(__fileHashSync(source));
            continue;
        }
        // glob
        if (__isGlob(source)) {
            const files = __glob.sync(source);
            for (let filePath of files) {
                if (__isDirectory(filePath)) {
                    // console.log('Directory', filePath);
                    hashes.push(__folderHashSync(filePath));
                }
                else {
                    hashes.push(__fileHashSync(filePath));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHdCQUF3QixDQUFDO0FBQzlDLE9BQU8sWUFBWSxNQUFNLGdDQUFnQyxDQUFDO0FBQzFELE9BQU8sY0FBYyxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sZ0JBQWdCLE1BQU0sc0JBQXNCLENBQUM7QUFDcEQsT0FBTyxhQUFhLE1BQU0sbUJBQW1CLENBQUM7QUFDOUMsT0FBTyxpQkFBaUIsTUFBTSx3QkFBd0IsQ0FBQztBQUV2RCxPQUFPLFFBQWtDLE1BQU0sUUFBUSxDQUFDO0FBQ3hELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQTRDdEIsTUFBTSxDQUFDLE9BQU8sVUFBVSxjQUFjLENBQ2xDLE9BQXlCLEVBQ3pCLFFBQXFDO0lBRXJDLE1BQU0sTUFBTSxHQUFhLEVBQUUsQ0FBQztJQUU1QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUN6QixPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN2QjtJQUVELE1BQU0sYUFBYSxtQkFDZixJQUFJLEVBQUUsUUFBUSxFQUNkLE1BQU0sRUFBRSxRQUFRLElBQ2IsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLElBQUksSUFBSSxDQUFDO0lBRVQsS0FBSyxJQUFJLE1BQU0sSUFBSSxPQUFPLEVBQUU7UUFDeEIsZUFBZTtRQUNmLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbEMsU0FBUztTQUNaO1FBRUQsVUFBVTtRQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsRUFBRTtZQUM5RCxNQUFNLElBQUksR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN2QyxJQUFJLElBQUksRUFBRTtnQkFDTixNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLFNBQVM7YUFDWjtTQUNKO1FBRUQsWUFBWTtRQUNaLElBQUksYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN0QyxTQUFTO1NBQ1o7UUFFRCxnQkFBZ0I7UUFDaEIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDcEMsU0FBUztTQUNaO1FBRUQsT0FBTztRQUNQLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2xCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEMsS0FBSyxJQUFJLFFBQVEsSUFBSSxLQUFLLEVBQUU7Z0JBQ3hCLElBQUksYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUN6QixzQ0FBc0M7b0JBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztpQkFDM0M7cUJBQU07b0JBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztpQkFDekM7YUFDSjtZQUNELFNBQVM7U0FDWjtRQUVELGdCQUFnQjtRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3ZCO0lBRUQsd0JBQXdCO0lBQ3hCLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtRQUNmLElBQUksR0FBRyxRQUFRO2FBQ1YsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7YUFDOUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDeEIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNyQztJQUVELGtCQUFrQjtJQUNsQixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=