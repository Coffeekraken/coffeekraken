// @ts-nocheck
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const distViewsDir = __SugarConfig.get('storage.dist.viewsDir');
    if (distViewsDir !== undefined) {
        __fs.ensureDirSync(distViewsDir);
        return distViewsDir;
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzdFZpZXdzRGlyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlzdFZpZXdzRGlyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLElBQUksTUFBTSxVQUFVLENBQUM7QUE4QjVCLE1BQU0sQ0FBQyxPQUFPLFdBQVcsV0FBa0MsRUFBRTtJQUMzRCxRQUFRLHFCQUNILFFBQVEsQ0FDWixDQUFDO0lBQ0YsTUFBTSxZQUFZLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ2hFLElBQUksWUFBWSxLQUFLLFNBQVMsRUFBRTtRQUM5QixJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sWUFBWSxDQUFDO0tBQ3JCO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQyJ9