"use strict";
// // @ts-nocheck
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
const s_typescript_builder_1 = __importDefault(require("@coffeekraken/s-typescript-builder"));
const checkPathWithMultipleExtensions_1 = __importDefault(require("@coffeekraken/sugar/node/fs/checkPathWithMultipleExtensions"));
const filename_1 = __importDefault(require("@coffeekraken/sugar/node/fs/filename"));
const folderPath_1 = __importDefault(require("@coffeekraken/sugar/node/fs/folderPath"));
const deepMap_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMap"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * @name              interface
 * @namespace           shared.tags
 * @type              Function
 * @async
 * @platform            node
 * @status              beta
 *
 * Parse the interface tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @return      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function interfaceTag(data, blockSettings) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        let stringArray = [];
        if (data.value === true) {
            stringArray = [(0, filename_1.default)(blockSettings.filePath), 'default'];
        }
        else {
            stringArray = data.value.trim().split(/(?<=^\S+)\s/);
        }
        let path = stringArray[0], importName = stringArray[1] ? stringArray[1].trim() : 'default';
        const potentialPath = (0, checkPathWithMultipleExtensions_1.default)(path_1.default.resolve((0, folderPath_1.default)(blockSettings.filePath), path), ['ts', 'js']);
        if (!potentialPath)
            return;
        let interf;
        if (potentialPath.match(/\.ts$/)) {
            const typescriptBuilder = new s_typescript_builder_1.default();
            const result = yield typescriptBuilder.build({
                glob: path_1.default.basename(potentialPath),
                inDir: path_1.default.dirname(potentialPath),
                outDir: path_1.default.dirname(potentialPath),
                formats: ['esm'],
                save: true,
            });
            // @ts-ignore
            interf = yield Promise.resolve().then(() => __importStar(require(potentialPath.replace(/\.ts$/, '.js'))));
            try {
                fs_1.default.unlinkSync(potentialPath.replace(/\.ts$/, '.js'));
            }
            catch (e) { }
        }
        else {
            // @ts-ignore
            interf = yield Promise.resolve().then(() => __importStar(require(potentialPath)));
        }
        // take at first the "interface" export
        if (interf.interface)
            interf = interf.interface;
        // otherwise, take the default one
        else
            interf = interf.default;
        const interfaceObj = (_b = (_a = interf.toObject) === null || _a === void 0 ? void 0 : _a.call(interf)) !== null && _b !== void 0 ? _b : interf;
        interfaceObj.definition = (0, deepMap_1.default)(interfaceObj.definition, ({ object, prop, value }) => {
            if (typeof value === 'string') {
                const newValue = new String(value);
                // @ts-ignore
                newValue.render = true;
                return newValue;
            }
            return value;
        });
        return interfaceObj;
    });
}
exports.default = interfaceTag;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkFBaUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFakIsOEZBQXNFO0FBQ3RFLGtJQUE0RztBQUM1RyxvRkFBOEQ7QUFDOUQsd0ZBQWtFO0FBQ2xFLHdGQUFrRTtBQUNsRSw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBRTFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsU0FBOEIsWUFBWSxDQUFDLElBQUksRUFBRSxhQUFhOzs7UUFDMUQsSUFBSSxXQUFXLEdBQWEsRUFBRSxDQUFDO1FBRS9CLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDckIsV0FBVyxHQUFHLENBQUMsSUFBQSxrQkFBVSxFQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNqRTthQUFNO1lBQ0gsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3hEO1FBRUQsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUNyQixVQUFVLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUVwRSxNQUFNLGFBQWEsR0FBRyxJQUFBLHlDQUFpQyxFQUNuRCxjQUFNLENBQUMsT0FBTyxDQUFDLElBQUEsb0JBQVksRUFBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQzFELENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUNmLENBQUM7UUFFRixJQUFJLENBQUMsYUFBYTtZQUFFLE9BQU87UUFFM0IsSUFBSSxNQUFNLENBQUM7UUFFWCxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDOUIsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLDhCQUFvQixFQUFFLENBQUM7WUFDckQsTUFBTSxNQUFNLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7Z0JBQ3pDLElBQUksRUFBRSxjQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztnQkFDcEMsS0FBSyxFQUFFLGNBQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO2dCQUNwQyxNQUFNLEVBQUUsY0FBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7Z0JBQ3JDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQztnQkFDaEIsSUFBSSxFQUFFLElBQUk7YUFDYixDQUFDLENBQUM7WUFDSCxhQUFhO1lBQ2IsTUFBTSxHQUFHLHdEQUFhLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxHQUFDLENBQUM7WUFDN0QsSUFBSTtnQkFDQSxZQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDMUQ7WUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO1NBQ2pCO2FBQU07WUFDSCxhQUFhO1lBQ2IsTUFBTSxHQUFHLHdEQUFhLGFBQWEsR0FBQyxDQUFDO1NBQ3hDO1FBRUQsdUNBQXVDO1FBQ3ZDLElBQUksTUFBTSxDQUFDLFNBQVM7WUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNoRCxrQ0FBa0M7O1lBQzdCLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBRTdCLE1BQU0sWUFBWSxHQUFHLE1BQUEsTUFBQSxNQUFNLENBQUMsUUFBUSxzREFBSSxtQ0FBSSxNQUFNLENBQUM7UUFDbkQsWUFBWSxDQUFDLFVBQVUsR0FBRyxJQUFBLGlCQUFTLEVBQy9CLFlBQVksQ0FBQyxVQUFVLEVBQ3ZCLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7WUFDeEIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQzNCLE1BQU0sUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQyxhQUFhO2dCQUNiLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUN2QixPQUFPLFFBQVEsQ0FBQzthQUNuQjtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUMsQ0FDSixDQUFDO1FBRUYsT0FBTyxZQUFZLENBQUM7O0NBQ3ZCO0FBNURELCtCQTREQyJ9