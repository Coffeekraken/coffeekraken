// @ts-nocheck
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const srcDir = __sugarConfig('storage.srcDir');
    if (srcDir !== undefined) {
        __fs.ensureDirSync(srcDir);
        return srcDir;
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjRGlyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjRGlyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLElBQUksTUFBTSxVQUFVLENBQUM7QUE4QjVCLE1BQU0sQ0FBQyxPQUFPLFdBQVcsV0FBNEIsRUFBRTtJQUNyRCxRQUFRLHFCQUNILFFBQVEsQ0FDWixDQUFDO0lBQ0YsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDL0MsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1FBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0IsT0FBTyxNQUFNLENBQUM7S0FDZjtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMifQ==