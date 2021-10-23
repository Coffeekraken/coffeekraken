// @ts-nocheck
import __require from '../esm/require';
// import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const __SSugarConfig = __require('@coffeekraken/s-sugar-config').default;
    const distCssDir = __SSugarConfig.get('storage.dist.cssDir');
    if (distCssDir !== undefined) {
        __fs.ensureDirSync(distCssDir);
        return distCssDir;
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzdENzc0Rpci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpc3RDc3NEaXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sU0FBUyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLDREQUE0RDtBQUM1RCxPQUFPLElBQUksTUFBTSxVQUFVLENBQUM7QUFnQzVCLE1BQU0sQ0FBQyxPQUFPLFdBQVcsV0FBZ0MsRUFBRTtJQUN2RCxRQUFRLHFCQUNELFFBQVEsQ0FDZCxDQUFDO0lBQ0YsTUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDLDhCQUE4QixDQUFDLENBQUM7SUFDakUsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQzdELElBQUksVUFBVSxLQUFLLFNBQVMsRUFBRTtRQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9CLE9BQU8sVUFBVSxDQUFDO0tBQ3JCO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQyJ9
