"use strict";
var _a;
const __extension = require('../../fs/extension');
const __fs = require('fs');
const __SProcessManager = require('../../process/SProcessManager');
const __SPromise = require('../../promise/SPromise');
const __SFsDeamon = require('../../deamon/fs/SFsDeamon');
const __buildCommandLine = require('../../cli/buildCommandLine');
const __STestJestInterface = require('./interface/STestJestInterface');
const __SChildProcessManager = require('../../process/SChildProcessManager');
const __folderPath = require('../../fs/folderPath');
const __getFilename = require('../../fs/filename');
const __copy = require('../../clipboard/copy');
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
module.exports = (_a = class STestJestProcess extends __SChildProcessManager {
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
                deamon: new __SFsDeamon({}),
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
    },
    _a.interface = __STestJestInterface,
    _a);
