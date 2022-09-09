"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
/**
 * @name            commandExists
 * @namespace       node.command
 * @type            Function
 * @async
 * @platform        node
 * @status          beta
 *
 * This function allows you to check if a command exists on the system where the script is running
 *
 * @todo        tests           high
 * @todo        Documentation
 *
 * @param       {String}            command         The command to check like "ls", "node", etc...
 * @return      {Promise}                           A promise fullfiled once the check has finished with true of false as value
 *
 * @example         js
 * import commandExists from '@coffeekraken/sugar/node/command/commandExists';
 * await commandExists('ls'); // => true
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function commandExists(command) {
    return __awaiter(this, void 0, void 0, function* () {
        const isWin = process.platform === 'win32';
        const where = isWin ? 'where' : 'whereis';
        // check by version
        const versionOut = (0, child_process_1.spawnSync)(`${command} --version`, ['/?'], {
            encoding: 'utf-8',
            shell: true,
        });
        if (versionOut.stdout)
            return versionOut.stdout;
        const out = (0, child_process_1.spawnSync)(where + ' ' + command, ['/?'], {
            encoding: 'utf8',
            shell: true,
        });
        return out.stdout !== '';
    });
}
exports.default = commandExists;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsaURBQTBDO0FBRTFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBOEIsYUFBYSxDQUN2QyxPQUFlOztRQUVmLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDO1FBQzNDLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFFMUMsbUJBQW1CO1FBQ25CLE1BQU0sVUFBVSxHQUFHLElBQUEseUJBQVMsRUFBQyxHQUFHLE9BQU8sWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDekQsUUFBUSxFQUFFLE9BQU87WUFDakIsS0FBSyxFQUFFLElBQUk7U0FDZCxDQUFDLENBQUM7UUFDSCxJQUFJLFVBQVUsQ0FBQyxNQUFNO1lBQUUsT0FBTyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBRWhELE1BQU0sR0FBRyxHQUFHLElBQUEseUJBQVMsRUFBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2pELFFBQVEsRUFBRSxNQUFNO1lBQ2hCLEtBQUssRUFBRSxJQUFJO1NBQ2QsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxHQUFHLENBQUMsTUFBTSxLQUFLLEVBQUUsQ0FBQztJQUM3QixDQUFDO0NBQUE7QUFsQkQsZ0NBa0JDIn0=