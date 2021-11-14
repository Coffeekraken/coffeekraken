// @ts-nocheck
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const sugarRootDir = __SSugarConfig.get('storage.sugar.rootDir');
    if (sugarRootDir !== undefined) {
        __fs.ensureDirSync(sugarRootDir);
        return sugarRootDir;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXJEaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWdhckRpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxJQUFJLE1BQU0sVUFBVSxDQUFDO0FBZ0M1QixNQUFNLENBQUMsT0FBTyxXQUFXLFdBQWtDLEVBQUU7SUFDekQsUUFBUSxxQkFDRCxRQUFRLENBQ2QsQ0FBQztJQUNGLE1BQU0sWUFBWSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUNqRSxJQUFJLFlBQVksS0FBSyxTQUFTLEVBQUU7UUFDNUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNqQyxPQUFPLFlBQVksQ0FBQztLQUN2QjtBQUNMLENBQUMifQ==