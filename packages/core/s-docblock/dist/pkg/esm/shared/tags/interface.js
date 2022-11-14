// // @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __STypescriptBuilder from '@coffeekraken/s-typescript-builder';
import { __checkPathWithMultipleExtensions, __fileName, __folderPath, } from '@coffeekraken/sugar/fs';
import { __deepMap } from '@coffeekraken/sugar/object';
import { __resolveTypeString } from '@coffeekraken/sugar/type';
import __fs from 'fs';
import __path from 'path';
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
export default function interfaceTag(data, blockSettings) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        let stringArray = [];
        if (data.value === true) {
            stringArray = [__fileName(blockSettings.filePath), 'default'];
        }
        else {
            stringArray = data.value.trim().split(/(?<=^\S+)\s/);
        }
        let path = stringArray[0], importName = stringArray[1] ? stringArray[1].trim() : 'default';
        const potentialPath = __checkPathWithMultipleExtensions(__path.resolve(__folderPath(blockSettings.filePath), path), ['ts', 'js']);
        if (!potentialPath)
            return;
        let interf;
        if (potentialPath.match(/\.ts$/)) {
            const result = yield __STypescriptBuilder.buildTemporary(potentialPath);
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
            interf = yield import(potentialPath.replace(/\.ts$/, '.js'));
            setTimeout(() => {
                var _a;
                (_a = result === null || result === void 0 ? void 0 : result.remove) === null || _a === void 0 ? void 0 : _a.call(result);
            });
            try {
                __fs.unlinkSync(potentialPath.replace(/\.ts$/, '.js'));
            }
            catch (e) { }
        }
        else {
            // @ts-ignore
            interf = yield import(potentialPath);
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
                value.type = yield __resolveTypeString(`{${value.type}}`);
            }
        }
        interfaceObj.definition = __deepMap(interfaceObj.definition, ({ object, prop, value }) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGlCQUFpQjs7Ozs7Ozs7OztBQUVqQixPQUFPLG9CQUFvQixNQUFNLG9DQUFvQyxDQUFDO0FBQ3RFLE9BQU8sRUFDSCxpQ0FBaUMsRUFDakMsVUFBVSxFQUNWLFlBQVksR0FDZixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMvRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBRTFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBZ0IsWUFBWSxDQUFDLElBQUksRUFBRSxhQUFhOzs7UUFDMUQsSUFBSSxXQUFXLEdBQWEsRUFBRSxDQUFDO1FBRS9CLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDckIsV0FBVyxHQUFHLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNqRTthQUFNO1lBQ0gsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3hEO1FBRUQsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUNyQixVQUFVLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUVwRSxNQUFNLGFBQWEsR0FBRyxpQ0FBaUMsQ0FDbkQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMs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