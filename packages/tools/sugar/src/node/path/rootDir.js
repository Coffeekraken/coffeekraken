// @ts-nocheck
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
export default function (settings = {}) {
    settings = Object.assign({ scope: 'local' }, settings);
    if (settings.scope === 'local') {
        const rootDir = __SugarConfig.get('storage.rootDir');
        if (rootDir !== undefined) {
            __fs.ensureDirSync(rootDir);
            return rootDir;
        }
    }
    return '/';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdERpci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJvb3REaXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sSUFBSSxNQUFNLFVBQVUsQ0FBQztBQWtDNUIsTUFBTSxDQUFDLE9BQU8sV0FBVyxXQUE2QixFQUFFO0lBQ3RELFFBQVEsbUJBQ04sS0FBSyxFQUFFLE9BQU8sSUFDWCxRQUFRLENBQ1osQ0FBQztJQUNGLElBQUksUUFBUSxDQUFDLEtBQUssS0FBSyxPQUFPLEVBQUU7UUFDOUIsTUFBTSxPQUFPLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3JELElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtZQUN6QixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLE9BQU8sT0FBTyxDQUFDO1NBQ2hCO0tBQ0Y7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUMifQ==