// @ts-nocheck
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const srcCssDir = __SugarConfig.get('storage.src.cssDir');
    if (srcCssDir !== undefined) {
        __fs.ensureDirSync(srcCssDir);
        return srcCssDir;
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjQ3NzRGlyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjQ3NzRGlyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLElBQUksTUFBTSxVQUFVLENBQUM7QUE4QjVCLE1BQU0sQ0FBQyxPQUFPLFdBQVcsV0FBK0IsRUFBRTtJQUN4RCxRQUFRLHFCQUNILFFBQVEsQ0FDWixDQUFDO0lBQ0YsTUFBTSxTQUFTLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQzFELElBQUksU0FBUyxLQUFLLFNBQVMsRUFBRTtRQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlCLE9BQU8sU0FBUyxDQUFDO0tBQ2xCO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQyJ9