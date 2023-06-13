var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __readJsonSync } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';
import __path from 'path';
import __yaml from 'yaml';
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
                catch (e) {
                }
                return str;
                break;
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQXVDMUIsTUFBTSxDQUFDLE9BQU8sVUFBZ0IsZ0JBQWdCLENBQzFDLFFBQTJCLEVBQzNCLFFBQTJDOztRQUUzQyxNQUFNLGFBQWEsbUJBQ2YsT0FBTyxFQUFFLGdCQUFnQixFQUFFLEVBQzNCLEtBQUssRUFBRSxLQUFLLElBQ1QsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztRQUVGLHFDQUFxQztRQUNyQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRTtZQUN4QixPQUFPO1NBQ1Y7UUFFRCxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEUsSUFBSSxhQUFhLENBQUM7UUFFbEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDM0MsSUFDSSxJQUFJLENBQUMsVUFBVSxDQUNYLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDMUQsRUFDSDtnQkFDRSxhQUFhLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxNQUFNO2FBQ1Q7U0FDSjtRQUVELElBQUksYUFBYSxDQUFDLEtBQUssSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN2QyxNQUFNLElBQUksS0FBSyxDQUNYLDhDQUE4QyxhQUFhLENBQUMsSUFBSSxDQUM1RCxHQUFHLENBQ04sa0JBQWtCLENBQ3RCLENBQUM7U0FDTDthQUFNLElBQUksQ0FBQyxhQUFhO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFFckMsTUFBTSxTQUFTLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNqRCxJQUFJLEdBQUcsQ0FBQztRQUNSLFFBQVEsU0FBUyxFQUFFO1lBQ2YsS0FBSyxNQUFNO2dCQUNQLE9BQU8sY0FBYyxDQUNqQixNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQ3ZELENBQUM7Z0JBQ0YsTUFBTTtZQUNWLEtBQUssSUFBSTtnQkFDTCxPQUFPO2dCQUNILGFBQWE7Z0JBQ2IsQ0FDSSxNQUFNLE1BQU0sQ0FDUixNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQ3ZELENBQ0osQ0FBQyxPQUFPLENBQ1osQ0FBQztnQkFDRixNQUFNO1lBQ1YsS0FBSyxNQUFNLENBQUM7WUFDWixLQUFLLEtBQUs7Z0JBQ04sR0FBRyxHQUFHLElBQUk7cUJBQ0wsWUFBWSxDQUNULE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsRUFDcEQsTUFBTSxDQUNUO3FCQUNBLFFBQVEsRUFBRSxDQUFDO2dCQUNoQixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3pCLE1BQU07WUFDVjtnQkFDSSxHQUFHLEdBQUcsSUFBSTtxQkFDTCxZQUFZLENBQ1QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxFQUNwRCxNQUFNLENBQ1Q7cUJBQ0EsUUFBUSxFQUFFLENBQUM7Z0JBQ2hCLG1DQUFtQztnQkFDbkMsSUFBSTtvQkFDQSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDekI7Z0JBQUMsT0FBTyxDQUFDLEVBQUU7aUJBQ1g7Z0JBQ0QsT0FBTyxHQUFHLENBQUM7Z0JBQ1gsTUFBTTtTQUNiO0lBQ0wsQ0FBQztDQUFBIn0=