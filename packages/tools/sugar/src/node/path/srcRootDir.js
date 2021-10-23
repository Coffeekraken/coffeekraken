// @ts-nocheck
import __require from '../esm/require';
// import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const __SSugarConfig = __require('@coffeekraken/s-sugar-config').default;
    const srcRootDir = __SSugarConfig.get('storage.src.rootDir');
    if (srcRootDir !== undefined) {
        __fs.ensureDirSync(srcRootDir);
        return srcRootDir;
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjUm9vdERpci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNyY1Jvb3REaXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sU0FBUyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLDZEQUE2RDtBQUM3RCxPQUFPLElBQUksTUFBTSxVQUFVLENBQUM7QUFnQzVCLE1BQU0sQ0FBQyxPQUFPLFdBQVcsV0FBZ0MsRUFBRTtJQUN2RCxRQUFRLHFCQUNELFFBQVEsQ0FDZCxDQUFDO0lBQ0YsTUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDLDhCQUE4QixDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ3pFLE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUM3RCxJQUFJLFVBQVUsS0FBSyxTQUFTLEVBQUU7UUFDMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQixPQUFPLFVBQVUsQ0FBQztLQUNyQjtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ3JCLENBQUMifQ==