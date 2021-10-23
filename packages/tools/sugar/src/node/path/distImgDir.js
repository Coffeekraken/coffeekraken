// @ts-nocheck
import __require from '../esm/require';
// import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const __SSugarConfig = __require('@coffeekraken/s-sugar-config').default;
    const distImgDir = __SSugarConfig.get('storage.dist.imgDir');
    if (distImgDir !== undefined) {
        __fs.ensureDirSync(distImgDir);
        return distImgDir;
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzdEltZ0Rpci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpc3RJbWdEaXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sU0FBUyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLDREQUE0RDtBQUM1RCxPQUFPLElBQUksTUFBTSxVQUFVLENBQUM7QUFnQzVCLE1BQU0sQ0FBQyxPQUFPLFdBQVcsV0FBZ0MsRUFBRTtJQUN2RCxRQUFRLHFCQUNELFFBQVEsQ0FDZCxDQUFDO0lBQ0YsTUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDLDhCQUE4QixDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ3pFLE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUM3RCxJQUFJLFVBQVUsS0FBSyxTQUFTLEVBQUU7UUFDMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQixPQUFPLFVBQVUsQ0FBQztLQUNyQjtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ3JCLENBQUMifQ==