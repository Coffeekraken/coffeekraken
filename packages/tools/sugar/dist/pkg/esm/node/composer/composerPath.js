import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';
export default function composerPath(name, settings) {
    const set = __deepMerge({
        cwd: process.cwd(),
        monorepo: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    let monoDir;
    monoDir = `${__packageRootDir(set.cwd, {
        highest: true,
    })}/vendor`;
    // if the package.json exists in rootDir node_modules folder
    if (__fs.existsSync(`${set.cwd}/vendor/${name}/composer.json`)) {
        return __fs.realpathSync(`${set.cwd}/vendor/${name}`);
    }
    if (set.monorepo &&
        monoDir !== (settings === null || settings === void 0 ? void 0 : settings.cwd) &&
        __fs.existsSync(`${monoDir}/${name}/composer.json`)) {
        return __fs.realpathSync(`${monoDir}/${name}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUE4QnRCLE1BQU0sQ0FBQyxPQUFPLFVBQVUsWUFBWSxDQUNoQyxJQUFZLEVBQ1osUUFBeUM7SUFFekMsTUFBTSxHQUFHLEdBQTBCLFdBQVcsQ0FDMUM7UUFDSSxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRTtRQUNsQixRQUFRLEVBQUUsSUFBSTtLQUNqQixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FBQztJQUVGLElBQUksT0FBTyxDQUFDO0lBRVosT0FBTyxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRTtRQUNuQyxPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDLFNBQVMsQ0FBQztJQUVaLDREQUE0RDtJQUM1RCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxXQUFXLElBQUksZ0JBQWdCLENBQUMsRUFBRTtRQUM1RCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxXQUFXLElBQUksRUFBRSxDQUFDLENBQUM7S0FDekQ7SUFFRCxJQUNJLEdBQUcsQ0FBQyxRQUFRO1FBQ1osT0FBTyxNQUFLLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxHQUFHLENBQUE7UUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sSUFBSSxJQUFJLGdCQUFnQixDQUFDLEVBQ3JEO1FBQ0UsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsT0FBTyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7S0FDbEQ7QUFDTCxDQUFDIn0=