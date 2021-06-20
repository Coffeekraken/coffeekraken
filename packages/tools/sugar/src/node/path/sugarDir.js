// @ts-nocheck
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const sugarRootDir = __SugarConfig.get('storage.sugar.rootDir');
    if (sugarRootDir !== undefined) {
        __fs.ensureDirSync(sugarRootDir);
        return sugarRootDir;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXJEaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWdhckRpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFDekQsT0FBTyxJQUFJLE1BQU0sVUFBVSxDQUFDO0FBK0I1QixNQUFNLENBQUMsT0FBTyxXQUFXLFdBQWtDLEVBQUU7SUFDM0QsUUFBUSxxQkFDSCxRQUFRLENBQ1osQ0FBQztJQUNGLE1BQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUNoRSxJQUFJLFlBQVksS0FBSyxTQUFTLEVBQUU7UUFDOUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNqQyxPQUFPLFlBQVksQ0FBQztLQUNyQjtBQUNILENBQUMifQ==