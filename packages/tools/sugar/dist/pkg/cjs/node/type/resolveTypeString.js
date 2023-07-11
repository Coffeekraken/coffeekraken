"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const replaceTokens_js_1 = __importDefault(require("../../shared/token/replaceTokens.js"));
const packageRootDir_js_1 = __importDefault(require("../path/packageRootDir.js"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const parseTypeString_js_1 = __importDefault(require("../../shared/type/parseTypeString.js"));
function __resolveTypeString(typeString, settings = {}) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const finalSettings = Object.assign({ cwd: process.cwd() }, settings);
        let types, interf;
        if (typeString.match(/^(\.|\/)/)) {
            // resolve tokens
            const path = (0, replaceTokens_js_1.default)(typeString);
            let potentialTypeFilePath;
            if (typeString.match(/^(\.|\/)/)) {
                potentialTypeFilePath = path_1.default.resolve(finalSettings.cwd, path);
            }
            else {
                potentialTypeFilePath = path_1.default.resolve((0, packageRootDir_js_1.default)(finalSettings.cwd), path);
            }
            if (fs_1.default.existsSync(potentialTypeFilePath)) {
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
            types = (0, parseTypeString_js_1.default)(typeString);
        }
        return {
            types,
            interface: interf,
            raw: typeString.trim().replace(/^\{/, '').replace(/\}$/, ''),
        };
    });
}
exports.default = __resolveTypeString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBRUEsMkZBQWtFO0FBQ2xFLGtGQUF5RDtBQUV6RCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLDhGQUU4QztBQStDOUMsU0FBOEIsbUJBQW1CLENBQzdDLFVBQWtCLEVBQ2xCLFdBQWdELEVBQUU7OztRQUVsRCxNQUFNLGFBQWEsbUJBQ2YsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFDZixRQUFRLENBQ2QsQ0FBQztRQUVGLElBQUksS0FBSyxFQUFFLE1BQU0sQ0FBQztRQUVsQixJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDOUIsaUJBQWlCO1lBQ2pCLE1BQU0sSUFBSSxHQUFHLElBQUEsMEJBQWUsRUFBQyxVQUFVLENBQUMsQ0FBQztZQUV6QyxJQUFJLHFCQUFxQixDQUFDO1lBRTFCLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDOUIscUJBQXFCLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ25FO2lCQUFNO2dCQUNILHFCQUFxQixHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQ2xDLElBQUEsMkJBQWdCLEVBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUNuQyxJQUFJLENBQ1AsQ0FBQzthQUNMO1lBRUQsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxHQUFHLENBQUMsTUFBTSxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDL0QsS0FBSyxHQUFHO29CQUNKO3dCQUNJLElBQUksRUFBRSxNQUFBLFFBQVEsQ0FBQyxJQUFJLG1DQUFJLEtBQUs7d0JBQzVCLEVBQUUsRUFBRSxTQUFTO3dCQUNiLEtBQUssRUFBRSxTQUFTO3FCQUNuQjtpQkFDSixDQUFDO2dCQUNGLDZEQUE2RDtnQkFDN0QsTUFBTSxHQUFHLE1BQUEsTUFBQSxRQUFRLENBQUMsUUFBUSx3REFBSSxtQ0FBSSxRQUFRLENBQUM7YUFDOUM7WUFDRCxnQkFBZ0I7U0FDbkI7YUFBTTtZQUNILEtBQUssR0FBRyxJQUFBLDRCQUFpQixFQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3pDO1FBRUQsT0FBTztZQUNILEtBQUs7WUFDTCxTQUFTLEVBQUUsTUFBTTtZQUNqQixHQUFHLEVBQUUsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7U0FDL0QsQ0FBQzs7Q0FDTDtBQWhERCxzQ0FnREMifQ==