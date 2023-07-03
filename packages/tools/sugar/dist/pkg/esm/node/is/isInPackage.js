// @ts-nocheck
import __fs from 'fs';
import __readJsonSync from '../fs/readJsonSync';
import __packageRootDir from '../path/packageRootDir';
export default function __isInPackage(name, settings) {
    const finalSettings = Object.assign({ cwd: process.cwd(), highest: false }, settings !== null && settings !== void 0 ? settings : {});
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
            highest: true
        });
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxjQUFjLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxnQkFBZ0IsTUFBTSx3QkFBd0IsQ0FBQztBQWtDdEQsTUFBTSxDQUFDLE9BQU8sVUFBVSxhQUFhLENBQ2pDLElBQUksRUFDSixRQUF3QztJQUd4QyxNQUFNLGFBQWEsbUJBQ2YsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFDbEIsT0FBTyxFQUFFLEtBQUssSUFDWCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ3BCLENBQUE7SUFFRCxNQUFNLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0QsSUFBSSxDQUFDLGNBQWM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUVsQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLGNBQWMsZUFBZSxDQUFDO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDckUsTUFBTSxHQUFHLEdBQUcsY0FBYyxDQUFDLEdBQUcsY0FBYyxlQUFlLENBQUMsQ0FBQztJQUU3RCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDakIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQ3pCLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDbEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbkMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksRUFBRTtZQUN2QixPQUFPLElBQUksQ0FBQztTQUNmO0tBQ0o7SUFFRCxNQUFNLE9BQU8sR0FBRyxjQUFjO1NBQ3pCLEtBQUssQ0FBQyxHQUFHLENBQUM7U0FDVixLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2IsMkJBQTJCO1NBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLHVEQUF1RDtJQUN2RCxJQUFJLGFBQWEsQ0FBQyxPQUFPLEVBQUU7UUFDdkIsT0FBTyxhQUFhLENBQUMsSUFBSSxFQUFFO1lBQ3ZCLEdBQUcsRUFBRSxPQUFPO1lBQ1osT0FBTyxFQUFFLElBQUk7U0FDaEIsQ0FBQyxDQUFDO0tBQ047SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDIn0=