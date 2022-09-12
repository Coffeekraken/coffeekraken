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
import __replaceTokens from '../../shared/token/replaceTokens';
import __parseTypeString from '../../shared/type/parseTypeString';
import { __packageRootDir } from '@coffeekraken/sugar/path';
export default function resolveTypeString(typeString, settings = {}) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxlQUFlLE1BQU0sa0NBQWtDLENBQUM7QUFDL0QsT0FBTyxpQkFFTixNQUFNLG1DQUFtQyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBNkM1RCxNQUFNLENBQUMsT0FBTyxVQUFnQixpQkFBaUIsQ0FDM0MsVUFBa0IsRUFDbEIsV0FBZ0QsRUFBRTs7O1FBRWxELE1BQU0sYUFBYSxtQkFDZixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUNmLFFBQVEsQ0FDZCxDQUFDO1FBRUYsSUFBSSxLQUFLLEVBQUUsTUFBTSxDQUFDO1FBRWxCLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUM5QixpQkFBaUI7WUFDakIsTUFBTSxJQUFJLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXpDLElBQUkscUJBQXFCLENBQUM7WUFFMUIsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUM5QixxQkFBcUIsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDbkU7aUJBQU07Z0JBQ0gscUJBQXFCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FDbEMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUNuQyxJQUFJLENBQ1AsQ0FBQzthQUNMO1lBRUQsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxHQUFHLENBQUMsTUFBTSxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDL0QsS0FBSyxHQUFHO29CQUNKO3dCQUNJLElBQUksRUFBRSxNQUFBLFFBQVEsQ0FBQyxJQUFJLG1DQUFJLEtBQUs7d0JBQzVCLEVBQUUsRUFBRSxTQUFTO3dCQUNiLEtBQUssRUFBRSxTQUFTO3FCQUNuQjtpQkFDSixDQUFDO2dCQUNGLDZEQUE2RDtnQkFDN0QsTUFBTSxHQUFHLE1BQUEsTUFBQSxRQUFRLENBQUMsUUFBUSx3REFBSSxtQ0FBSSxRQUFRLENBQUM7YUFDOUM7WUFDRCxnQkFBZ0I7U0FDbkI7YUFBTTtZQUNILEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN6QztRQUVELE9BQU87WUFDSCxLQUFLO1lBQ0wsU0FBUyxFQUFFLE1BQU07WUFDakIsR0FBRyxFQUFFLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO1NBQy9ELENBQUM7O0NBQ0wifQ==