// @ts-nocheck
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const distViewsDir = __SSugarConfig.get('storage.dist.viewsDir');
    if (distViewsDir !== undefined) {
        __fs.ensureDirSync(distViewsDir);
        return distViewsDir;
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzdFZpZXdzRGlyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlzdFZpZXdzRGlyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLElBQUksTUFBTSxVQUFVLENBQUM7QUErQjVCLE1BQU0sQ0FBQyxPQUFPLFdBQVcsV0FBa0MsRUFBRTtJQUN6RCxRQUFRLHFCQUNELFFBQVEsQ0FDZCxDQUFDO0lBQ0YsTUFBTSxZQUFZLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ2pFLElBQUksWUFBWSxLQUFLLFNBQVMsRUFBRTtRQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sWUFBWSxDQUFDO0tBQ3ZCO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQyJ9