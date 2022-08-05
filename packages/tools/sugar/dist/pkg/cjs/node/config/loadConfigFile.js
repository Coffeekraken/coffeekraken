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
const yaml_1 = __importDefault(require("yaml"));
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
function loadConfigFile(filePath, settings) {
    return __awaiter(this, void 0, void 0, function* () {
        const finalSettings = Object.assign({ rootDir: (0, packageRoot_1.default)(), throw: false }, (settings !== null && settings !== void 0 ? settings : {}));
        // protect if we are not in a package
        if (!finalSettings.rootDir) {
            return;
        }
        const filePathArray = Array.isArray(filePath) ? filePath : [filePath];
        let finalFilePath;
        for (let i = 0; i < filePathArray.length; i++) {
            if (fs_1.default.existsSync(path_1.default.resolve(finalSettings.rootDir, filePathArray[i]))) {
                finalFilePath = filePathArray[i];
                break;
            }
        }
        if (finalSettings.throw && !finalFilePath) {
            throw new Error(`Sorry but none of the passed config files "${filePathArray.join(',')}" does exists...`);
        }
        else if (!finalFilePath)
            return;
        const extension = finalFilePath.split('.').pop();
        let str;
        switch (extension) {
            case 'json':
                return (
                // @ts-ignore
                (yield Promise.resolve().then(() => __importStar(require(path_1.default.resolve(finalSettings.rootDir, finalFilePath))))).default);
                break;
            case 'js':
                return (
                // @ts-ignore
                (yield Promise.resolve().then(() => __importStar(require(path_1.default.resolve(finalSettings.rootDir, finalFilePath))))).default);
                break;
            case 'yaml':
            case 'yml':
                str = fs_1.default
                    .readFileSync(path_1.default.resolve(finalSettings.rootDir, finalFilePath), 'utf8')
                    .toString();
                return yaml_1.default.parse(str);
                break;
            default:
                str = fs_1.default
                    .readFileSync(path_1.default.resolve(finalSettings.rootDir, finalFilePath), 'utf8')
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
exports.default = loadConfigFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLGdEQUEwQjtBQUMxQixzRUFBZ0Q7QUFvQ2hELFNBQThCLGNBQWMsQ0FDeEMsUUFBMkIsRUFDM0IsUUFBMkM7O1FBRTNDLE1BQU0sYUFBYSxtQkFDZixPQUFPLEVBQUUsSUFBQSxxQkFBYSxHQUFFLEVBQ3hCLEtBQUssRUFBRSxLQUFLLElBQ1QsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztRQUVGLHFDQUFxQztRQUNyQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRTtZQUN4QixPQUFPO1NBQ1Y7UUFFRCxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEUsSUFBSSxhQUFhLENBQUM7UUFFbEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDM0MsSUFDSSxZQUFJLENBQUMsVUFBVSxDQUNYLGNBQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDMUQsRUFDSDtnQkFDRSxhQUFhLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxNQUFNO2FBQ1Q7U0FDSjtRQUVELElBQUksYUFBYSxDQUFDLEtBQUssSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN2QyxNQUFNLElBQUksS0FBSyxDQUNYLDhDQUE4QyxhQUFhLENBQUMsSUFBSSxDQUM1RCxHQUFHLENBQ04sa0JBQWtCLENBQ3RCLENBQUM7U0FDTDthQUFNLElBQUksQ0FBQyxhQUFhO1lBQUUsT0FBTztRQUVsQyxNQUFNLFNBQVMsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2pELElBQUksR0FBRyxDQUFDO1FBQ1IsUUFBUSxTQUFTLEVBQUU7WUFDZixLQUFLLE1BQU07Z0JBQ1AsT0FBTztnQkFDSCxhQUFhO2dCQUNiLENBQ0ksd0RBQ0ksY0FBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUV2RCxDQUNKLENBQUMsT0FBTyxDQUNaLENBQUM7Z0JBQ0YsTUFBTTtZQUNWLEtBQUssSUFBSTtnQkFDTCxPQUFPO2dCQUNILGFBQWE7Z0JBQ2IsQ0FDSSx3REFDSSxjQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQ3ZELENBQ0osQ0FBQyxPQUFPLENBQ1osQ0FBQztnQkFDRixNQUFNO1lBQ1YsS0FBSyxNQUFNLENBQUM7WUFDWixLQUFLLEtBQUs7Z0JBQ04sR0FBRyxHQUFHLFlBQUk7cUJBQ0wsWUFBWSxDQUNULGNBQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsRUFDcEQsTUFBTSxDQUNUO3FCQUNBLFFBQVEsRUFBRSxDQUFDO2dCQUNoQixPQUFPLGNBQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3pCLE1BQU07WUFDVjtnQkFDSSxHQUFHLEdBQUcsWUFBSTtxQkFDTCxZQUFZLENBQ1QsY0FBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxFQUNwRCxNQUFNLENBQ1Q7cUJBQ0EsUUFBUSxFQUFFLENBQUM7Z0JBQ2hCLG1DQUFtQztnQkFDbkMsSUFBSTtvQkFDQSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDekI7Z0JBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtnQkFDZCxPQUFPLEdBQUcsQ0FBQztnQkFDWCxNQUFNO1NBQ2I7SUFDTCxDQUFDO0NBQUE7QUFyRkQsaUNBcUZDIn0=