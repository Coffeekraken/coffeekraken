const __childProcess = require('child_process');
const __deepMerge = require('../object/deepMerge');
const __SPromise = require('../promise/SPromise');
const __isPath = require('../is/path');
const __extension = require('../fs/extension');
const __commandExists = require('command-exists');
const __hotkey = require('../keyboard/hotkey');
const __uniqid = require('../string/uniqid');

/**
 * @name            SCommand
 * @namespace       sugar.node.terminal
 * @type            Class
 * @extends         SPromise
 *
 * This class define a command that you can launch, subscribe for data, etc...
 *
 * @param         {String}        name            Specify a simple name for this command
 * @param        {String}         command         The command that this instance has to represent
 * @param         {Object}        [settings={}]     Some settings to configure your command
 * - concurrent (true) {Boolean}: Specify if this command can be launched multiple times at the same time
 * - ask (null) {Object|Array}: Specify one or more (Array) questions to ask before running the command. Here's the possible object properties for a question:
 *    - type (yesOrNo) {String}: Specify the question type. For now it support only "yesOrNo"
 *    - question (null) {String}: Specify the question to ask to the user
 *
 * @example       js
 * const SCommand = require('@coffeekraken/sugar/node/terminal/SCommand');
 * const myCommand = new SCommand('ls -la', {});
 * myCommand.run();
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SCommand extends __SPromise {
  /**
   * @name          _settings
   * @type          Object
   * @private
   *
   * Store this instance settings
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

  /**
   * @name        _askPromise
   * @type        Promise
   * @private
   *
   * Store the promise of a question asked to the user
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _askPromise = null;

  /**
   * @name        _process
   * @type        Promise
   * @private
   *
   * Store child process initiated when running the command
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _process = null;

  /**
   * @name          _processes
   * @type          Object
   * @private
   *
   * Store all the processes runned in this command instance
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _processes = {};

  /**
   * @name          _name
   * @type          String
   * @private
   *
   * Store the command name
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _name = null;

  /**
   * @name          _command
   * @type          String
   * @private
   *
   * Store the command
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _command = null;

  /**
   * @name          _startTimestamp
   * @type          Boolean
   * @private
   *
   * Store the start timestamp
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _startTimestamp = null;

  /**
   * @name          _endTimestamp
   * @type          Boolean
   * @private
   *
   * Store the end timestamp
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _endTimestamp = null;

  /**
   * @name          _isRunning
   * @type          Boolean
   * @private
   *
   * Store if the command is currently running or not
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _isRunning = false;

  /**
   * @name          _isAsking
   * @type          Boolean
   * @private
   *
   * Store if the command is currently asking something to the user or not
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _isAsking = false;

  /**
   * @name          stdout
   * @type          Array
   *
   * Store the data emitted by the command
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  stdout = [];

  /**
   * @name          stderr
   * @type          Array
   *
   * Store the errors emitted by the command
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  stderr = [];

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(name, command, settings = {}) {
    // init subclass
    super(
      (resolve, reject, trigger, cancel) => {
        // save the parameters
        this._name = name;
        this._command = command;
        // extend settings
        this._settings = __deepMerge(
          {
            concurrent: true,
            ask: null
          },
          settings
        );
        // check the command
        this._check();
      },
      {
        stacks: 'data,error,run,exit,close,success,warning,kill,ask,answer'
      }
    ).start();
  }

  /**
   * @name                   name
   * @type                    String
   * @get
   *
   * Get the command name
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get name() {
    return this._name;
  }

  /**
   * @name                   command
   * @type                    String
   * @get
   *
   * Get the command command
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get command() {
    return this._command;
  }

  /**
   * @name                  run
   * @type                  Function
   * @async
   *
   * This method is used to run the command
   *
   * @return        {SPromise}                          An SPromise instance on which you can subscribe for some events listed bellow and that will be resolved once the command is successfully finished
   * - data: Triggered when some data are logged in the child process
   * - error: Triggered when something goes wrong in the child process
   * - exit: Triggered when the child process has been exited
   * - close: Triggered when the child process has been closed
   * - success: Triggered when the child process has finished with success
   * - kill: Triggered when the child process has been killed
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run() {
    // generate a process id
    const processId = __uniqid();
    const processObj = {
      start: Date.now(),
      end: null,
      stdout: [],
      stderr: []
    };
    let childProcess;

    const promise = new __SPromise(
      async (resolve, reject, trigger, cancel) => {
        // if (this._askPromises.length) {
        //   await Promise.all(this._askPromises);
        //   await __wait(100);
        // }

        // check if the command has a question running now
        if (this._isAsking) {
          return;
        }

        // check if the command can be run depending on the "concurrent" property and the command state
        if (this._isRunning && !this._settings.concurrent) {
          this.trigger(
            'warning',
            `You cannot run the command "${this._name}" twice at the same time...`
          );
          return;
        }

        // check if we need to ask something to the user before running this command
        // if (this._settings.ask) {

        //   this._isAsking = true;

        //   const askPromise = this._ask(commandObj.ask, commandObj);
        //   this._askPromises.push(askPromise);
        //   askPromise.then(() => {
        //     this._askPromises.splice(this._askPromises.indexOf(askPromise), 1);
        //   });
        //   const answer = await askPromise;
        //   delete commandObj._isAsking;
        //   this._promise.trigger('answer', answer);
        //   if (answer.value === false) {
        //     cancel();
        //     return;
        //   }
        // }

        try {
          // if (keyObjForCurrentCommand) {
          //   keyObjForCurrentCommand._isRunning = true;
          // }

          // set the command state
          this._isRunning = true;

          // emit a run stack event
          this.trigger('run', this);

          // init the child process
          childProcess = __childProcess.spawn(this._command, {
            shell: true,
            detached: true
          });

          // listen for the killing of the process
          __hotkey('ctrl+c', {
            once: true
          }).on('key', (e) => {
            cancel();
          });

          // child.on('exit', (code, signal) => {
          //   cancel();
          //   trigger('exit', {
          //     ...commandObj,
          //     code,
          //     signal
          //   });
          //   this._promise.trigger('exit', {
          //     ...commandObj,
          //     code,
          //     signal
          //   });
          // });

          childProcess.on('close', (code, signal) => {
            processObj.end = Date.now();
            processObj.duration = processObj.end - processObj.start;
            if (!code || code === 0) {
              processObj.promise.resolve({
                ...processObj,
                code,
                signal
              });
              this.trigger('success', {
                ...processObj,
                code,
                signal
              });
            } else {
              console.log(processObj);
              console.log(code, signal);
              reject({
                ...processObj,
                code,
                signal
              });
              this.trigger('close', {
                ...processObj,
                code,
                signal
              });
            }
          });
          childProcess.on('error', (error) => {
            processObj.end = Date.now();
            processObj.duration = processObj.end - processObj.start;
            reject({
              ...processObj,
              error
            });
            this.trigger('error', {
              ...processObj,
              error
            });
          });
          childProcess.stdout.on('data', (value) => {
            processObj.stdout.push(value.toString());
            trigger('data', {
              ...processObj,
              data: value.toString()
            });
            this.trigger('data', {
              ...processObj,
              data: value.toString()
            });
          });
          childProcess.stderr.on('data', (error) => {
            processObj.stdout.push(error.toString());
            trigger('error', {
              ...processObj,
              error: error.toString()
            });
            this.trigger('error', {
              ...processObj,
              error: error.toString()
            });
          });
        } catch (e) {
          reject(e);
        }
      },
      {
        stacks: 'data,error,exit,close,kill'
      }
    )
      .on('cancel,finally', () => {
        delete this._processes[processId];
        if (Object.keys(this._processes).length <= 0) {
          this._isRunning = false;
        }

        childProcess && childProcess.kill();
        promise.trigger('kill', processObj);
        this.trigger('kill', processObj);
      })
      .start();

    // save the process into the stack
    this._processes[processId] = processObj;

    // return the promise
    return processObj.promise;
  }

  /**
   * @name                 _check
   * @type                Function
   * @private
   *
   * This methood takes a command as parameter and return true if it is executable or throw an error if not
   *
   * @return        {Boolean}                           true if is executable, throw an error if not
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _check() {
    let extension, executable;
    if (__isPath(this._command, true)) {
      // get the file extension
      extension = __extension(this._command);
      executable = this._getExecutableFromExtension(extension);
    } else if (typeof this._command === 'string') {
      // treat this as a command
      executable = this._command.split(' ').slice(0, 1);
    } else {
      // the passed process value is not something usable...
      throw new Error(
        `The passed command "<primary>${this._command}</primary>" is not something usable...`
      );
    }
    // check if the command needed to launch this script is available
    if (!__commandExists.sync(executable)) {
      throw new Error(
        `Sorry but the executable "${executable}" needed to launch the command named "${this._name}" is not installed on your machine...`
      );
    }
    return true;
  }

  /**
   * @name                _getExecutableFromExtension
   * @type                Function
   * @private
   *
   * Return the executable to use in order to execute the passed file extension
   *
   * @param         {String}        extension       The file extension to get the executable for
   * @return        {String}                        The executable command to execute the file extension passed
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _getExecutableFromExtension(extension) {
    switch (extension.toLowerCase()) {
      case 'js':
      case 'jsx':
        return 'node';
        break;
      case 'php':
      default:
        return extension.toLowerCase();
        break;
    }
  }
};
