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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2lsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImtpbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBZ0IsSUFBSSxDQUFDLFFBQXlCOztRQUN4RCxPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM3QixDQUFDO0NBQUEifQ==