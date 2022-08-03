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
import __psList from 'ps-list';
import __fkill from 'fkill';
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
 * @example         js
 * import exitCleanup from '@coffeekraken/sugar/node/process/exitCleanup';
 * await exitCleanup();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function exitCleanup(settings = {}) {
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
export default exitCleanup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFFBQVEsTUFBTSxTQUFTLENBQUM7QUFDL0IsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBQzVCLE9BQU8sV0FBVyxNQUFNLCtCQUErQixDQUFDO0FBR3hEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxTQUFTLFdBQVcsQ0FBQyxRQUFRLEdBQUcsRUFBRTtJQUM5QixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtRQUN2QyxRQUFRLEdBQUcsV0FBVyxDQUNsQjtZQUNJLEdBQUcsRUFBRSxFQUFFO1lBQ1AsR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUM7U0FDOUIsRUFDRCxRQUFRLENBQ1gsQ0FBQztRQUVGLENBQUMsR0FBUyxFQUFFO1lBQ1IsTUFBTSxTQUFTLEdBQUcsTUFBTSxRQUFRLEVBQUUsQ0FBQztZQUNuQyxNQUFNLGVBQWUsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQzNDLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxPQUFPLENBQUMsR0FBRztvQkFBRSxPQUFPLEtBQUssQ0FBQztnQkFDeEMsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxHQUFHO29CQUFFLE9BQU8sSUFBSSxDQUFDO2dCQUN4QyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQUUsT0FBTyxJQUFJLENBQUM7Z0JBQ3BELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDMUMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDL0IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7d0JBQUUsT0FBTyxJQUFJLENBQUM7aUJBQ3hDO2dCQUNELE9BQU8sS0FBSyxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxDQUFDO1lBRUgsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzdDLE1BQU0sT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUU7b0JBQ2xDLEtBQUssRUFBRSxJQUFJO2lCQUNkLENBQUMsQ0FBQzthQUNOO1lBRUQsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRCxlQUFlLFdBQVcsQ0FBQyJ9