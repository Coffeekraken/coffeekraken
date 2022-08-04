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
import __checkPathWithMultipleExtensions from '@coffeekraken/sugar/node/fs/checkPathWithMultipleExtensions';
import __fileName from '@coffeekraken/sugar/node/fs/filename';
import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __deepMap from '@coffeekraken/sugar/shared/object/deepMap';
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
            const typescriptBuilder = new __STypescriptBuilder();
            const result = yield typescriptBuilder.build({
                glob: __path.basename(potentialPath),
                inDir: __path.dirname(potentialPath),
                outDir: __path.dirname(potentialPath),
                formats: ['esm'],
                save: true,
            });
            // @ts-ignore
            interf = yield import(potentialPath.replace(/\.ts$/, '.js'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGlCQUFpQjs7Ozs7Ozs7OztBQUVqQixPQUFPLG9CQUFvQixNQUFNLG9DQUFvQyxDQUFDO0FBQ3RFLE9BQU8saUNBQWlDLE1BQU0sNkRBQTZELENBQUM7QUFDNUcsT0FBTyxVQUFVLE1BQU0sc0NBQXNDLENBQUM7QUFDOUQsT0FBTyxZQUFZLE1BQU0sd0NBQXdDLENBQUM7QUFDbEUsT0FBTyxTQUFTLE1BQU0sMkNBQTJDLENBQUM7QUFDbEUsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQWdCLFlBQVksQ0FBQyxJQUFJLEVBQUUsYUFBYTs7O1FBQzFELElBQUksV0FBVyxHQUFhLEVBQUUsQ0FBQztRQUUvQixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ3JCLFdBQVcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDakU7YUFBTTtZQUNILFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUN4RDtRQUVELElBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFDckIsVUFBVSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFFcEUsTUFBTSxhQUFhLEdBQUcsaUNBQWlDLENBQ25ELE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUMsRUFDMUQsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQ2YsQ0FBQztRQUVGLElBQUksQ0FBQyxhQUFhO1lBQUUsT0FBTztRQUUzQixJQUFJLE1BQU0sQ0FBQztRQUVYLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM5QixNQUFNLGlCQUFpQixHQUFHLElBQUksb0JBQW9CLEVBQUUsQ0FBQztZQUNyRCxNQUFNLE1BQU0sR0FBRyxNQUFNLGlCQUFpQixDQUFDLEtBQUssQ0FBQztnQkFDekMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO2dCQUNwQyxLQUFLLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7Z0JBQ3BDLE1BQU0sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztnQkFDckMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDO2dCQUNoQixJQUFJLEVBQUUsSUFBSTthQUNiLENBQUMsQ0FBQztZQUNILGFBQWE7WUFDYixNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUM3RCxJQUFJO2dCQUNBLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUMxRDtZQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7U0FDakI7YUFBTTtZQUNILGFBQWE7WUFDYixNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDeEM7UUFFRCx1Q0FBdUM7UUFDdkMsSUFBSSxNQUFNLENBQUMsU0FBUztZQUFFLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ2hELGtDQUFrQzs7WUFDN0IsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFFN0IsTUFBTSxZQUFZLEdBQUcsTUFBQSxNQUFBLE1BQU0sQ0FBQyxRQUFRLHNEQUFJLG1DQUFJLE1BQU0sQ0FBQztRQUNuRCxZQUFZLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FDL0IsWUFBWSxDQUFDLFVBQVUsRUFDdkIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtZQUN4QixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtnQkFDM0IsTUFBTSxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25DLGFBQWE7Z0JBQ2IsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLE9BQU8sUUFBUSxDQUFDO2FBQ25CO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQyxDQUNKLENBQUM7UUFFRixPQUFPLFlBQVksQ0FBQzs7Q0FDdkIifQ==