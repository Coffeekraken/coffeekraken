// @ts-nocheck
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const distNodeDir = __SugarConfig.get('storage.dist.nodeDir');
    if (distNodeDir !== undefined) {
        __fs.ensureDirSync(distNodeDir);
        return distNodeDir;
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzdE5vZGVEaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaXN0Tm9kZURpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFDekQsT0FBTyxJQUFJLE1BQU0sVUFBVSxDQUFDO0FBOEI1QixNQUFNLENBQUMsT0FBTyxXQUFXLFdBQWlDLEVBQUU7SUFDMUQsUUFBUSxxQkFDSCxRQUFRLENBQ1osQ0FBQztJQUNGLE1BQU0sV0FBVyxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUM5RCxJQUFJLFdBQVcsS0FBSyxTQUFTLEVBQUU7UUFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoQyxPQUFPLFdBQVcsQ0FBQztLQUNwQjtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMifQ==