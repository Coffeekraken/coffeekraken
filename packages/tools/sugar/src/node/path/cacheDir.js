// @ts-nocheck
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const cacheDir = __SugarConfig.get('storage.cacheDir');
    if (cacheDir !== undefined) {
        __fs.ensureDirSync(cacheDir);
        return cacheDir;
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGVEaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYWNoZURpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFDekQsT0FBTyxJQUFJLE1BQU0sVUFBVSxDQUFDO0FBOEI1QixNQUFNLENBQUMsT0FBTyxXQUFXLFdBQThCLEVBQUU7SUFDdkQsUUFBUSxxQkFDSCxRQUFRLENBQ1osQ0FBQztJQUNGLE1BQU0sUUFBUSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUN2RCxJQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7UUFDMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QixPQUFPLFFBQVEsQ0FBQztLQUNqQjtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMifQ==