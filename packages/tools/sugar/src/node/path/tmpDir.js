// @ts-nocheck
import __tmpDir from 'temp-dir';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
const fn = function (settings = {}) {
    settings = Object.assign({ scope: 'local' }, settings);
    if (settings.scope === 'local') {
        const tmpDir = __sugarConfig('storage.tmpDir');
        if (tmpDir !== undefined) {
            __fs.ensureDirSync(tmpDir);
            return tmpDir;
        }
    }
    __fs.ensureDirSync(__tmpDir);
    return __tmpDir;
};
export default fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG1wRGlyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidG1wRGlyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFDaEMsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFDekQsT0FBTyxJQUFJLE1BQU0sVUFBVSxDQUFDO0FBb0M1QixNQUFNLEVBQUUsR0FBWSxVQUFVLFdBQTRCLEVBQUU7SUFDMUQsUUFBUSxtQkFDTixLQUFLLEVBQUUsT0FBTyxJQUNYLFFBQVEsQ0FDWixDQUFDO0lBQ0YsSUFBSSxRQUFRLENBQUMsS0FBSyxLQUFLLE9BQU8sRUFBRTtRQUM5QixNQUFNLE1BQU0sR0FBRyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMvQyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQixPQUFPLE1BQU0sQ0FBQztTQUNmO0tBQ0Y7SUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdCLE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUMsQ0FBQztBQUNGLGVBQWUsRUFBRSxDQUFDIn0=