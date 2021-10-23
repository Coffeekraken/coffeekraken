// @ts-nocheck
import __require from '../esm/require';
// import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const __SSugarConfig = __require('@coffeekraken/s-sugar-config').default;
    const sugarRootDir = __SSugarConfig.get('storage.sugar.rootDir');
    if (sugarRootDir !== undefined) {
        __fs.ensureDirSync(sugarRootDir);
        return sugarRootDir;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXJEaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWdhckRpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxTQUFTLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsNkRBQTZEO0FBQzdELE9BQU8sSUFBSSxNQUFNLFVBQVUsQ0FBQztBQWlDNUIsTUFBTSxDQUFDLE9BQU8sV0FBVyxXQUFrQyxFQUFFO0lBQ3pELFFBQVEscUJBQ0QsUUFBUSxDQUNkLENBQUM7SUFDRixNQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsOEJBQThCLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDekUsTUFBTSxZQUFZLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ2pFLElBQUksWUFBWSxLQUFLLFNBQVMsRUFBRTtRQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sWUFBWSxDQUFDO0tBQ3ZCO0FBQ0wsQ0FBQyJ9