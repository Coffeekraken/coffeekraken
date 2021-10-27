var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __packageRoot from '../path/packageRoot';
import __path from 'path';
import __yaml from 'yaml';
import __fs from 'fs';
export default function loadConfigFile(filePath, settings) {
    return __awaiter(this, void 0, void 0, function* () {
        settings = Object.assign({ rootDir: __packageRoot(), throw: false }, (settings !== null && settings !== void 0 ? settings : {}));
        const filePathArray = Array.isArray(filePath) ? filePath : [filePath];
        let finalFilePath;
        for (let i = 0; i < filePathArray.length; i++) {
            if (__fs.existsSync(__path.resolve(settings.rootDir, filePathArray[i]))) {
                finalFilePath = filePathArray[i];
                break;
            }
        }
        if (settings.throw && !finalFilePath) {
            throw new Error(`Sorry but none of the passed config files "${filePathArray.join(',')}" does exists...`);
        }
        else if (!finalFilePath)
            return;
        const extension = finalFilePath.split('.').pop();
        switch (extension) {
            case 'js':
            case 'json':
                return (yield import(__path.resolve(settings.rootDir, finalFilePath))).default;
                break;
            case 'yml':
                const str = __fs
                    .readFileSync(__path.resolve(settings.rootDir, finalFilePath), 'utf8')
                    .toString();
                return __yaml.parse(str);
                break;
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZENvbmZpZ0ZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2FkQ29uZmlnRmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLGFBQWEsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQW9DdEIsTUFBTSxDQUFDLE9BQU8sVUFBZ0IsY0FBYyxDQUN4QyxRQUEyQixFQUMzQixRQUFrQzs7UUFFbEMsUUFBUSxtQkFDSixPQUFPLEVBQUUsYUFBYSxFQUFFLEVBQ3hCLEtBQUssRUFBRSxLQUFLLElBQ1QsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztRQUVGLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0RSxJQUFJLGFBQWEsQ0FBQztRQUVsQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMzQyxJQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ3JFO2dCQUNFLGFBQWEsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLE1BQU07YUFDVDtTQUNKO1FBRUQsSUFBSSxRQUFRLENBQUMsS0FBSyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQ1gsOENBQThDLGFBQWEsQ0FBQyxJQUFJLENBQzVELEdBQUcsQ0FDTixrQkFBa0IsQ0FDdEIsQ0FBQztTQUNMO2FBQU0sSUFBSSxDQUFDLGFBQWE7WUFBRSxPQUFPO1FBRWxDLE1BQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDakQsUUFBUSxTQUFTLEVBQUU7WUFDZixLQUFLLElBQUksQ0FBQztZQUNWLEtBQUssTUFBTTtnQkFDUCxPQUFPLENBQ0gsTUFBTSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQ2hFLENBQUMsT0FBTyxDQUFDO2dCQUNWLE1BQU07WUFDVixLQUFLLEtBQUs7Z0JBQ04sTUFBTSxHQUFHLEdBQUcsSUFBSTtxQkFDWCxZQUFZLENBQ1QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxFQUMvQyxNQUFNLENBQ1Q7cUJBQ0EsUUFBUSxFQUFFLENBQUM7Z0JBQ2hCLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDekIsTUFBTTtTQUNiO0lBQ0wsQ0FBQztDQUFBIn0=