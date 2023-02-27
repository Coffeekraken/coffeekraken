var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __readJsonSync } from '@coffeekraken/sugar/fs';
/**
 * @name                import
 * @namespace           node.module
 * @type                Function
 * @platform            node
 * @status              beta
 * @async
 * @private
 *
 * This function is the same as the native "import" one unless it allows you to pass an array with 2 values when the
 * first is the package name from which to import things, and the second is the "export" to import.
 *
 * @param       {String|Array}              what            Either a string like with the native "import" function, either an array with 2 values. 1st is the package name, 2nd is the "export" to import
 * @return      {any}                                       The imported things
 *
 * @example         js
 * import { __import } from '@coffeekraken/sugar/module';
 * __import('@coffeekraken/s-typescript-builder');
 * __import(['@coffeekraken/s-typescript-builder', 'STypescriptBuilderBuildParamsInterface']);
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function _import(what) {
    return __awaiter(this, void 0, void 0, function* () {
        let imported;
        if (Array.isArray(what)) {
            if (what[0].match(/\.json$/)) {
                imported = __readJsonSync(what[0]);
            }
            else {
                imported = yield import(what[0]);
            }
            return imported[what[1]];
        }
        if (what.match(/\.json$/)) {
            imported = __readJsonSync(what);
            return imported;
        }
        return (yield import(what)).default;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV4RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQWdCLE9BQU8sQ0FBQyxJQUF1Qjs7UUFDekQsSUFBSSxRQUFRLENBQUM7UUFDYixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDckIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUMxQixRQUFRLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RDO2lCQUFNO2dCQUNILFFBQVEsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwQztZQUNELE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3ZCLFFBQVEsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEMsT0FBTyxRQUFRLENBQUM7U0FDbkI7UUFDRCxPQUFPLENBQUMsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDeEMsQ0FBQztDQUFBIn0=