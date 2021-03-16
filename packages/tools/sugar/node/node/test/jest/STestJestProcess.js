"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const extension_1 = __importDefault(require("../../fs/extension"));
const fs_1 = __importDefault(require("fs"));
const buildCommandLine_1 = __importDefault(require("../../cli/buildCommandLine"));
const STestJestInterface_1 = __importDefault(require("./interface/STestJestInterface"));
const folderPath_1 = __importDefault(require("../../fs/folderPath"));
const filename_1 = __importDefault(require("../../fs/filename"));
const SProcess_1 = __importDefault(require("../../process/SProcess"));
const child_process_1 = __importDefault(require("child_process"));
/**
 * @name            STestJestProcess
 * @namespace           sugar.node.test.jest
 * @type            Class
 * @extends         SProcess
 * @status              wip
 *
 * This class represent the process that launch the tests on javascript files
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class STestJestProcess extends SProcess_1.default {
    /**
     * @name          constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        super(__filename, Object.assign({ id: 'STestJestProcess', name: 'Test Jest Process' }, settings));
    }
    /**
     * @name              run
     * @type              Function
     *
     * Method that execute the frontend server code, listen for errors, etc...
     *
     * @param       {Object}        argsObj           The arguments object that will be passed to the underlined actions stream instance
     * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
     * @return      {Süromise}                        An SPomise instance representing the build process
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    process(argsObj, settings = {}) {
        let input = argsObj.input;
        delete argsObj.input;
        const folderPath = folderPath_1.default(input);
        const fileName = filename_1.default(input);
        const extension = extension_1.default(input);
        const fileNameWithoutExtension = fileName.replace(`.${extension}`, '');
        const neighbourTestFilePath = `${folderPath}/${fileNameWithoutExtension}.test.${extension}`;
        const inTestsFolderTestFilePath = `${folderPath}/__tests__/${fileNameWithoutExtension}.test.${extension}`;
        if (fs_1.default.existsSync(neighbourTestFilePath)) {
            input = neighbourTestFilePath;
        }
        else if (fs_1.default.existsSync(inTestsFolderTestFilePath)) {
            input = inTestsFolderTestFilePath;
        }
        const commandToRun = buildCommandLine_1.default(`npx jest ${input}`, argsObj, {
            definition: STestJestInterface_1.default.definition
        }) + ` --forceExit --detectOpenHandles`;
        const childProcess = child_process_1.default.spawn(commandToRun, [], {
            shell: true
        });
        childProcess.stdout.on('data', (data) => {
            this.stdout.push(data.toString());
            this.log({
                value: data.toString()
            });
        });
        childProcess.stderr.on('data', (data) => {
            this.stderr.push(data.toString());
            this.error({
                value: data.toString()
            });
        });
        childProcess.on('close', (code, signal) => {
            if (this.isKilling) {
                this.cancel();
            }
            else if (code === 0 && !signal) {
                this.resolve();
            }
            else {
                this.reject(this.stderr.length ? this.stderr.join('\n') : null);
            }
        });
    }
}
exports.default = STestJestProcess;
STestJestProcess.interfaces = {
    this: STestJestInterface_1.default
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Rlc3RKZXN0UHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ub2RlL3Rlc3QvamVzdC9TVGVzdEplc3RQcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG1FQUE2QztBQUM3Qyw0Q0FBc0I7QUFDdEIsa0ZBQTREO0FBQzVELHdGQUFrRTtBQUNsRSxxRUFBK0M7QUFDL0MsaUVBQThDO0FBQzlDLHNFQUFnRDtBQUNoRCxrRUFBMEM7QUFFMUM7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBcUIsZ0JBQWlCLFNBQVEsa0JBQVU7SUFLdEQ7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBQ3ZCLEtBQUssQ0FBQyxVQUFVLGtCQUNkLEVBQUUsRUFBRSxrQkFBa0IsRUFDdEIsSUFBSSxFQUFFLG1CQUFtQixJQUN0QixRQUFRLEVBQ1gsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxPQUFPLENBQUMsT0FBTyxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQzVCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDMUIsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ3JCLE1BQU0sVUFBVSxHQUFHLG9CQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsTUFBTSxRQUFRLEdBQUcsa0JBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QyxNQUFNLFNBQVMsR0FBRyxtQkFBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sd0JBQXdCLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLFNBQVMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLE1BQU0scUJBQXFCLEdBQUcsR0FBRyxVQUFVLElBQUksd0JBQXdCLFNBQVMsU0FBUyxFQUFFLENBQUM7UUFDNUYsTUFBTSx5QkFBeUIsR0FBRyxHQUFHLFVBQVUsY0FBYyx3QkFBd0IsU0FBUyxTQUFTLEVBQUUsQ0FBQztRQUMxRyxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsRUFBRTtZQUMxQyxLQUFLLEdBQUcscUJBQXFCLENBQUM7U0FDL0I7YUFBTSxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMseUJBQXlCLENBQUMsRUFBRTtZQUNyRCxLQUFLLEdBQUcseUJBQXlCLENBQUM7U0FDbkM7UUFDRCxNQUFNLFlBQVksR0FDaEIsMEJBQWtCLENBQUMsWUFBWSxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUU7WUFDL0MsVUFBVSxFQUFFLDRCQUFvQixDQUFDLFVBQVU7U0FDNUMsQ0FBQyxHQUFHLGtDQUFrQyxDQUFDO1FBRTFDLE1BQU0sWUFBWSxHQUFHLHVCQUFhLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxFQUFFLEVBQUU7WUFDekQsS0FBSyxFQUFFLElBQUk7U0FDWixDQUFDLENBQUM7UUFDSCxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUNQLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFO2FBQ3ZCLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDVCxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTthQUN2QixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILFlBQVksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3hDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2Y7aUJBQU0sSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNoQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDaEI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pFO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztBQTlFSCxtQ0ErRUM7QUE5RVEsMkJBQVUsR0FBRztJQUNsQixJQUFJLEVBQUUsNEJBQW9CO0NBQzNCLENBQUMifQ==