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
                (yield Promise.resolve().then(() => __importStar(require(path_2.default.resolve(finalSettings.rootDir, finalFilePath))))).default);
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
                catch (e) { }
                return str;
                break;
        }
    });
}
exports.default = __loadConfigFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBd0Q7QUFDeEQsbURBQTREO0FBQzVELDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsZ0RBQTBCO0FBb0MxQixTQUE4QixnQkFBZ0IsQ0FDMUMsUUFBMkIsRUFDM0IsUUFBMkM7O1FBRTNDLE1BQU0sYUFBYSxtQkFDZixPQUFPLEVBQUUsSUFBQSx1QkFBZ0IsR0FBRSxFQUMzQixLQUFLLEVBQUUsS0FBSyxJQUNULENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7UUFFRixxQ0FBcUM7UUFDckMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUU7WUFDeEIsT0FBTztTQUNWO1FBRUQsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RFLElBQUksYUFBYSxDQUFDO1FBRWxCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzNDLElBQ0ksWUFBSSxDQUFDLFVBQVUsQ0FDWCxjQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQzFELEVBQ0g7Z0JBQ0UsYUFBYSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakMsTUFBTTthQUNUO1NBQ0o7UUFFRCxJQUFJLGFBQWEsQ0FBQyxLQUFLLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdkMsTUFBTSxJQUFJLEtBQUssQ0FDWCw4Q0FBOEMsYUFBYSxDQUFDLElBQUksQ0FDNUQsR0FBRyxDQUNOLGtCQUFrQixDQUN0QixDQUFDO1NBQ0w7YUFBTSxJQUFJLENBQUMsYUFBYTtZQUFFLE9BQU8sRUFBRSxDQUFDO1FBRXJDLE1BQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDakQsSUFBSSxHQUFHLENBQUM7UUFDUixRQUFRLFNBQVMsRUFBRTtZQUNmLEtBQUssTUFBTTtnQkFDUCxPQUFPLElBQUEsbUJBQWMsRUFDakIsY0FBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUN2RCxDQUFDO2dCQUNGLE1BQU07WUFDVixLQUFLLElBQUk7Z0JBQ0wsT0FBTztnQkFDSCxhQUFhO2dCQUNiLENBQ0ksd0RBQ0ksY0FBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUN2RCxDQUNKLENBQUMsT0FBTyxDQUNaLENBQUM7Z0JBQ0YsTUFBTTtZQUNWLEtBQUssTUFBTSxDQUFDO1lBQ1osS0FBSyxLQUFLO2dCQUNOLEdBQUcsR0FBRyxZQUFJO3FCQUNMLFlBQVksQ0FDVCxjQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLEVBQ3BELE1BQU0sQ0FDVDtxQkFDQSxRQUFRLEVBQUUsQ0FBQztnQkFDaEIsT0FBTyxjQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN6QixNQUFNO1lBQ1Y7Z0JBQ0ksR0FBRyxHQUFHLFlBQUk7cUJBQ0wsWUFBWSxDQUNULGNBQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsRUFDcEQsTUFBTSxDQUNUO3FCQUNBLFFBQVEsRUFBRSxDQUFDO2dCQUNoQixtQ0FBbUM7Z0JBQ25DLElBQUk7b0JBQ0EsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3pCO2dCQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7Z0JBQ2QsT0FBTyxHQUFHLENBQUM7Z0JBQ1gsTUFBTTtTQUNiO0lBQ0wsQ0FBQztDQUFBO0FBL0VELG1DQStFQyJ9