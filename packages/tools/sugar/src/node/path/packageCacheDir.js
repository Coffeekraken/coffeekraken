// @ts-nocheck
import __require from '../esm/require';
// import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const __SSugarConfig = __require('@coffeekraken/s-sugar-config').default;
    const packageCacheDir = __SSugarConfig.get('storage.package.cacheDir');
    if (packageCacheDir !== undefined) {
        __fs.ensureDirSync(packageCacheDir);
        return packageCacheDir;
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZUNhY2hlRGlyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFja2FnZUNhY2hlRGlyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFNBQVMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2Qyw0REFBNEQ7QUFDNUQsT0FBTyxJQUFJLE1BQU0sVUFBVSxDQUFDO0FBZ0M1QixNQUFNLENBQUMsT0FBTyxXQUFXLFdBQXFDLEVBQUU7SUFDNUQsUUFBUSxxQkFDRCxRQUFRLENBQ2QsQ0FBQztJQUNGLE1BQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUN6RSxNQUFNLGVBQWUsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFDdkUsSUFBSSxlQUFlLEtBQUssU0FBUyxFQUFFO1FBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDcEMsT0FBTyxlQUFlLENBQUM7S0FDMUI7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDIn0=