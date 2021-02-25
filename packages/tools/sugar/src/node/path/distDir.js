// @ts-nocheck
import __sugarConfig from '../config/sugar';
import __fs from 'fs-extra';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const distDir = __sugarConfig('storage.distDir');
    if (distDir !== undefined) {
        __fs.ensureDirSync(distDir);
        return distDir;
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzdERpci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpc3REaXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sYUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sSUFBSSxNQUFNLFVBQVUsQ0FBQztBQThCNUIsTUFBTSxDQUFDLE9BQU8sV0FBVyxXQUE2QixFQUFFO0lBQ3RELFFBQVEscUJBQ0gsUUFBUSxDQUNaLENBQUM7SUFDRixNQUFNLE9BQU8sR0FBRyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNqRCxJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7UUFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QixPQUFPLE9BQU8sQ0FBQztLQUNoQjtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMifQ==