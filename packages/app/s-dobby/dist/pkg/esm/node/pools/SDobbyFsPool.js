var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SSpecs from '@coffeekraken/s-specs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SDobbyPool from '../SDobbyPool.js';
import { SDobbyFsPoolSettingsSpecs } from '../specs.js';
/**
 * @name                SDobbyFsPool
 * @namespace           node
 * @type                Class
 * @extends             SDobbyPool
 * @platform            node
 * @status              beta
 *
 * This class represent the filesystem dobby adapter.
 *
 * @param           {ISDobbyPoolMetas}          poolMetas       The informations about the pool like name, uid, etc...
 * @param           {SDobby}                    dobby           The dobby instance on which this pool is attached
 * @param           {ISDobbyPoolSettings}          [settings={}]           Some settings to configure your dobby adapter instance
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SDobbyFsPool extends __SDobbyPool {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(dobby, poolMetas, settings) {
        super(dobby, poolMetas, __deepMerge(__SSpecs.extractDefaults(SDobbyFsPoolSettingsSpecs), settings !== null && settings !== void 0 ? settings : {}));
    }
    loadTasks() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLFlBQVksTUFBTSxrQkFBa0IsQ0FBQztBQU01QyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLFlBQWEsU0FBUSxZQUFZO0lBR2xEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksS0FBZSxFQUNmLFNBQTJCLEVBQzNCLFFBQWdDO1FBRWhDLEtBQUssQ0FDRCxLQUFLLEVBQ0wsU0FBUyxFQUNULFdBQVcsQ0FDUCxRQUFRLENBQUMsZUFBZSxDQUFDLHlCQUF5QixDQUFDLEVBQ25ELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVLLFNBQVM7OERBQUksQ0FBQztLQUFBO0NBQ3ZCIn0=