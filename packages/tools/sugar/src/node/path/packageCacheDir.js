// @ts-nocheck
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const packageCacheDir = __SugarConfig.get('storage.package.cacheDir');
    if (packageCacheDir !== undefined) {
        __fs.ensureDirSync(packageCacheDir);
        return packageCacheDir;
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZUNhY2hlRGlyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFja2FnZUNhY2hlRGlyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLElBQUksTUFBTSxVQUFVLENBQUM7QUE4QjVCLE1BQU0sQ0FBQyxPQUFPLFdBQVcsV0FBcUMsRUFBRTtJQUM5RCxRQUFRLHFCQUNILFFBQVEsQ0FDWixDQUFDO0lBQ0YsTUFBTSxlQUFlLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBQ3RFLElBQUksZUFBZSxLQUFLLFNBQVMsRUFBRTtRQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sZUFBZSxDQUFDO0tBQ3hCO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQyJ9