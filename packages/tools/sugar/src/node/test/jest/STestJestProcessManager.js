"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SFsDeamon_1 = __importDefault(require("../../deamon/fs/SFsDeamon"));
const STestJestInterface_1 = __importDefault(require("./interface/STestJestInterface"));
const SChildProcessManager_1 = __importDefault(require("../../process/SChildProcessManager"));
/**
 * @name            STestJestProcess
 * @namespace           sugar.node.test.jest
 * @type            Class
 * @extends         SProcess
 *
 * This class represent the process that launch the tests on javascript files
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class STestJestProcess extends SChildProcessManager_1.default {
    /**
     * @name          constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(initialParams = {}, settings = {}) {
        super(initialParams, {
            id: 'STestJestProcess',
            name: 'Test Jest Process',
            deamon: new SFsDeamon_1.default({}),
            ...settings
        });
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
    // run(argsObj, settings = {}) {
    //     let input = argsObj.input;
    //     delete argsObj.input;
    //     const folderPath = __folderPath(input);
    //     const fileName = __getFilename(input);
    //     const extension = __extension(input);
    //     const fileNameWithoutExtension = fileName.replace(`.${extension}`, '');
    //     const neighbourTestFilePath = `${folderPath}/${fileNameWithoutExtension}.test.${extension}`;
    //     const inTestsFolderTestFilePath = `${folderPath}/__tests__/${fileNameWithoutExtension}.test.${extension}`;
    //     if (__fs.existsSync(neighbourTestFilePath)) {
    //       input = neighbourTestFilePath;
    //     } else if (__fs.existsSync(inTestsFolderTestFilePath)) {
    //       input = inTestsFolderTestFilePath;
    //     }
    //     const commandToRun =
    //       __buildCommandLine(
    //         `npx jest ${input}`,
    //         __STestJestInterface.definitionObj,
    //         argsObj
    //       ) + ' --forceExit --detectOpenHandles';
    //     const childProcess = new __SChildProcessManager(commandToRun, {});
    //     const promise = childProcess.run();
    //     const result = await promise;
    //     if (result.state === 'success') {
    //       return promise.reject(result.value.stdout.join('\n'));
    //     }
    //     // __SPromise.pipe(childProcess, promise);
    //     promise.resolve(result);
    //   return super.run(promise);
    // }
    /**
     * @name          kill
     * @type          Function
     *
     * Method that allows you to kill the process
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    kill() {
        super.kill();
    }
}
exports.default = STestJestProcess;
STestJestProcess.interface = STestJestInterface_1.default;
