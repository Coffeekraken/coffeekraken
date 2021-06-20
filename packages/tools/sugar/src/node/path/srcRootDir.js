// @ts-nocheck
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const srcRootDir = __SugarConfig.get('storage.src.rootDir');
    if (srcRootDir !== undefined) {
        __fs.ensureDirSync(srcRootDir);
        return srcRootDir;
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjUm9vdERpci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNyY1Jvb3REaXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sSUFBSSxNQUFNLFVBQVUsQ0FBQztBQThCNUIsTUFBTSxDQUFDLE9BQU8sV0FBVyxXQUFnQyxFQUFFO0lBQ3pELFFBQVEscUJBQ0gsUUFBUSxDQUNaLENBQUM7SUFDRixNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDNUQsSUFBSSxVQUFVLEtBQUssU0FBUyxFQUFFO1FBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0IsT0FBTyxVQUFVLENBQUM7S0FDbkI7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDIn0=