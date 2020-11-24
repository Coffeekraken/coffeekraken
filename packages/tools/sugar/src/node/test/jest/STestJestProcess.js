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
                definitionObj: STestJestInterface_1.default.definitionObj
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
    _a.interface = STestJestInterface_1.default,
    _a);
