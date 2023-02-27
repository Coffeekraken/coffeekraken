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
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const type_1 = require("@coffeekraken/sugar/type");
const fs_2 = __importDefault(require("fs"));
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
        var _c, _d;
        let stringArray = [];
        if (data.value === true) {
            stringArray = [(0, fs_1.__fileName)(blockSettings.filePath), 'default'];
        }
        else {
            stringArray = data.value.trim().split(/(?<=^\S+)\s/);
        }
        let path = stringArray[0], importName = stringArray[1] ? stringArray[1].trim() : 'default';
        const potentialPath = (0, fs_1.__checkPathWithMultipleExtensions)(path_1.default.resolve((0, fs_1.__folderPath)(blockSettings.filePath), path), ['ts', 'js']);
        if (!potentialPath)
            return;
        let interf;
        if (potentialPath.match(/\.ts$/)) {
            const result = yield s_typescript_builder_1.default.buildTemporary(potentialPath);
            // const typescriptBuilder = new __STypescriptBuilder();
            // const result = await typescriptBuilder.build({
            //     glob: __path.basename(potentialPath),
            //     inDir: __path.dirname(potentialPath),
            //     outDir: __path.dirname(potentialPath),
            //     formats: ['esm'],
            //     save: true,
            // });
            // console.log('_IN', result);
            // @ts-ignore
            interf = yield (_c = potentialPath.replace(/\.ts$/, '.js'), Promise.resolve().then(() => __importStar(require(_c))));
            setTimeout(() => {
                var _a;
                (_a = result === null || result === void 0 ? void 0 : result.remove) === null || _a === void 0 ? void 0 : _a.call(result);
            });
            try {
                fs_2.default.unlinkSync(potentialPath.replace(/\.ts$/, '.js'));
            }
            catch (e) { }
        }
        else {
            // @ts-ignore
            interf = yield (_d = potentialPath, Promise.resolve().then(() => __importStar(require(_d))));
        }
        // take at first the "interface" export
        if (interf.interface)
            interf = interf.interface;
        // otherwise, take the default one
        else
            interf = interf.default;
        const interfaceObj = (_b = (_a = interf.toObject) === null || _a === void 0 ? void 0 : _a.call(interf)) !== null && _b !== void 0 ? _b : interf;
        for (let [prop, value] of Object.entries(interfaceObj.definition)) {
            if (value.type && typeof value.type === 'string') {
                value.type = yield (0, type_1.__resolveTypeString)(`{${value.type}}`);
            }
        }
        interfaceObj.definition = (0, object_1.__deepMap)(interfaceObj.definition, ({ object, prop, value }) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkFBaUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFakIsOEZBQXNFO0FBQ3RFLCtDQUlnQztBQUNoQyx1REFBdUQ7QUFDdkQsbURBQStEO0FBQy9ELDRDQUFzQjtBQUN0QixnREFBMEI7QUFFMUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxTQUE4QixZQUFZLENBQUMsSUFBSSxFQUFFLGFBQWE7Ozs7UUFDMUQsSUFBSSxXQUFXLEdBQWEsRUFBRSxDQUFDO1FBRS9CLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDckIsV0FBVyxHQUFHLENBQUMsSUFBQSxlQUFVLEVBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ2pFO2FBQU07WUFDSCxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDeEQ7UUFFRCxJQUFJLElBQUksR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQ3JCLFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBRXBFLE1BQU0sYUFBYSxHQUFHLElBQUEsc0NBQWlDLEVBQ25ELGNBQU0sQ0FBQyxPQUFPLENBQUMsSUFBQSxpQkFBWSxFQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUMsRUFDMUQsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQ2YsQ0FBQztRQUVGLElBQUksQ0FBQyxhQUFhO1lBQUUsT0FBTztRQUUzQixJQUFJLE1BQU0sQ0FBQztRQUVYLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM5QixNQUFNLE1BQU0sR0FBRyxNQUFNLDhCQUFvQixDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUV4RSx3REFBd0Q7WUFDeEQsaURBQWlEO1lBQ2pELDRDQUE0QztZQUM1Qyw0Q0FBNEM7WUFDNUMsNkNBQTZDO1lBQzdDLHdCQUF3QjtZQUN4QixrQkFBa0I7WUFDbEIsTUFBTTtZQUNOLDhCQUE4QjtZQUM5QixhQUFhO1lBQ2IsTUFBTSxHQUFHLFlBQWEsYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLDBEQUFDLENBQUM7WUFDN0QsVUFBVSxDQUFDLEdBQUcsRUFBRTs7Z0JBQ1osTUFBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsTUFBTSxzREFBSSxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSTtnQkFDQSxZQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDMUQ7WUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO1NBQ2pCO2FBQU07WUFDSCxhQUFhO1lBQ2IsTUFBTSxHQUFHLFlBQWEsYUFBYSwwREFBQyxDQUFDO1NBQ3hDO1FBRUQsdUNBQXVDO1FBQ3ZDLElBQUksTUFBTSxDQUFDLFNBQVM7WUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNoRCxrQ0FBa0M7O1lBQzdCLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBRTdCLE1BQU0sWUFBWSxHQUFHLE1BQUEsTUFBQSxNQUFNLENBQUMsUUFBUSxzREFBSSxtQ0FBSSxNQUFNLENBQUM7UUFFbkQsS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQy9ELElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxPQUFPLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUM5QyxLQUFLLENBQUMsSUFBSSxHQUFHLE1BQU0sSUFBQSwwQkFBbUIsRUFBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2FBQzdEO1NBQ0o7UUFFRCxZQUFZLENBQUMsVUFBVSxHQUFHLElBQUEsa0JBQVMsRUFDL0IsWUFBWSxDQUFDLFVBQVUsRUFDdkIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtZQUN4QixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtnQkFDM0IsTUFBTSxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25DLGFBQWE7Z0JBQ2IsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLE9BQU8sUUFBUSxDQUFDO2FBQ25CO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQyxDQUNKLENBQUM7UUFFRixPQUFPLFlBQVksQ0FBQzs7Q0FDdkI7QUExRUQsK0JBMEVDIn0=