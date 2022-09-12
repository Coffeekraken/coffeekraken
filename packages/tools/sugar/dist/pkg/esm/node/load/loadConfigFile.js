var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __fs from 'fs';
import __path from 'path';
import __yaml from 'yaml';
import { __packageRootDir } from '@coffeekraken/sugar/path';
export default function __loadConfigFile(filePath, settings) {
    return __awaiter(this, void 0, void 0, function* () {
        const finalSettings = Object.assign({ rootDir: __packageRootDir(), throw: false }, (settings !== null && settings !== void 0 ? settings : {}));
        // protect if we are not in a package
        if (!finalSettings.rootDir) {
            return;
        }
        const filePathArray = Array.isArray(filePath) ? filePath : [filePath];
        let finalFilePath;
        for (let i = 0; i < filePathArray.length; i++) {
            if (__fs.existsSync(__path.resolve(finalSettings.rootDir, filePathArray[i]))) {
                finalFilePath = filePathArray[i];
                break;
            }
        }
        if (finalSettings.throw && !finalFilePath) {
            throw new Error(`Sorry but none of the passed config files "${filePathArray.join(',')}" does exists...`);
        }
        else if (!finalFilePath)
            return;
        const extension = finalFilePath.split('.').pop();
        let str;
        switch (extension) {
            case 'json':
                return (
                // @ts-ignore
                (yield import(__path.resolve(finalSettings.rootDir, finalFilePath), { assert: { type: 'json' } })).default);
                break;
            case 'js':
                return (
                // @ts-ignore
                (yield import(__path.resolve(finalSettings.rootDir, finalFilePath))).default);
                break;
            case 'yaml':
            case 'yml':
                str = __fs
                    .readFileSync(__path.resolve(finalSettings.rootDir, finalFilePath), 'utf8')
                    .toString();
                return __yaml.parse(str);
                break;
            default:
                str = __fs
                    .readFileSync(__path.resolve(finalSettings.rootDir, finalFilePath), 'utf8')
                    .toString();
                // try to pass result in JSON.parse
                try {
                    str = JSON.parse(str);
                }
                catch (e) { }
                return str;
                break;
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBb0M1RCxNQUFNLENBQUMsT0FBTyxVQUFnQixnQkFBZ0IsQ0FDMUMsUUFBMkIsRUFDM0IsUUFBMkM7O1FBRTNDLE1BQU0sYUFBYSxtQkFDZixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsRUFDM0IsS0FBSyxFQUFFLEtBQUssSUFDVCxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO1FBRUYscUNBQXFDO1FBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFO1lBQ3hCLE9BQU87U0FDVjtRQUVELE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0RSxJQUFJLGFBQWEsQ0FBQztRQUVsQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMzQyxJQUNJLElBQUksQ0FBQyxVQUFVLENBQ1gsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUMxRCxFQUNIO2dCQUNFLGFBQWEsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLE1BQU07YUFDVDtTQUNKO1FBRUQsSUFBSSxhQUFhLENBQUMsS0FBSyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3ZDLE1BQU0sSUFBSSxLQUFLLENBQ1gsOENBQThDLGFBQWEsQ0FBQyxJQUFJLENBQzVELEdBQUcsQ0FDTixrQkFBa0IsQ0FDdEIsQ0FBQztTQUNMO2FBQU0sSUFBSSxDQUFDLGFBQWE7WUFBRSxPQUFPO1FBRWxDLE1BQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDakQsSUFBSSxHQUFHLENBQUM7UUFDUixRQUFRLFNBQVMsRUFBRTtZQUNmLEtBQUssTUFBTTtnQkFDUCxPQUFPO2dCQUNILGFBQWE7Z0JBQ2IsQ0FDSSxNQUFNLE1BQU0sQ0FDUixNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLEVBQ3BELEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQy9CLENBQ0osQ0FBQyxPQUFPLENBQ1osQ0FBQztnQkFDRixNQUFNO1lBQ1YsS0FBSyxJQUFJO2dCQUNMLE9BQU87Z0JBQ0gsYUFBYTtnQkFDYixDQUNJLE1BQU0sTUFBTSxDQUNSLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FDdkQsQ0FDSixDQUFDLE9BQU8sQ0FDWixDQUFDO2dCQUNGLE1BQU07WUFDVixLQUFLLE1BQU0sQ0FBQztZQUNaLEtBQUssS0FBSztnQkFDTixHQUFHLEdBQUcsSUFBSTtxQkFDTCxZQUFZLENBQ1QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxFQUNwRCxNQUFNLENBQ1Q7cUJBQ0EsUUFBUSxFQUFFLENBQUM7Z0JBQ2hCLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDekIsTUFBTTtZQUNWO2dCQUNJLEdBQUcsR0FBRyxJQUFJO3FCQUNMLFlBQVksQ0FDVCxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLEVBQ3BELE1BQU0sQ0FDVDtxQkFDQSxRQUFRLEVBQUUsQ0FBQztnQkFDaEIsbUNBQW1DO2dCQUNuQyxJQUFJO29CQUNBLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUN6QjtnQkFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO2dCQUNkLE9BQU8sR0FBRyxDQUFDO2dCQUNYLE1BQU07U0FDYjtJQUNMLENBQUM7Q0FBQSJ9