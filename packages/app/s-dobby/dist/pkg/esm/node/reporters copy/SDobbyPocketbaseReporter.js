var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __pocketbase from 'pocketbase/cjs';
import __SDobbyReporter from '../SDobbyReporter.js';
global.EventSource = EventSource;
/**
 * @name                SDobbyFsPool
 * @namespace           node
 * @type                Class
 * @extends             SDobbyReporter
 * @platform            node
 * @status              beta
 *
 * This class represent the pocketbase dobby reporter.
 *
 * @param           {ISDobbyPoolMetas}          poolMetas       The informations about the pool like name, uid, etc...
 * @param           {SDobby}                    dobby           The dobby instance on which this pool is attached
 * @param           {ISDobbyPoolSettings}          [settings={}]           Some settings to configure your dobby adapter instance
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SDobbyPocketbaseReporter extends __SDobbyReporter {
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
    constructor(reporterMetas) {
        super(reporterMetas);
        this._pocketbase = new __pocketbase(this.settings.url);
    }
    report(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._pocketbase.collection(this.settings.collection).create({
                uid: data.uid,
                taskUid: data.task.uid,
                data,
            });
            return data;
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sWUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBRTFDLE9BQU8sZ0JBQWdCLE1BQU0sc0JBQXNCLENBQUM7QUFXcEQsTUFBTSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7QUFFakM7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLHdCQUNqQixTQUFRLGdCQUFnQjtJQU94Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLGFBQW1DO1FBQzNDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVLLE1BQU0sQ0FBQyxJQUF1Qjs7WUFDaEMsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDL0QsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO2dCQUNiLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7Z0JBQ3RCLElBQUk7YUFDUCxDQUFDLENBQUM7WUFDSCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0tBQUE7Q0FDSiJ9