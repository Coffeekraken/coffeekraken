"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const extension_1 = __importDefault(require("../../fs/extension"));
const fs_1 = __importDefault(require("fs"));
const buildCommandLine_1 = __importDefault(require("../../../shared/cli/buildCommandLine"));
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
     * @param       {Object}        argsObj           The arguments object that will be passed to the underlined actions stream instance
     * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
     * @return      {Süromise}                        An SPomise instance representing the build process
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Rlc3RKZXN0UHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNUZXN0SmVzdFByb2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsbUVBQTZDO0FBQzdDLDRDQUFzQjtBQUN0Qiw0RkFBc0U7QUFDdEUsd0ZBQWtFO0FBQ2xFLHFFQUErQztBQUMvQyxpRUFBOEM7QUFDOUMsc0VBQWdEO0FBQ2hELGtFQUEwQztBQUUxQzs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFxQixnQkFBaUIsU0FBUSxrQkFBVTtJQUt0RDs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUFDdkIsS0FBSyxDQUFDLFVBQVUsa0JBQ2QsRUFBRSxFQUFFLGtCQUFrQixFQUN0QixJQUFJLEVBQUUsbUJBQW1CLElBQ3RCLFFBQVEsRUFDWCxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE9BQU8sQ0FBQyxPQUFPLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDNUIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUMxQixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDckIsTUFBTSxVQUFVLEdBQUcsb0JBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxNQUFNLFFBQVEsR0FBRyxrQkFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sU0FBUyxHQUFHLG1CQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsTUFBTSx3QkFBd0IsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksU0FBUyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkUsTUFBTSxxQkFBcUIsR0FBRyxHQUFHLFVBQVUsSUFBSSx3QkFBd0IsU0FBUyxTQUFTLEVBQUUsQ0FBQztRQUM1RixNQUFNLHlCQUF5QixHQUFHLEdBQUcsVUFBVSxjQUFjLHdCQUF3QixTQUFTLFNBQVMsRUFBRSxDQUFDO1FBQzFHLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO1lBQzFDLEtBQUssR0FBRyxxQkFBcUIsQ0FBQztTQUMvQjthQUFNLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFO1lBQ3JELEtBQUssR0FBRyx5QkFBeUIsQ0FBQztTQUNuQztRQUNELE1BQU0sWUFBWSxHQUNoQiwwQkFBa0IsQ0FBQyxZQUFZLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRTtZQUMvQyxVQUFVLEVBQUUsNEJBQW9CLENBQUMsVUFBVTtTQUM1QyxDQUFDLEdBQUcsa0NBQWtDLENBQUM7UUFFMUMsTUFBTSxZQUFZLEdBQUcsdUJBQWEsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLEVBQUUsRUFBRTtZQUN6RCxLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUMsQ0FBQztRQUNILFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ1AsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7YUFDdkIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNULEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFO2FBQ3ZCLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsWUFBWSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDeEMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNsQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDZjtpQkFBTSxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNoQjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDakU7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBOUVILG1DQStFQztBQTlFUSwyQkFBVSxHQUFHO0lBQ2xCLElBQUksRUFBRSw0QkFBb0I7Q0FDM0IsQ0FBQyJ9