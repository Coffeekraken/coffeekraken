// @ts-nocheck
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const distRootDir = __SSugarConfig.get('storage.dist.rootDir');
    if (distRootDir !== undefined) {
        __fs.ensureDirSync(distRootDir);
        return distRootDir;
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzdFJvb3REaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaXN0Um9vdERpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxJQUFJLE1BQU0sVUFBVSxDQUFDO0FBK0I1QixNQUFNLENBQUMsT0FBTyxXQUFXLFdBQWlDLEVBQUU7SUFDeEQsUUFBUSxxQkFDRCxRQUFRLENBQ2QsQ0FBQztJQUNGLE1BQU0sV0FBVyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUMvRCxJQUFJLFdBQVcsS0FBSyxTQUFTLEVBQUU7UUFDM0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoQyxPQUFPLFdBQVcsQ0FBQztLQUN0QjtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ3JCLENBQUMifQ==