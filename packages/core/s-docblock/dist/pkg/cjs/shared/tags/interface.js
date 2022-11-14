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
            interf = yield Promise.resolve().then(() => __importStar(require(potentialPath.replace(/\.ts$/, '.js'))));
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
            interf = yield Promise.resolve().then(() => __importStar(require(potentialPath)));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkFBaUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFakIsOEZBQXNFO0FBQ3RFLCtDQUlnQztBQUNoQyx1REFBdUQ7QUFDdkQsbURBQStEO0FBQy9ELDRDQUFzQjtBQUN0QixnREFBMEI7QUFFMUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxTQUE4QixZQUFZLENBQUMsSUFBSSxFQUFFLGFBQWE7OztRQUMxRCxJQUFJLFdBQVcsR0FBYSxFQUFFLENBQUM7UUFFL0IsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksRUFBRTtZQUNyQixXQUFXLEdBQUcsQ0FBQyxJQUFBLGVBQVUsRUFBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDakU7YUFBTTtZQUNILFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUN4RDtRQUVELElBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFDckIsVUFBVSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFFcEUsTUFBTSxhQUFhLEdBQUcsSUFBQSxzQ0FBaUMsRUFDbkQsY0FBTSxDQUFDLE9BQU8sQ0FBQyxJQUFBLGlCQUFZLEVBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUMxRCxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FDZixDQUFDO1FBRUYsSUFBSSxDQUFDLGFBQWE7WUFBRSxPQUFPO1FBRTNCLElBQUksTUFBTSxDQUFDO1FBRVgsSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzlCLE1BQU0sTUFBTSxHQUFHLE1BQU0sOEJBQW9CLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRXhFLHdEQUF3RDtZQUN4RCxpREFBaUQ7WUFDakQsNENBQTRDO1lBQzVDLDRDQUE0QztZQUM1Qyw2Q0FBNkM7WUFDN0Msd0JBQXdCO1lBQ3hCLGtCQUFrQjtZQUNsQixNQUFNO1lBQ04sOEJBQThCO1lBQzlCLGFBQWE7WUFDYixNQUFNLEdBQUcsd0RBQWEsYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEdBQUMsQ0FBQztZQUM3RCxVQUFVLENBQUMsR0FBRyxFQUFFOztnQkFDWixNQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxNQUFNLHNEQUFJLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJO2dCQUNBLFlBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUMxRDtZQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7U0FDakI7YUFBTTtZQUNILGFBQWE7WUFDYixNQUFNLEdBQUcsd0RBQWEsYUFBYSxHQUFDLENBQUM7U0FDeEM7UUFFRCx1Q0FBdUM7UUFDdkMsSUFBSSxNQUFNLENBQUMsU0FBUztZQUFFLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ2hELGtDQUFrQzs7WUFDN0IsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFFN0IsTUFBTSxZQUFZLEdBQUcsTUFBQSxNQUFBLE1BQU0sQ0FBQyxRQUFRLHNEQUFJLG1DQUFJLE1BQU0sQ0FBQztRQUVuRCxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDL0QsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLE9BQU8sS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQzlDLEtBQUssQ0FBQyxJQUFJLEdBQUcsTUFBTSxJQUFBLDBCQUFtQixFQUFDLElBQUksS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7YUFDN0Q7U0FDSjtRQUVELFlBQVksQ0FBQyxVQUFVLEdBQUcsSUFBQSxrQkFBUyxFQUMvQixZQUFZLENBQUMsVUFBVSxFQUN2QixDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFO1lBQ3hCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO2dCQUMzQixNQUFNLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkMsYUFBYTtnQkFDYixRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDdkIsT0FBTyxRQUFRLENBQUM7YUFDbkI7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDLENBQ0osQ0FBQztRQUVGLE9BQU8sWUFBWSxDQUFDOztDQUN2QjtBQTFFRCwrQkEwRUMifQ==