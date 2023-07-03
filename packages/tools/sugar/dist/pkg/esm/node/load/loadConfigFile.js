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
import __readJsonSync from '../fs/readJsonSync';
import __packageRootDir from '../path/packageRootDir';
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
            return {};
        const extension = finalFilePath.split('.').pop();
        let str;
        switch (extension) {
            case 'json':
                return __readJsonSync(__path.resolve(finalSettings.rootDir, finalFilePath));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sY0FBYyxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sZ0JBQWdCLE1BQU0sd0JBQXdCLENBQUM7QUF1Q3RELE1BQU0sQ0FBQyxPQUFPLFVBQWdCLGdCQUFnQixDQUMxQyxRQUEyQixFQUMzQixRQUEyQzs7UUFFM0MsTUFBTSxhQUFhLG1CQUNmLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxFQUMzQixLQUFLLEVBQUUsS0FBSyxJQUNULENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7UUFFRixxQ0FBcUM7UUFDckMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUU7WUFDeEIsT0FBTztTQUNWO1FBRUQsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RFLElBQUksYUFBYSxDQUFDO1FBRWxCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzNDLElBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FDWCxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQzFELEVBQ0g7Z0JBQ0UsYUFBYSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakMsTUFBTTthQUNUO1NBQ0o7UUFFRCxJQUFJLGFBQWEsQ0FBQyxLQUFLLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdkMsTUFBTSxJQUFJLEtBQUssQ0FDWCw4Q0FBOEMsYUFBYSxDQUFDLElBQUksQ0FDNUQsR0FBRyxDQUNOLGtCQUFrQixDQUN0QixDQUFDO1NBQ0w7YUFBTSxJQUFJLENBQUMsYUFBYTtZQUFFLE9BQU8sRUFBRSxDQUFDO1FBRXJDLE1BQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDakQsSUFBSSxHQUFHLENBQUM7UUFDUixRQUFRLFNBQVMsRUFBRTtZQUNmLEtBQUssTUFBTTtnQkFDUCxPQUFPLGNBQWMsQ0FDakIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUN2RCxDQUFDO2dCQUNGLE1BQU07WUFDVixLQUFLLElBQUk7Z0JBQ0wsT0FBTztnQkFDSCxhQUFhO2dCQUNiLENBQ0ksTUFBTSxNQUFNLENBQ1IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUN2RCxDQUNKLENBQUMsT0FBTyxDQUNaLENBQUM7Z0JBQ0YsTUFBTTtZQUNWLEtBQUssTUFBTSxDQUFDO1lBQ1osS0FBSyxLQUFLO2dCQUNOLEdBQUcsR0FBRyxJQUFJO3FCQUNMLFlBQVksQ0FDVCxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLEVBQ3BELE1BQU0sQ0FDVDtxQkFDQSxRQUFRLEVBQUUsQ0FBQztnQkFDaEIsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN6QixNQUFNO1lBQ1Y7Z0JBQ0ksR0FBRyxHQUFHLElBQUk7cUJBQ0wsWUFBWSxDQUNULE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsRUFDcEQsTUFBTSxDQUNUO3FCQUNBLFFBQVEsRUFBRSxDQUFDO2dCQUNoQixtQ0FBbUM7Z0JBQ25DLElBQUk7b0JBQ0EsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3pCO2dCQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7Z0JBQ2QsT0FBTyxHQUFHLENBQUM7Z0JBQ1gsTUFBTTtTQUNiO0lBQ0wsQ0FBQztDQUFBIn0=