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
import __fkill from 'fkill';
import __psList from 'ps-list';
import __deepMerge from '../../shared/object/deepMerge';
/**
 * @name              exitCleanup
 * @namespace            node.process
 * @type              Function
 * @async
 * @platform        node
 * @status          wip
 *
 * This function simply cleanup all the processes and other things that stay alive after that
 * the main process has been terminated
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __exitCleanup()
 *
 * @example         js
 * import { __exitCleanup } from '@coffeekraken/sugar/process';
 * await __exitCleanup();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __exitCleanup(settings = {}) {
    return new Promise(({ resolve, reject }) => {
        settings = __deepMerge({
            pid: [],
            cmd: [/.*\/bin\/sugar\s.*/],
        }, settings);
        (() => __awaiter(this, void 0, void 0, function* () {
            const processes = yield __psList();
            const processesToKill = processes.filter((p) => {
                if (p.pid === process.pid)
                    return false;
                if (p.ppid === process.pid)
                    return true;
                if (settings.pid.indexOf(p.pid) !== -1)
                    return true;
                for (let i = 0; i < settings.cmd.length; i++) {
                    const cmdReg = settings.cmd[i];
                    if (p.cmd.match(cmdReg))
                        return true;
                }
                return false;
            });
            for (let j = 0; j < processesToKill.length; j++) {
                yield __fkill(processesToKill[j].pid, {
                    force: true,
                });
            }
            resolve();
        }))();
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLE9BQU8sTUFBTSxPQUFPLENBQUM7QUFDNUIsT0FBTyxRQUFRLE1BQU0sU0FBUyxDQUFDO0FBQy9CLE9BQU8sV0FBVyxNQUFNLCtCQUErQixDQUFDO0FBRXhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsYUFBYSxDQUFDLFFBQVEsR0FBRyxFQUFFO0lBQy9DLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBQ3ZDLFFBQVEsR0FBRyxXQUFXLENBQ2xCO1lBQ0ksR0FBRyxFQUFFLEVBQUU7WUFDUCxHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztTQUM5QixFQUNELFFBQVEsQ0FDWCxDQUFDO1FBRUYsQ0FBQyxHQUFTLEVBQUU7WUFDUixNQUFNLFNBQVMsR0FBRyxNQUFNLFFBQVEsRUFBRSxDQUFDO1lBQ25DLE1BQU0sZUFBZSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDM0MsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLE9BQU8sQ0FBQyxHQUFHO29CQUFFLE9BQU8sS0FBSyxDQUFDO2dCQUN4QyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLEdBQUc7b0JBQUUsT0FBTyxJQUFJLENBQUM7Z0JBQ3hDLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFBRSxPQUFPLElBQUksQ0FBQztnQkFDcEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUMxQyxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMvQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQzt3QkFBRSxPQUFPLElBQUksQ0FBQztpQkFDeEM7Z0JBQ0QsT0FBTyxLQUFLLENBQUM7WUFDakIsQ0FBQyxDQUFDLENBQUM7WUFFSCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDN0MsTUFBTSxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtvQkFDbEMsS0FBSyxFQUFFLElBQUk7aUJBQ2QsQ0FBQyxDQUFDO2FBQ047WUFFRCxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQztJQUNULENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9