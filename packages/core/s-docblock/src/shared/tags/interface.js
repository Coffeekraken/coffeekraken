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
import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __path from 'path';
import __checkPathWithMultipleExtensions from '@coffeekraken/sugar/node/fs/checkPathWithMultipleExtensions';
import __fileName from '@coffeekraken/sugar/node/fs/filename';
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
    return __awaiter(this, void 0, void 0, function* () {
        let stringArray = [];
        if (data.value === true) {
            stringArray = [__fileName(blockSettings.filepath), 'default'];
            if (blockSettings.filepath.match(/\.ts$/)) {
                console.log('RE');
                return;
            }
        }
        else {
            stringArray = data.value.trim().split(/(?<=^\S+)\s/);
        }
        let path = stringArray[0], importName = stringArray[1] ? stringArray[1].trim() : 'default';
        const potentialPath = __checkPathWithMultipleExtensions(__path.resolve(__folderPath(blockSettings.filepath), path), ['js']);
        if (!potentialPath)
            return;
        const int = yield import(potentialPath);
        return int[importName].toObject();
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGlCQUFpQjs7Ozs7Ozs7OztBQUVqQixPQUFPLFlBQVksTUFBTSx3Q0FBd0MsQ0FBQztBQUVsRSxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxpQ0FBaUMsTUFBTSw2REFBNkQsQ0FBQztBQUM1RyxPQUFPLFVBQVUsTUFBTSxzQ0FBc0MsQ0FBQztBQUU5RDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQWdCLFlBQVksQ0FBQyxJQUFJLEVBQUUsYUFBYTs7UUFFMUQsSUFBSSxXQUFXLEdBQWEsRUFBRSxDQUFDO1FBRS9CLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDckIsV0FBVyxHQUFHLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBQyxTQUFTLENBQUMsQ0FBQztZQUM3RCxJQUFJLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixPQUFPO2FBQ1Y7U0FDSjthQUFNO1lBQ0osV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3ZEO1FBRUQsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUNyQixVQUFVLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUVwRSxNQUFNLGFBQWEsR0FBRyxpQ0FBaUMsQ0FDbkQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUMxRCxDQUFDLElBQUksQ0FBQyxDQUNULENBQUM7UUFFRixJQUFJLENBQUMsYUFBYTtZQUFFLE9BQU87UUFFM0IsTUFBTSxHQUFHLEdBQUcsTUFBTSxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDeEMsT0FBTyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDdEMsQ0FBQztDQUFBIn0=