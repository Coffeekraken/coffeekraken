// @ts-nocheck
import __fs from 'fs';
import __readJsonSync from '../fs/readJsonSync.js';
import __packageRootDir from '../path/packageRootDir.js';
export default function __isInPackage(name, settings) {
    const finalSettings = Object.assign({ cwd: process.cwd(), highest: false }, (settings !== null && settings !== void 0 ? settings : {}));
    const packageRootDir = __packageRootDir(finalSettings.cwd);
    if (!packageRootDir)
        return false;
    if (!__fs.existsSync(`${packageRootDir}/package.json`))
        return false;
    const pkg = __readJsonSync(`${packageRootDir}/package.json`);
    let names = name;
    if (typeof names === 'string')
        names = names.split(',').map((f) => f.trim());
    for (let i = 0; i < names.length; i++) {
        if (names[i] === pkg.name) {
            return true;
        }
    }
    const newPath = packageRootDir
        .split('/')
        .slice(0, -1)
        // .filter((i) => i !== '')
        .join('/');
    // no package found... check if we need to check higher
    if (finalSettings.highest) {
        return __isInPackage(name, {
            cwd: newPath,
            highest: true,
        });
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxjQUFjLE1BQU0sdUJBQXVCLENBQUM7QUFDbkQsT0FBTyxnQkFBZ0IsTUFBTSwyQkFBMkIsQ0FBQztBQWtDekQsTUFBTSxDQUFDLE9BQU8sVUFBVSxhQUFhLENBQ2pDLElBQUksRUFDSixRQUF3QztJQUV4QyxNQUFNLGFBQWEsbUJBQ2YsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFDbEIsT0FBTyxFQUFFLEtBQUssSUFDWCxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBRUYsTUFBTSxjQUFjLEdBQUcsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNELElBQUksQ0FBQyxjQUFjO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxjQUFjLGVBQWUsQ0FBQztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQ3JFLE1BQU0sR0FBRyxHQUFHLGNBQWMsQ0FBQyxHQUFHLGNBQWMsZUFBZSxDQUFDLENBQUM7SUFFN0QsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ2pCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtRQUN6QixLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ25DLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLEVBQUU7WUFDdkIsT0FBTyxJQUFJLENBQUM7U0FDZjtLQUNKO0lBRUQsTUFBTSxPQUFPLEdBQUcsY0FBYztTQUN6QixLQUFLLENBQUMsR0FBRyxDQUFDO1NBQ1YsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNiLDJCQUEyQjtTQUMxQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZix1REFBdUQ7SUFDdkQsSUFBSSxhQUFhLENBQUMsT0FBTyxFQUFFO1FBQ3ZCLE9BQU8sYUFBYSxDQUFDLElBQUksRUFBRTtZQUN2QixHQUFHLEVBQUUsT0FBTztZQUNaLE9BQU8sRUFBRSxJQUFJO1NBQ2hCLENBQUMsQ0FBQztLQUNOO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQyJ9