"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const extension_1 = __importDefault(require("../../fs/extension"));
const fs_1 = __importDefault(require("fs"));
const buildCommandLine_1 = __importDefault(require("../../cli/buildCommandLine"));
const STestJestInterface_1 = __importDefault(require("./interface/STestJestInterface"));
const folderPath_1 = __importDefault(require("../../fs/folderPath"));
const filename_1 = __importDefault(require("../../fs/filename"));
const SProcess_1 = __importDefault(require("../../process/SProcess"));
const child_process_1 = __importDefault(require("child_process"));
module.exports = (_a = class STestJestProcess extends SProcess_1.default {
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
    },
    _a.interfaces = {
        this: STestJestInterface_1.default
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Rlc3RKZXN0UHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNUZXN0SmVzdFByb2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsbUVBQTZDO0FBQzdDLDRDQUFzQjtBQUN0QixrRkFBNEQ7QUFDNUQsd0ZBQWtFO0FBQ2xFLHFFQUErQztBQUMvQyxpRUFBOEM7QUFDOUMsc0VBQWdEO0FBQ2hELGtFQUEwQztBQWtCMUMsdUJBQVMsTUFBTSxnQkFBaUIsU0FBUSxrQkFBVTtRQUtoRDs7Ozs7Ozs7V0FRRztRQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7WUFDdkIsS0FBSyxDQUFDLFVBQVUsa0JBQ2QsRUFBRSxFQUFFLGtCQUFrQixFQUN0QixJQUFJLEVBQUUsbUJBQW1CLElBQ3RCLFFBQVEsRUFDWCxDQUFDO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7Ozs7Ozs7V0FZRztRQUNILE9BQU8sQ0FBQyxPQUFPLEVBQUUsUUFBUSxHQUFHLEVBQUU7WUFDNUIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUMxQixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDckIsTUFBTSxVQUFVLEdBQUcsb0JBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QyxNQUFNLFFBQVEsR0FBRyxrQkFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sU0FBUyxHQUFHLG1CQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckMsTUFBTSx3QkFBd0IsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksU0FBUyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDdkUsTUFBTSxxQkFBcUIsR0FBRyxHQUFHLFVBQVUsSUFBSSx3QkFBd0IsU0FBUyxTQUFTLEVBQUUsQ0FBQztZQUM1RixNQUFNLHlCQUF5QixHQUFHLEdBQUcsVUFBVSxjQUFjLHdCQUF3QixTQUFTLFNBQVMsRUFBRSxDQUFDO1lBQzFHLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO2dCQUMxQyxLQUFLLEdBQUcscUJBQXFCLENBQUM7YUFDL0I7aUJBQU0sSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLHlCQUF5QixDQUFDLEVBQUU7Z0JBQ3JELEtBQUssR0FBRyx5QkFBeUIsQ0FBQzthQUNuQztZQUNELE1BQU0sWUFBWSxHQUNoQiwwQkFBa0IsQ0FBQyxZQUFZLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRTtnQkFDL0MsVUFBVSxFQUFFLDRCQUFvQixDQUFDLFVBQVU7YUFDNUMsQ0FBQyxHQUFHLGtDQUFrQyxDQUFDO1lBRTFDLE1BQU0sWUFBWSxHQUFHLHVCQUFhLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxFQUFFLEVBQUU7Z0JBQ3pELEtBQUssRUFBRSxJQUFJO2FBQ1osQ0FBQyxDQUFDO1lBQ0gsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsR0FBRyxDQUFDO29CQUNQLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFO2lCQUN2QixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUNILFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFDVCxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtpQkFDdkIsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDSCxZQUFZLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDeEMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO29CQUNsQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQ2Y7cUJBQU0sSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNoQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7aUJBQ2hCO3FCQUFNO29CQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDakU7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7S0FDRjtJQTlFUSxhQUFVLEdBQUc7UUFDbEIsSUFBSSxFQUFFLDRCQUFvQjtLQUMxQjtRQTRFRiJ9