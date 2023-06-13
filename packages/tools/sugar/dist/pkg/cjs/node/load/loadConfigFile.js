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
const fs_1 = require("@coffeekraken/sugar/fs");
const path_1 = require("@coffeekraken/sugar/path");
const fs_2 = __importDefault(require("fs"));
const path_2 = __importDefault(require("path"));
const yaml_1 = __importDefault(require("yaml"));
function __loadConfigFile(filePath, settings) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const finalSettings = Object.assign({ rootDir: (0, path_1.__packageRootDir)(), throw: false }, (settings !== null && settings !== void 0 ? settings : {}));
        // protect if we are not in a package
        if (!finalSettings.rootDir) {
            return;
        }
        const filePathArray = Array.isArray(filePath) ? filePath : [filePath];
        let finalFilePath;
        for (let i = 0; i < filePathArray.length; i++) {
            if (fs_2.default.existsSync(path_2.default.resolve(finalSettings.rootDir, filePathArray[i]))) {
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
                return (0, fs_1.__readJsonSync)(path_2.default.resolve(finalSettings.rootDir, finalFilePath));
                break;
            case 'js':
                return (
                // @ts-ignore
                (yield (_a = path_2.default.resolve(finalSettings.rootDir, finalFilePath), Promise.resolve().then(() => __importStar(require(_a))))).default);
                break;
            case 'yaml':
            case 'yml':
                str = fs_2.default
                    .readFileSync(path_2.default.resolve(finalSettings.rootDir, finalFilePath), 'utf8')
                    .toString();
                return yaml_1.default.parse(str);
                break;
            default:
                str = fs_2.default
                    .readFileSync(path_2.default.resolve(finalSettings.rootDir, finalFilePath), 'utf8')
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
exports.default = __loadConfigFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBd0Q7QUFDeEQsbURBQTREO0FBQzVELDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsZ0RBQTBCO0FBdUMxQixTQUE4QixnQkFBZ0IsQ0FDMUMsUUFBMkIsRUFDM0IsUUFBMkM7OztRQUUzQyxNQUFNLGFBQWEsbUJBQ2YsT0FBTyxFQUFFLElBQUEsdUJBQWdCLEdBQUUsRUFDM0IsS0FBSyxFQUFFLEtBQUssSUFDVCxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO1FBRUYscUNBQXFDO1FBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFO1lBQ3hCLE9BQU87U0FDVjtRQUVELE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0RSxJQUFJLGFBQWEsQ0FBQztRQUVsQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMzQyxJQUNJLFlBQUksQ0FBQyxVQUFVLENBQ1gsY0FBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUMxRCxFQUNIO2dCQUNFLGFBQWEsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLE1BQU07YUFDVDtTQUNKO1FBRUQsSUFBSSxhQUFhLENBQUMsS0FBSyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3ZDLE1BQU0sSUFBSSxLQUFLLENBQ1gsOENBQThDLGFBQWEsQ0FBQyxJQUFJLENBQzVELEdBQUcsQ0FDTixrQkFBa0IsQ0FDdEIsQ0FBQztTQUNMO2FBQU0sSUFBSSxDQUFDLGFBQWE7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUVyQyxNQUFNLFNBQVMsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2pELElBQUksR0FBRyxDQUFDO1FBQ1IsUUFBUSxTQUFTLEVBQUU7WUFDZixLQUFLLE1BQU07Z0JBQ1AsT0FBTyxJQUFBLG1CQUFjLEVBQ2pCLGNBQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FDdkQsQ0FBQztnQkFDRixNQUFNO1lBQ1YsS0FBSyxJQUFJO2dCQUNMLE9BQU87Z0JBQ0gsYUFBYTtnQkFDYixDQUNJLFlBQ0ksY0FBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQywwREFDdkQsQ0FDSixDQUFDLE9BQU8sQ0FDWixDQUFDO2dCQUNGLE1BQU07WUFDVixLQUFLLE1BQU0sQ0FBQztZQUNaLEtBQUssS0FBSztnQkFDTixHQUFHLEdBQUcsWUFBSTtxQkFDTCxZQUFZLENBQ1QsY0FBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxFQUNwRCxNQUFNLENBQ1Q7cUJBQ0EsUUFBUSxFQUFFLENBQUM7Z0JBQ2hCLE9BQU8sY0FBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDekIsTUFBTTtZQUNWO2dCQUNJLEdBQUcsR0FBRyxZQUFJO3FCQUNMLFlBQVksQ0FDVCxjQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLEVBQ3BELE1BQU0sQ0FDVDtxQkFDQSxRQUFRLEVBQUUsQ0FBQztnQkFDaEIsbUNBQW1DO2dCQUNuQyxJQUFJO29CQUNBLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUN6QjtnQkFBQyxPQUFPLENBQUMsRUFBRTtpQkFDWDtnQkFDRCxPQUFPLEdBQUcsQ0FBQztnQkFDWCxNQUFNO1NBQ2I7SUFDTCxDQUFDO0NBQUE7QUFoRkQsbUNBZ0ZDIn0=