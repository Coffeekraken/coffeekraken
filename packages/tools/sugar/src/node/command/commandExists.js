var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { spawnSync } from 'child_process';
/**
 * @name            commandExists
 * @namespace       node.command
 * @type            Function
 * @async
 * @platform        ts
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function commandExists(command) {
    return __awaiter(this, void 0, void 0, function* () {
        const isWin = process.platform === "win32";
        const where = isWin ? 'where' : 'whereis';
        // check by version
        const versionOut = spawnSync(`${command} -v`, ['/?'], {
            encoding: 'utf-8',
            shell: true
        });
        if (versionOut.stdout)
            return true;
        const out = spawnSync(where + ' ' + command, ['/?'], {
            encoding: 'utf8',
            shell: true
        });
        return out.stdout !== '';
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZEV4aXN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbW1hbmRFeGlzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFnQixhQUFhLENBQUMsT0FBZTs7UUFDdkQsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUM7UUFDM0MsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUUxQyxtQkFBbUI7UUFDbkIsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLEdBQUcsT0FBTyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNsRCxRQUFRLEVBQUUsT0FBTztZQUNqQixLQUFLLEVBQUUsSUFBSTtTQUNkLENBQUMsQ0FBQztRQUNILElBQUksVUFBVSxDQUFDLE1BQU07WUFBRSxPQUFPLElBQUksQ0FBQztRQUVuQyxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNqRCxRQUFRLEVBQUUsTUFBTTtZQUNoQixLQUFLLEVBQUUsSUFBSTtTQUNkLENBQUMsQ0FBQztRQUNILE9BQU8sR0FBRyxDQUFDLE1BQU0sS0FBSyxFQUFFLENBQUM7SUFDN0IsQ0FBQztDQUFBIn0=