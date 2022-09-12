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
import { __replaceTokens } from '@coffeekraken/sugar/string';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8saUJBRU4sTUFBTSxtQ0FBbUMsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQTZDNUQsTUFBTSxDQUFDLE9BQU8sVUFBZ0IsaUJBQWlCLENBQzNDLFVBQWtCLEVBQ2xCLFdBQWdELEVBQUU7OztRQUVsRCxNQUFNLGFBQWEsbUJBQ2YsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFDZixRQUFRLENBQ2QsQ0FBQztRQUVGLElBQUksS0FBSyxFQUFFLE1BQU0sQ0FBQztRQUVsQixJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDOUIsaUJBQWlCO1lBQ2pCLE1BQU0sSUFBSSxHQUFHLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUV6QyxJQUFJLHFCQUFxQixDQUFDO1lBRTFCLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDOUIscUJBQXFCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ25FO2lCQUFNO2dCQUNILHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQ2xDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFDbkMsSUFBSSxDQUNQLENBQUM7YUFDTDtZQUVELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsR0FBRyxDQUFDLE1BQU0sTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQy9ELEtBQUssR0FBRztvQkFDSjt3QkFDSSxJQUFJLEVBQUUsTUFBQSxRQUFRLENBQUMsSUFBSSxtQ0FBSSxLQUFLO3dCQUM1QixFQUFFLEVBQUUsU0FBUzt3QkFDYixLQUFLLEVBQUUsU0FBUztxQkFDbkI7aUJBQ0osQ0FBQztnQkFDRiw2REFBNkQ7Z0JBQzdELE1BQU0sR0FBRyxNQUFBLE1BQUEsUUFBUSxDQUFDLFFBQVEsd0RBQUksbUNBQUksUUFBUSxDQUFDO2FBQzlDO1lBQ0QsZ0JBQWdCO1NBQ25CO2FBQU07WUFDSCxLQUFLLEdBQUcsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDekM7UUFFRCxPQUFPO1lBQ0gsS0FBSztZQUNMLFNBQVMsRUFBRSxNQUFNO1lBQ2pCLEdBQUcsRUFBRSxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztTQUMvRCxDQUFDOztDQUNMIn0=