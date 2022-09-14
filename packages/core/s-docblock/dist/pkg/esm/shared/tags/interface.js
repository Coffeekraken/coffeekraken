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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGlCQUFpQjs7Ozs7Ozs7OztBQUVqQixPQUFPLG9CQUFvQixNQUFNLG9DQUFvQyxDQUFDO0FBQ3RFLE9BQU8sRUFDSCxpQ0FBaUMsRUFDakMsVUFBVSxFQUNWLFlBQVksR0FDZixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN2RCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBRTFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBZ0IsWUFBWSxDQUFDLElBQUksRUFBRSxhQUFhOzs7UUFDMUQsSUFBSSxXQUFXLEdBQWEsRUFBRSxDQUFDO1FBRS9CLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDckIsV0FBVyxHQUFHLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNqRTthQUFNO1lBQ0gsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3hEO1FBRUQsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUNyQixVQUFVLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUVwRSxNQUFNLGFBQWEsR0FBRyxpQ0FBaUMsQ0FDbkQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUMxRCxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FDZixDQUFDO1FBRUYsSUFBSSxDQUFDLGFBQWE7WUFBRSxPQUFPO1FBRTNCLElBQUksTUFBTSxDQUFDO1FBRVgsSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzlCLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxvQkFBb0IsRUFBRSxDQUFDO1lBQ3JELE1BQU0sTUFBTSxHQUFHLE1BQU0saUJBQWlCLENBQUMsS0FBSyxDQUFDO2dCQUN6QyxJQUFJLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7Z0JBQ3BDLEtBQUssRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztnQkFDcEMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO2dCQUNyQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0JBQ2hCLElBQUksRUFBRSxJQUFJO2FBQ2IsQ0FBQyxDQUFDO1lBQ0gsYUFBYTtZQUNiLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzdELElBQUk7Z0JBQ0EsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQzFEO1lBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtTQUNqQjthQUFNO1lBQ0gsYUFBYTtZQUNiLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUN4QztRQUVELHVDQUF1QztRQUN2QyxJQUFJLE1BQU0sQ0FBQyxTQUFTO1lBQUUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDaEQsa0NBQWtDOztZQUM3QixNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUU3QixNQUFNLFlBQVksR0FBRyxNQUFBLE1BQUEsTUFBTSxDQUFDLFFBQVEsc0RBQUksbUNBQUksTUFBTSxDQUFDO1FBQ25ELFlBQVksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUMvQixZQUFZLENBQUMsVUFBVSxFQUN2QixDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFO1lBQ3hCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO2dCQUMzQixNQUFNLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkMsYUFBYTtnQkFDYixRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDdkIsT0FBTyxRQUFRLENBQUM7YUFDbkI7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDLENBQ0osQ0FBQztRQUVGLE9BQU8sWUFBWSxDQUFDOztDQUN2QiJ9