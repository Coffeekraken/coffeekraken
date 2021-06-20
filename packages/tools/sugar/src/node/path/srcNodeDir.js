// @ts-nocheck
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const srcNodeDir = __SugarConfig.get('storage.src.nodeDir');
    if (srcNodeDir !== undefined) {
        __fs.ensureDirSync(srcNodeDir);
        return srcNodeDir;
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjTm9kZURpci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNyY05vZGVEaXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sSUFBSSxNQUFNLFVBQVUsQ0FBQztBQThCNUIsTUFBTSxDQUFDLE9BQU8sV0FBVyxXQUFnQyxFQUFFO0lBQ3pELFFBQVEscUJBQ0gsUUFBUSxDQUNaLENBQUM7SUFDRixNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDNUQsSUFBSSxVQUFVLEtBQUssU0FBUyxFQUFFO1FBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0IsT0FBTyxVQUFVLENBQUM7S0FDbkI7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDIn0=