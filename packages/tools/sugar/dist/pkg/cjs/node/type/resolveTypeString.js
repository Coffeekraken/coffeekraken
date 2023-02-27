"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const path_1 = require("@coffeekraken/sugar/path");
const token_1 = require("@coffeekraken/sugar/token");
const fs_1 = __importDefault(require("fs"));
const path_2 = __importDefault(require("path"));
const parseTypeString_1 = __importDefault(require("../../shared/type/parseTypeString"));
function __resolveTypeString(typeString, settings = {}) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        var _d;
        const finalSettings = Object.assign({ cwd: process.cwd() }, settings);
        let types, interf;
        if (typeString.match(/^(\.|\/)/)) {
            // resolve tokens
            const path = (0, token_1.__replaceTokens)(typeString);
            let potentialTypeFilePath;
            if (typeString.match(/^(\.|\/)/)) {
                potentialTypeFilePath = path_2.default.resolve(finalSettings.cwd, path);
            }
            else {
                potentialTypeFilePath = path_2.default.resolve((0, path_1.__packageRootDir)(finalSettings.cwd), path);
            }
            if (fs_1.default.existsSync(potentialTypeFilePath)) {
                const typeData = (yield (_d = potentialTypeFilePath, Promise.resolve().then(() => __importStar(require(_d))))).default;
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
            types = (0, parseTypeString_1.default)(typeString);
        }
        return {
            types,
            interface: interf,
            raw: typeString.trim().replace(/^\{/, '').replace(/\}$/, ''),
        };
    });
}
exports.default = __resolveTypeString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxtREFBNEQ7QUFDNUQscURBQTREO0FBQzVELDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsd0ZBRTJDO0FBK0MzQyxTQUE4QixtQkFBbUIsQ0FDN0MsVUFBa0IsRUFDbEIsV0FBZ0QsRUFBRTs7OztRQUVsRCxNQUFNLGFBQWEsbUJBQ2YsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFDZixRQUFRLENBQ2QsQ0FBQztRQUVGLElBQUksS0FBSyxFQUFFLE1BQU0sQ0FBQztRQUVsQixJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDOUIsaUJBQWlCO1lBQ2pCLE1BQU0sSUFBSSxHQUFHLElBQUEsdUJBQWUsRUFBQyxVQUFVLENBQUMsQ0FBQztZQUV6QyxJQUFJLHFCQUFxQixDQUFDO1lBRTFCLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDOUIscUJBQXFCLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ25FO2lCQUFNO2dCQUNILHFCQUFxQixHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQ2xDLElBQUEsdUJBQWdCLEVBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUNuQyxJQUFJLENBQ1AsQ0FBQzthQUNMO1lBRUQsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxHQUFHLENBQUMsWUFBYSxxQkFBcUIsMERBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDL0QsS0FBSyxHQUFHO29CQUNKO3dCQUNJLElBQUksRUFBRSxNQUFBLFFBQVEsQ0FBQyxJQUFJLG1DQUFJLEtBQUs7d0JBQzVCLEVBQUUsRUFBRSxTQUFTO3dCQUNiLEtBQUssRUFBRSxTQUFTO3FCQUNuQjtpQkFDSixDQUFDO2dCQUNGLDZEQUE2RDtnQkFDN0QsTUFBTSxHQUFHLE1BQUEsTUFBQSxRQUFRLENBQUMsUUFBUSx3REFBSSxtQ0FBSSxRQUFRLENBQUM7YUFDOUM7WUFDRCxnQkFBZ0I7U0FDbkI7YUFBTTtZQUNILEtBQUssR0FBRyxJQUFBLHlCQUFpQixFQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3pDO1FBRUQsT0FBTztZQUNILEtBQUs7WUFDTCxTQUFTLEVBQUUsTUFBTTtZQUNqQixHQUFHLEVBQUUsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7U0FDL0QsQ0FBQzs7Q0FDTDtBQWhERCxzQ0FnREMifQ==