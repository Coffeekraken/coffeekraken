const __SPanel = require('./SPanel');
const __convert = require('../time/convert');
const __deepMerge = require('../object/deepMerge');
const __blessed = require('blessed');
const __color = require('../color/color');

/**
 * @name                  SProcessPanel
 * @type                  Class
 *
 * This class is a simple SPanel extended one that accesp an SProcess instance
 * to log the data's from and display an simple UI depending on the SProcess configured keys
 *
 * @param         {SProcess}            process           The SProcess instance you want to attach
 * @param         {Object}              [settings={}]     The settings object to configure your SProcessPanel
 *
 * @example         js
 * const SProcessPanel = require('@coffeekraken/sugar/node/terminal/SProcessPanel');
 * const myPanel = new SProcessPanel(myProcess, {
 *    screen: true
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SProcessPanel extends __SPanel {
  /**
   * @name          _process
   * @type          SProcess
   * @private
   *
   * Store the SProcess instance
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _process = null;

  /**
   * @name          _logBox
   * @type          blessed.Box
   * @private
   *
   * Store the actual box where the logs will be pushed
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _logBox = null;

  /**
   * @name          _keysBox
   * @type          blessed.Box
   * @private
   *
   * Store the box where the keys will be generated
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _keysBox = null;

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(process, settings = {}) {
    // extends SPanel
    super(
      __deepMerge(
        {
          beforeLog: ' '.repeat(process.biggestCommandName.length),
          beforeEachLine: ' <white>│</white> ',
          blessed: {
            scrollable: false
          }
        },
        settings
      )
    );
    // save the process
    this._process = process;
    // subscribe to the process
    this._subscribeToProcess();
    // generate keys UI
    this._generateUI();
  }

  /**
   * @name                _getBeforeLog
   * @type                Function
   * @private
   *
   * This method return the beforeLog setting to pass to the log method of the SPanel
   *
   * @param         {SCommand}        command         The SCommand instance
   * @return        {String}                          The beforeLog string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _getBeforeLog(command) {
    const biggestCommandName = this._process.biggestCommandName;
    return `<${command.color || 'white'}>${' '.repeat(
      biggestCommandName.length - command.name.length
    )}${command.name}</${command.color || 'white'}>`;
  }

  /**
   * @name          _subscribeToProcess
   * @type          Function
   * @private
   *
   * This method simply listen to the process and log the values getted
   * from it into the panel
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _subscribeToProcess() {
    // subscribe to data
    let currentCommandColor = null;
    this._process
      .on('data', (data) => {
        if (currentCommandColor !== data.command.color) this.log(' ');
        currentCommandColor = data.command.color;
        this.log(data.command.data, {
          beforeLog: this._getBeforeLog(data.command)
        });
      })
      .on('exit', (data) => {
        if (currentCommandColor !== data.command.color) this.log(' ');
        currentCommandColor = data.command.color;
        this.log(
          `<cyan>The command "${data.command.name}" has been terminated</cyan>`,
          {
            beforeLog: this._getBeforeLog(data.command)
          }
        );
      })
      // subscribe to errors
      .on('error', (data) => {
        if (currentCommandColor !== data.command.color) this.log(' ');
        currentCommandColor = data.command.color;
        this.log(`<error>Something went wrong:</error>\n${data.error}`, {
          beforeLog: this._getBeforeLog(data.command)
        });
      })
      // subscribe to ask
      .on('ask', async (question) => {
        // this.log(' ');
        currentCommandColor = question.command.color;
        this.log(`<cyan>${question.question}</cyan>`, {
          beforeLog: this._getBeforeLog(question.command)
        });
        if (question.type === 'input') {
          const input = this.input({
            placeholder: question.default
          });
          input.promise.on('cancel', () => {
            question.cancelCallback && question.cancelCallback();
          });
          input.promise.on('resolve', (answer) => {
            question.answerCallback && question.answerCallback(answer);
          });
        }
      })
      // subscribe to answer
      .on('answer', (answer) => {
        // console.log(answer);
        // for (let i = 0; i < currentAskLinesCount; i++) {
        //   this._settings.logBox.deleteBottom();
        // }
      })
      // subscribe to warnings
      .on('warning', (data) => {
        if (currentCommandColor !== data.command.color) this.log(' ');
        currentCommandColor = data.command.color;
        this.log(`<yellow>${data.warning}</yellow>`, {
          beforeLog: this._getBeforeLog(data.command)
        });
      })
      // subscribe to "run", meaning that a new command has just been launched in the process
      .on('run', (data) => {
        if (currentCommandColor !== data.command.color) this.log(' ');
        currentCommandColor = data.command.color;
        this.log(
          `<yellow>Starting the "${data.command.name}" command:</yellow>\n<blue>${data.command.command}</blue>`,
          {
            beforeLog: this._getBeforeLog(data.command)
          }
        );
        setTimeout(() => {
          this._updateKeysBox();
        });
      })
      // subscribe to "kill", meaning that a command has just been killed
      .on('kill', (data) => {
        this.log(
          `<magenta>The command "${data.command.name}" has just been killed</magenta>`,
          {
            beforeLog: this._getBeforeLog(data.command)
          }
        );
        this._updateKeysBox();
      })
      .on('key.toggle', () => {
        this._updateKeysBox();
      })
      .on('key.action', (keyObj) => {
        switch (keyObj.action) {
          case 'clear':
            this._logBox.setContent('');
            this.update();
            break;
        }
      })
      // subscribe to "success", meaning that a command is just finished
      .on('success', (data) => {
        if (currentCommandColor !== data.command.color) this.log(' ');
        currentCommandColor = data.command.color;
        this.log(
          `<green>The "${
            data.command.name
          }" command has finished successfuly in <yellow>${__convert(
            data.duration,
            's'
          )}s</yellow></green>`,
          {
            beforeLog: this._getBeforeLog(data.command)
          }
        );
      })
      .on('close', (data) => {
        this._updateKeysBox();
      })
      .catch((e) => {
        this.log(' ');
      });
  }

  /**
   * @name          _updateKeysBox
   * @type          Function
   * @private
   *
   * This method simply generate all the keys buttons and update the keysBox
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _updateKeysBox() {
    const items = [];
    let currentLeft = 0;

    // keys
    const keys = this._process.keys;

    // loop on all the keys
    Object.keys(keys).forEach((keyName) => {
      const keyObj = keys[keyName];
      const settings = {
        padding: {
          top: 0,
          bottom: 0,
          left: 1,
          right: 1
        }
      };
      switch (keyObj.type) {
        case 'toggle':
          settings.style = {
            bg: keyObj.value
              ? __color('terminal.green').toString()
              : __color('terminal.red').toString(),
            fg: __color('terminal.black').toString()
          };
          break;
        case 'run':
          settings.style = {
            bg: keyObj._isRunning
              ? __color('terminal.green').toString()
              : __color('terminal.yellow').toString(),
            fg: __color('terminal.black').toString()
          };
          break;
        case 'action':
          settings.style = {
            bg: __color('terminal.white').toString(),
            fg: __color('terminal.black').toString()
          };
          break;
      }
      const content = `${keyObj.menu}(${keyObj.key})`;
      const item = __blessed.button({
        ...settings,
        left: currentLeft,
        width: content.length + settings.padding.left + settings.padding.right,
        content
      });
      currentLeft += item.width;

      items.push(item);
    });

    items.forEach((item) => {
      this._keysBox.append(item);
    });

    this.update();
  }

  /**
   * @name          _generateUI
   * @type          Function
   * @private
   *
   * This method take the registered keys in the process and generate a nice and clean UI for it
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _generateUI() {
    // keys
    const keys = this._process.keys;

    // init the logbox
    this._logBox = __blessed.box(
      __deepMerge(
        {
          ...this._settings.blessed
        },
        {
          scrollable: true,
          padding: {
            left: 0,
            right: 0,
            bottom: 0,
            top: 0
          },
          position: {
            top: 0,
            left: 0,
            bottom: 2,
            right: 0
          }
        }
      )
    );
    this._settings.logBox = this._logBox;

    // init the blessed box that will display the keys
    this._keysBox = __blessed.box({
      right: 0,
      height: 1,
      bottom: 0,
      left: 0,
      style: {
        bg: __color('terminal.white').toString(),
        fg: __color('terminal.black').toString()
      }
    });

    this.append(this._logBox);
    this.append(this._keysBox);

    // update the keysBox
    this._updateKeysBox();
  }
};
