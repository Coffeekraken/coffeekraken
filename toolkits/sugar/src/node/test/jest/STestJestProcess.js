const __extension = require('../../fs/extension');
const __fs = require('fs');
const __buildCommandLine = require('../../cli/buildCommandLine');
const __STestJestInterface = require('./interface/STestJestInterface');
const __folderPath = require('../../fs/folderPath');
const __getFilename = require('../../fs/filename');
const __SProcess = require('../../process/SProcess');
const __childProces = require('child_process');

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
module.exports = class STestJestProcess extends __SProcess {
  static interface = __STestJestInterface;

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
    super(__filename, {
      id: 'STestJestProcess',
      name: 'Test Jest Process',
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
  process(argsObj, settings = {}) {
    let input = argsObj.input;
    delete argsObj.input;
    const folderPath = __folderPath(input);
    const fileName = __getFilename(input);
    const extension = __extension(input);
    const fileNameWithoutExtension = fileName.replace(`.${extension}`, '');
    const neighbourTestFilePath = `${folderPath}/${fileNameWithoutExtension}.test.${extension}`;
    const inTestsFolderTestFilePath = `${folderPath}/__tests__/${fileNameWithoutExtension}.test.${extension}`;
    if (__fs.existsSync(neighbourTestFilePath)) {
      input = neighbourTestFilePath;
    } else if (__fs.existsSync(inTestsFolderTestFilePath)) {
      input = inTestsFolderTestFilePath;
    }
    const commandToRun =
      __buildCommandLine(`npx jest ${input}`, argsObj, {
        definitionObj: __STestJestInterface.definitionObj
      }) + ` --forceExit --detectOpenHandles`;

    const childProcess = __childProces.spawn(commandToRun, [], {
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
      } else if (code === 0 && !signal) {
        this.resolve();
      } else {
        this.reject(this.stderr.length ? this.stderr.join('\n') : null);
      }
    });
  }
};
