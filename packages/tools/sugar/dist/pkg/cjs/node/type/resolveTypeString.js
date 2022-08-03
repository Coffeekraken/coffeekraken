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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const replaceTokens_1 = __importDefault(require("../../shared/token/replaceTokens"));
const parseTypeString_1 = __importDefault(require("../../shared/type/parseTypeString"));
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
function resolveTypeString(typeString, settings = {}) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const finalSettings = Object.assign({ cwd: process.cwd() }, settings);
        let types, interf;
        if (typeString.match(/^(\.|\/)/)) {
            // resolve tokens
            const path = (0, replaceTokens_1.default)(typeString);
            let potentialTypeFilePath;
            if (typeString.match(/^(\.|\/)/)) {
                potentialTypeFilePath = path_1.default.resolve(finalSettings.cwd, path);
            }
            else {
                potentialTypeFilePath = path_1.default.resolve((0, packageRoot_1.default)(finalSettings.cwd), path);
            }
            if (fs_1.default.existsSync(potentialTypeFilePath)) {
                const typeData = (yield Promise.resolve().then(() => __importStar(require(potentialTypeFilePath)))).default;
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
exports.default = resolveTypeString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLHFGQUErRDtBQUMvRCx3RkFFMkM7QUFDM0Msc0VBQWdEO0FBNkNoRCxTQUE4QixpQkFBaUIsQ0FDM0MsVUFBa0IsRUFDbEIsV0FBZ0QsRUFBRTs7O1FBRWxELE1BQU0sYUFBYSxtQkFDZixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUNmLFFBQVEsQ0FDZCxDQUFDO1FBRUYsSUFBSSxLQUFLLEVBQUUsTUFBTSxDQUFDO1FBRWxCLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUM5QixpQkFBaUI7WUFDakIsTUFBTSxJQUFJLEdBQUcsSUFBQSx1QkFBZSxFQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXpDLElBQUkscUJBQXFCLENBQUM7WUFFMUIsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUM5QixxQkFBcUIsR0FBRyxjQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDbkU7aUJBQU07Z0JBQ0gscUJBQXFCLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FDbEMsSUFBQSxxQkFBYSxFQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFDaEMsSUFBSSxDQUNQLENBQUM7YUFDTDtZQUVELElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsR0FBRyxDQUFDLHdEQUFhLHFCQUFxQixHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQy9ELEtBQUssR0FBRztvQkFDSjt3QkFDSSxJQUFJLEVBQUUsTUFBQSxRQUFRLENBQUMsSUFBSSxtQ0FBSSxLQUFLO3dCQUM1QixFQUFFLEVBQUUsU0FBUzt3QkFDYixLQUFLLEVBQUUsU0FBUztxQkFDbkI7aUJBQ0osQ0FBQztnQkFDRiw2REFBNkQ7Z0JBQzdELE1BQU0sR0FBRyxNQUFBLE1BQUEsUUFBUSxDQUFDLFFBQVEsd0RBQUksbUNBQUksUUFBUSxDQUFDO2FBQzlDO1lBQ0QsZ0JBQWdCO1NBQ25CO2FBQU07WUFDSCxLQUFLLEdBQUcsSUFBQSx5QkFBaUIsRUFBQyxVQUFVLENBQUMsQ0FBQztTQUN6QztRQUVELE9BQU87WUFDSCxLQUFLO1lBQ0wsU0FBUyxFQUFFLE1BQU07WUFDakIsR0FBRyxFQUFFLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO1NBQy9ELENBQUM7O0NBQ0w7QUFoREQsb0NBZ0RDIn0=