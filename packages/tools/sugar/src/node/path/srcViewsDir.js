// @ts-nocheck
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const srcViewsDir = __SugarConfig.get('storage.src.viewsDir');
    if (srcViewsDir !== undefined) {
        __fs.ensureDirSync(srcViewsDir);
        return srcViewsDir;
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjVmlld3NEaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcmNWaWV3c0Rpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFDekQsT0FBTyxJQUFJLE1BQU0sVUFBVSxDQUFDO0FBOEI1QixNQUFNLENBQUMsT0FBTyxXQUFXLFdBQWlDLEVBQUU7SUFDMUQsUUFBUSxxQkFDSCxRQUFRLENBQ1osQ0FBQztJQUNGLE1BQU0sV0FBVyxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUM5RCxJQUFJLFdBQVcsS0FBSyxTQUFTLEVBQUU7UUFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoQyxPQUFPLFdBQVcsQ0FBQztLQUNwQjtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMifQ==