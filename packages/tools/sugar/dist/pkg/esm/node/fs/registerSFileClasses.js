var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SFile from '@coffeekraken/s-file';
import __SugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name            registerSFileClasses
 * @namespace            node.fs
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function is responsivle to register the SFile classes with their proper
 * extensions.
 *
 * @since       2.0.0
 */
export default () => {
    const map = __SugarConfig.get('fs.sFileClassesMap');
    Object.keys(map).forEach((key) => __awaiter(void 0, void 0, void 0, function* () {
        const { default: cls } = yield import(map[key]);
        key.split(',')
            .map((l) => l.trim())
            .forEach((pattern) => {
            __SFile.registerClass(pattern, cls);
        });
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBRXpEOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsZUFBZSxHQUFHLEVBQUU7SUFDaEIsTUFBTSxHQUFHLEdBQTJCLGFBQWEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUM1RSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFPLEdBQUcsRUFBRSxFQUFFO1FBQ25DLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsTUFBTSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDaEQsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDVCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNwQixPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNqQixPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMifQ==