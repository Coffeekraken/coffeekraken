// @ts-nocheck
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
export default function (settings = {}) {
    settings = Object.assign({ scope: 'local' }, settings);
    if (settings.scope === 'local') {
        const rootDir = __sugarConfig('storage.rootDir');
        if (rootDir !== undefined) {
            __fs.ensureDirSync(rootDir);
            return rootDir;
        }
    }
    return '/';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdERpci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJvb3REaXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sSUFBSSxNQUFNLFVBQVUsQ0FBQztBQWtDNUIsTUFBTSxDQUFDLE9BQU8sV0FBVyxXQUE2QixFQUFFO0lBQ3RELFFBQVEsbUJBQ04sS0FBSyxFQUFFLE9BQU8sSUFDWCxRQUFRLENBQ1osQ0FBQztJQUNGLElBQUksUUFBUSxDQUFDLEtBQUssS0FBSyxPQUFPLEVBQUU7UUFDOUIsTUFBTSxPQUFPLEdBQUcsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDakQsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUIsT0FBTyxPQUFPLENBQUM7U0FDaEI7S0FDRjtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyJ9