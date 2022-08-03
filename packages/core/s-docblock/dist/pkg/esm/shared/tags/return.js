// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __resolveTypeString from '@coffeekraken/sugar/node/type/resolveTypeString';
/**
 * @name              return
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
 *
 * Parse the return tag
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
function returnTag(data, blockSettings) {
    return __awaiter(this, void 0, void 0, function* () {
        const stringArray = data.value.split(/\s{2,9999}|\t/).map((l) => l.trim());
        let type = stringArray && stringArray[0] ? stringArray[0] : null;
        type = yield __resolveTypeString(type);
        const description = new String(stringArray[1] ? stringArray[1].trim() : '');
        description.render = true;
        return {
            type,
            description,
        };
    });
}
export default returnTag;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLG1CQUFtQixNQUFNLGlEQUFpRCxDQUFDO0FBRWxGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxTQUFlLFNBQVMsQ0FBQyxJQUFJLEVBQUUsYUFBYTs7UUFDeEMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUUzRSxJQUFJLElBQUksR0FBRyxXQUFXLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUVqRSxJQUFJLEdBQUcsTUFBTSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV2QyxNQUFNLFdBQVcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUUsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFMUIsT0FBTztZQUNILElBQUk7WUFDSixXQUFXO1NBQ2QsQ0FBQztJQUNOLENBQUM7Q0FBQTtBQUNELGVBQWUsU0FBUyxDQUFDIn0=