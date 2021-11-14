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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhpdENsZWFudXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleGl0Q2xlYW51cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxRQUFRLE1BQU0sU0FBUyxDQUFDO0FBQy9CLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUM1QixPQUFPLFdBQVcsTUFBTSwrQkFBK0IsQ0FBQztBQUd4RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsU0FBUyxXQUFXLENBQUMsUUFBUSxHQUFHLEVBQUU7SUFDOUIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDdkMsUUFBUSxHQUFHLFdBQVcsQ0FDbEI7WUFDSSxHQUFHLEVBQUUsRUFBRTtZQUNQLEdBQUcsRUFBRSxDQUFDLG9CQUFvQixDQUFDO1NBQzlCLEVBQ0QsUUFBUSxDQUNYLENBQUM7UUFFRixDQUFDLEdBQVMsRUFBRTtZQUNSLE1BQU0sU0FBUyxHQUFHLE1BQU0sUUFBUSxFQUFFLENBQUM7WUFDbkMsTUFBTSxlQUFlLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUMzQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssT0FBTyxDQUFDLEdBQUc7b0JBQUUsT0FBTyxLQUFLLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsR0FBRztvQkFBRSxPQUFPLElBQUksQ0FBQztnQkFDeEMsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUFFLE9BQU8sSUFBSSxDQUFDO2dCQUNwRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzFDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQy9CLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO3dCQUFFLE9BQU8sSUFBSSxDQUFDO2lCQUN4QztnQkFDRCxPQUFPLEtBQUssQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztZQUVILEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM3QyxNQUFNLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO29CQUNsQyxLQUFLLEVBQUUsSUFBSTtpQkFDZCxDQUFDLENBQUM7YUFDTjtZQUVELE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0QsZUFBZSxXQUFXLENBQUMifQ==