// @ts-nocheck
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const sugarDir = __sugarConfig('storage.sugarDir');
    if (sugarDir !== undefined) {
        __fs.ensureDirSync(sugarDir);
        return sugarDir;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXJEaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWdhckRpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFDekQsT0FBTyxJQUFJLE1BQU0sVUFBVSxDQUFDO0FBK0I1QixNQUFNLENBQUMsT0FBTyxXQUFXLFdBQThCLEVBQUU7SUFDdkQsUUFBUSxxQkFDSCxRQUFRLENBQ1osQ0FBQztJQUNGLE1BQU0sUUFBUSxHQUFHLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ25ELElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtRQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdCLE9BQU8sUUFBUSxDQUFDO0tBQ2pCO0FBQ0gsQ0FBQyJ9