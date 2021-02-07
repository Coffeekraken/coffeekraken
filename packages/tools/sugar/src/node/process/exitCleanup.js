"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ps_list_1 = __importDefault(require("ps-list"));
const fkill_1 = __importDefault(require("fkill"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
/**
 * @name              exitCleanup
 * @namespace           sugar.node.process
 * @type              Function
 * @async
 * @status              wip
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
        settings = deepMerge_1.default({
            pid: [],
            cmd: [/.*\/bin\/sugar\s.*/]
        }, settings);
        (() => __awaiter(this, void 0, void 0, function* () {
            const processes = yield ps_list_1.default();
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
                yield fkill_1.default(processesToKill[j].pid, {
                    force: true
                });
            }
            resolve();
        }))();
    });
}
module.exports = exitCleanup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhpdENsZWFudXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleGl0Q2xlYW51cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7OztBQUVkLHNEQUErQjtBQUMvQixrREFBNEI7QUFDNUIsb0VBQThDO0FBRzlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILFNBQVMsV0FBVyxDQUFDLFFBQVEsR0FBRyxFQUFFO0lBQ2hDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBQ3pDLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtZQUNFLEdBQUcsRUFBRSxFQUFFO1lBQ1AsR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUM7U0FDNUIsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUVGLENBQUMsR0FBUyxFQUFFO1lBQ1YsTUFBTSxTQUFTLEdBQUcsTUFBTSxpQkFBUSxFQUFFLENBQUM7WUFDbkMsTUFBTSxlQUFlLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUM3QyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssT0FBTyxDQUFDLEdBQUc7b0JBQUUsT0FBTyxLQUFLLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsR0FBRztvQkFBRSxPQUFPLElBQUksQ0FBQztnQkFDeEMsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUFFLE9BQU8sSUFBSSxDQUFDO2dCQUNwRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzVDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQy9CLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO3dCQUFFLE9BQU8sSUFBSSxDQUFDO2lCQUN0QztnQkFDRCxPQUFPLEtBQUssQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1lBRUgsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQy9DLE1BQU0sZUFBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUU7b0JBQ3BDLEtBQUssRUFBRSxJQUFJO2lCQUNaLENBQUMsQ0FBQzthQUNKO1lBRUQsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFDRCxpQkFBUyxXQUFXLENBQUMifQ==