var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __replaceTokens from '../../shared/token/replaceTokens';
import __packageRootDir from '../path/packageRootDir';
import __fs from 'fs';
import __path from 'path';
import __parseTypeString from '../../shared/type/parseTypeString';
export default function __resolveTypeString(typeString, settings = {}) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const finalSettings = Object.assign({ cwd: process.cwd() }, settings);
        let types, interf;
        if (typeString.match(/^(\.|\/)/)) {
            // resolve tokens
            const path = __replaceTokens(typeString);
            let potentialTypeFilePath;
            if (typeString.match(/^(\.|\/)/)) {
                potentialTypeFilePath = __path.resolve(finalSettings.cwd, path);
            }
            else {
                potentialTypeFilePath = __path.resolve(__packageRootDir(finalSettings.cwd), path);
            }
            if (__fs.existsSync(potentialTypeFilePath)) {
                const typeData = (yield import(potentialTypeFilePath)).default;
                types = [
                    {
                        type: (_a = typeData.name) !== null && _a !== void 0 ? _a : types,
                        of: undefined,
                        value: undefined,
                    },
                ];
                // save data into the "metas" property on the string directly
                interf = (_c = (_b = typeData.toObject) === null || _b === void 0 ? void 0 : _b.call(typeData)) !== null && _c !== void 0 ? _c : typeData;
            }
            // regular types
        }
        else {
            types = __parseTypeString(typeString);
        }
        return {
            types,
            interface: interf,
            raw: typeString.trim().replace(/^\{/, '').replace(/\}$/, ''),
        };
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBLE9BQU8sZUFBZSxNQUFNLGtDQUFrQyxDQUFDO0FBQy9ELE9BQU8sZ0JBQWdCLE1BQU0sd0JBQXdCLENBQUM7QUFFdEQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLGlCQUVOLE1BQU0sbUNBQW1DLENBQUM7QUErQzNDLE1BQU0sQ0FBQyxPQUFPLFVBQWdCLG1CQUFtQixDQUM3QyxVQUFrQixFQUNsQixXQUFnRCxFQUFFOzs7UUFFbEQsTUFBTSxhQUFhLG1CQUNmLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQ2YsUUFBUSxDQUNkLENBQUM7UUFFRixJQUFJLEtBQUssRUFBRSxNQUFNLENBQUM7UUFFbEIsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzlCLGlCQUFpQjtZQUNqQixNQUFNLElBQUksR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFekMsSUFBSSxxQkFBcUIsQ0FBQztZQUUxQixJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQzlCLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNuRTtpQkFBTTtnQkFDSCxxQkFBcUIsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUNsQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQ25DLElBQUksQ0FDUCxDQUFDO2FBQ0w7WUFFRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLEdBQUcsQ0FBQyxNQUFNLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUMvRCxLQUFLLEdBQUc7b0JBQ0o7d0JBQ0ksSUFBSSxFQUFFLE1BQUEsUUFBUSxDQUFDLElBQUksbUNBQUksS0FBSzt3QkFDNUIsRUFBRSxFQUFFLFNBQVM7d0JBQ2IsS0FBSyxFQUFFLFNBQVM7cUJBQ25CO2lCQUNKLENBQUM7Z0JBQ0YsNkRBQTZEO2dCQUM3RCxNQUFNLEdBQUcsTUFBQSxNQUFBLFFBQVEsQ0FBQyxRQUFRLHdEQUFJLG1DQUFJLFFBQVEsQ0FBQzthQUM5QztZQUNELGdCQUFnQjtTQUNuQjthQUFNO1lBQ0gsS0FBSyxHQUFHLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3pDO1FBRUQsT0FBTztZQUNILEtBQUs7WUFDTCxTQUFTLEVBQUUsTUFBTTtZQUNqQixHQUFHLEVBQUUsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7U0FDL0QsQ0FBQzs7Q0FDTCJ9