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
Object.defineProperty(exports, "__esModule", { value: true });
const ps_list_1 = __importDefault(require("ps-list"));
const fkill_1 = __importDefault(require("fkill"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
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
 * import { __exitCleanup } from '@coffeekraken/sugar/process';
 * await __exitCleanup();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __exitCleanup(settings = {}) {
    return new Promise(({ resolve, reject }) => {
        settings = (0, deepMerge_1.default)({
            pid: [],
            cmd: [/.*\/bin\/sugar\s.*/],
        }, settings);
        (() => __awaiter(this, void 0, void 0, function* () {
            const processes = yield (0, ps_list_1.default)();
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
                yield (0, fkill_1.default)(processesToKill[j].pid, {
                    force: true,
                });
            }
            resolve();
        }))();
    });
}
exports.default = __exitCleanup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLHNEQUErQjtBQUMvQixrREFBNEI7QUFDNUIsOEVBQXdEO0FBR3hEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxTQUF3QixhQUFhLENBQUMsUUFBUSxHQUFHLEVBQUU7SUFDL0MsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDdkMsUUFBUSxHQUFHLElBQUEsbUJBQVcsRUFDbEI7WUFDSSxHQUFHLEVBQUUsRUFBRTtZQUNQLEdBQUcsRUFBRSxDQUFDLG9CQUFvQixDQUFDO1NBQzlCLEVBQ0QsUUFBUSxDQUNYLENBQUM7UUFFRixDQUFDLEdBQVMsRUFBRTtZQUNSLE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBQSxpQkFBUSxHQUFFLENBQUM7WUFDbkMsTUFBTSxlQUFlLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUMzQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssT0FBTyxDQUFDLEdBQUc7b0JBQUUsT0FBTyxLQUFLLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsR0FBRztvQkFBRSxPQUFPLElBQUksQ0FBQztnQkFDeEMsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUFFLE9BQU8sSUFBSSxDQUFDO2dCQUNwRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzFDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQy9CLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO3dCQUFFLE9BQU8sSUFBSSxDQUFDO2lCQUN4QztnQkFDRCxPQUFPLEtBQUssQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztZQUVILEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM3QyxNQUFNLElBQUEsZUFBTyxFQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUU7b0JBQ2xDLEtBQUssRUFBRSxJQUFJO2lCQUNkLENBQUMsQ0FBQzthQUNOO1lBRUQsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFoQ0QsZ0NBZ0NDIn0=