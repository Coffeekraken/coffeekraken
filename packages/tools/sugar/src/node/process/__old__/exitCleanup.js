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
const getRegisteredProcesses_1 = __importDefault(require("./getRegisteredProcesses"));
const fkill_1 = __importDefault(require("fkill"));
const hotkey_1 = __importDefault(require("../keyboard/hotkey"));
const keypress_1 = __importDefault(require("keypress"));
const wait_1 = __importDefault(require("../time/wait"));
const SBlessedOutput_1 = __importDefault(require("../blessed/SBlessedOutput"));
const sugarHeading_1 = __importDefault(require("../ascii/sugarHeading"));
const json_1 = __importDefault(require("../package/json"));
const SChildProcess_1 = __importDefault(require("../process/SChildProcess"));
/**
 * @name              exitCleanup
 * @namespace           sugar.node.process
 * @type              Function
 *
 * This function register a handler on process exit and try to clean all the child process, etc...
 *
 * @param       {Function}       [handler=null]       A custom function to handle custom cleanup if you need. MUST return a promise that you have to resolve once the cleanup has been done
 * @param       {Object}        [settings={}]         An object of settings to configure your cleanup:
 * - childProcess (true) {Boolean}: Specify if you want to clean the child processes or not
 *
 * @example         js
 * import exitCleanup from '@coffeekraken/sugar/node/process/exitCleanup';
 * exitCleanup();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
process.env.EXIT_CLEANUP = false;
function exitCleanup() {
    if (process.env.EXIT_CLEANUP === true)
        return;
    process.env.EXIT_CLEANUP = true;
    hotkey_1.default('ctrl+c', {
        once: true
    }).on('press', () => __awaiter(this, void 0, void 0, function* () {
        // check if all processes are closed
        const processes = getRegisteredProcesses_1.default();
        const remainingProcessesCount = Object.keys(processes).length;
        //console.log(processes);
        hotkey_1.default('ctrl+c', {
            once: true
        }).on('press', () => {
            process.exit();
        });
        keypress_1.default.disableMouse(process.stdout);
        yield wait_1.default(50);
        const $output = new SBlessedOutput_1.default([], {
            attach: true,
            maxItemsByGroup: 1000
        });
        $output.log({
            value: `${sugarHeading_1.default({
                version: json_1.default(__dirname).version
            })}`
        });
        $output.log({
            value: 'Cleaning your system after <primary>Sugar</primary> execution...'
        });
        // processed that have been registered during the process
        if (remainingProcessesCount > 0) {
            Object.keys(processes).forEach((key) => __awaiter(this, void 0, void 0, function* () {
                const processObj = processes[key];
                if (!processObj.exitCode && process.pid !== processObj.pid) {
                    $output.log({
                        group: key,
                        value: `Killing the process with the PID <cyan>${processObj.pid}</cyan>`
                    });
                    yield fkill_1.default(processObj.pid);
                    $output.log({
                        group: key,
                        value: `#success The process has been killed <green>successfully</green>`
                    });
                    // processKilled();
                }
                else {
                    // processKilled();
                }
            }));
        }
        // Forgotten processes
        $output.log({
            group: 'Forgotten processes',
            value: 'Cleaning the forgotten process(es)...'
        });
        const childProcess = new SChildProcess_1.default('sugar util.kill all', {});
        yield childProcess
            .run()
            .on('log,error', (value) => {
            if (value.value.includes('#success')) {
                $output.log({
                    group: 'Forgotten processes',
                    value: value.value
                });
            }
        })
            .on('cancel,finally', () => __awaiter(this, void 0, void 0, function* () {
            $output.log({
                group: 'Forgotten processes',
                value: `#success All of the forgotten process(es) have been <green>successfully</green> killed`
            });
            yield wait_1.default(20);
            $output.log({
                value: `Closing the main process in <yellow>5s</yellow>...\n<cyan>ctrl+c</cyan> to close directly`
            });
            yield wait_1.default(5000);
            process.exit();
        }));
    }));
}
module.exports = exitCleanup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhpdENsZWFudXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleGl0Q2xlYW51cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7OztBQUdkLHNGQUFnRTtBQUVoRSxrREFBNEI7QUFDNUIsZ0VBQTBDO0FBRTFDLHdEQUFrQztBQUNsQyx3REFBa0M7QUFDbEMsK0VBQXlEO0FBQ3pELHlFQUFtRDtBQUNuRCwyREFBNEM7QUFDNUMsNkVBQThEO0FBRTlEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztBQUNqQyxTQUFTLFdBQVc7SUFDbEIsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksS0FBSyxJQUFJO1FBQUUsT0FBTztJQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDaEMsZ0JBQVEsQ0FBQyxRQUFRLEVBQUU7UUFDakIsSUFBSSxFQUFFLElBQUk7S0FDWCxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFTLEVBQUU7UUFDeEIsb0NBQW9DO1FBQ3BDLE1BQU0sU0FBUyxHQUFHLGdDQUF3QixFQUFFLENBQUM7UUFDN0MsTUFBTSx1QkFBdUIsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUU5RCx5QkFBeUI7UUFFekIsZ0JBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxFQUFFLElBQUk7U0FDWCxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDbEIsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBRUgsa0JBQVUsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXhDLE1BQU0sY0FBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLE1B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