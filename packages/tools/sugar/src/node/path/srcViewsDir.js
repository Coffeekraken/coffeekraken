// @ts-nocheck
import __require from '../esm/require';
// import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const __SSugarConfig = __require('@coffeekraken/s-sugar-config').default;
    const srcViewsDir = __SSugarConfig.get('storage.src.viewsDir');
    if (srcViewsDir !== undefined) {
        __fs.ensureDirSync(srcViewsDir);
        return srcViewsDir;
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjVmlld3NEaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcmNWaWV3c0Rpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxTQUFTLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsNkRBQTZEO0FBQzdELE9BQU8sSUFBSSxNQUFNLFVBQVUsQ0FBQztBQWdDNUIsTUFBTSxDQUFDLE9BQU8sV0FBVyxXQUFpQyxFQUFFO0lBQ3hELFFBQVEscUJBQ0QsUUFBUSxDQUNkLENBQUM7SUFDRixNQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsOEJBQThCLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDekUsTUFBTSxXQUFXLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQy9ELElBQUksV0FBVyxLQUFLLFNBQVMsRUFBRTtRQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sV0FBVyxDQUFDO0tBQ3RCO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQyJ9