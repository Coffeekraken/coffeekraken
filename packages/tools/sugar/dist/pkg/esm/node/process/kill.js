var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __fkill from 'fkill';
/**
 * @name            kill
 * @namespace       node.process
 * @type            Function
 * @async
 * @platform        node
 * @status          stable
 *
 * This function allows you to kill a process by id or by port.
 * This is just a proxy to the awesome fkill package
 *
 * @param       {number|string}            portOrId        The port or the id of the process you want to kill. If you want to kill from a port, prefix your port with ":" like so ":8888"
 * @return      {Promise}                           A promise resolved if the process has been killed, rejected if not
 *
 * @example         js
 * import kill from '@coffeekraken/sugar/node/process/kill';
 * await kill(':8888'); // port
 * await kill(8765); // id
 *
 * @see             https://www.npmjs.com/package/fkill
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function kill(portOrId) {
    return __awaiter(this, void 0, void 0, function* () {
        return __fkill(portOrId);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQWdCLElBQUksQ0FBQyxRQUF5Qjs7UUFDeEQsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0IsQ0FBQztDQUFBIn0=