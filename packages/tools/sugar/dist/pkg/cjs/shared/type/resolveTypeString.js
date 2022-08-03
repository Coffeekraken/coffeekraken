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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseTypeString_1 = __importDefault(require("./parseTypeString"));
const replaceTokens_1 = __importDefault(require("../token/replaceTokens"));
function resolveTypeString(typeString, settings = {}) {
    var _a, _b, _c;
    const finalSettings = Object.assign({ cwd: process.cwd() }, settings);
    let types, interf;
    // regular types
    if (typeString.match(/^\{.*\}$/)) {
        types = (0, parseTypeString_1.default)(typeString);
        // path type
    }
    else if (typeString.match(/^(\.|\/|[a-zA-Z0-9])/)) {
        // resolve tokens
        const path = (0, replaceTokens_1.default)(typeString);
        if (blockSettings.filePath) {
            let potentialTypeFilePath;
            if (typeString.match(/^(\.|\/)/)) {
                potentialTypeFilePath = __path.resolve(__path.dirname(blockSettings.filePath), path);
            }
            else {
                potentialTypeFilePath = __path.resolve(__packageRoot(__path.dirname(blockSettings.filePath)), path);
            }
            if (__fs.existsSync(potentialTypeFilePath)) {
                const typeData = (yield Promise.resolve().then(() => __importStar(require(potentialTypeFilePath)))).default;
                type = (_a = [typeData.name]) !== null && _a !== void 0 ? _a : type;
                // save data into the "metas" property on the string directly
                interf = (_c = (_b = typeData.toObject) === null || _b === void 0 ? void 0 : _b.call(typeData)) !== null && _c !== void 0 ? _c : typeData;
            }
        }
    }
}
exports.default = resolveTypeString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx3RUFBeUU7QUFFekUsMkVBQXFEO0FBdUNyRCxTQUF3QixpQkFBaUIsQ0FDckMsVUFBa0IsRUFDbEIsV0FBZ0QsRUFBRTs7SUFFbEQsTUFBTSxhQUFhLG1CQUNmLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQ2YsUUFBUSxDQUNkLENBQUM7SUFFRixJQUFJLEtBQUssRUFBRSxNQUFNLENBQUM7SUFFbEIsZ0JBQWdCO0lBQ2hCLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUM5QixLQUFLLEdBQUcsSUFBQSx5QkFBaUIsRUFBQyxVQUFVLENBQUMsQ0FBQztRQUN0QyxZQUFZO0tBQ2Y7U0FBTSxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsRUFBRTtRQUNqRCxpQkFBaUI7UUFDakIsTUFBTSxJQUFJLEdBQUcsSUFBQSx1QkFBZSxFQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXpDLElBQUksYUFBYSxDQUFDLFFBQVEsRUFBRTtZQUN4QixJQUFJLHFCQUFxQixDQUFDO1lBRTFCLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDOUIscUJBQXFCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FDbEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQ3RDLElBQUksQ0FDUCxDQUFDO2FBQ0w7aUJBQU07Z0JBQ0gscUJBQXFCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FDbEMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQ3JELElBQUksQ0FDUCxDQUFDO2FBQ0w7WUFFRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLEdBQUcsQ0FBQyx3REFBYSxxQkFBcUIsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUMvRCxJQUFJLEdBQUcsTUFBQSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsbUNBQUksSUFBSSxDQUFDO2dCQUMvQiw2REFBNkQ7Z0JBQzdELE1BQU0sR0FBRyxNQUFBLE1BQUEsUUFBUSxDQUFDLFFBQVEsd0RBQUksbUNBQUksUUFBUSxDQUFDO2FBQzlDO1NBQ0o7S0FDSjtBQUNMLENBQUM7QUExQ0Qsb0NBMENDIn0=