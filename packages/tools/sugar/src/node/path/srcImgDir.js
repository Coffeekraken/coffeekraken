// @ts-nocheck
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const srcImgDir = __SSugarConfig.get('storage.src.imgDir');
    if (srcImgDir !== undefined) {
        __fs.ensureDirSync(srcImgDir);
        return srcImgDir;
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjSW1nRGlyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjSW1nRGlyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLElBQUksTUFBTSxVQUFVLENBQUM7QUFnQzVCLE1BQU0sQ0FBQyxPQUFPLFdBQVcsV0FBK0IsRUFBRTtJQUN0RCxRQUFRLHFCQUNELFFBQVEsQ0FDZCxDQUFDO0lBQ0YsTUFBTSxTQUFTLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQzNELElBQUksU0FBUyxLQUFLLFNBQVMsRUFBRTtRQUN6QixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlCLE9BQU8sU0FBUyxDQUFDO0tBQ3BCO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQyJ9