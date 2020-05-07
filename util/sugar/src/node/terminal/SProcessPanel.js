const __SPanel = require('./SPanel');
const __convert = require('../time/convert');
const __deepMerge = require('../object/deepMerge');
const __blessed = require('blessed');

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
          beforeLog: '<time/>',
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
    let currentCommandColor = null,
      currentAskLinesCount = 1;
    this._process
      .on('data', (data) => {
        if (currentCommandColor !== data.command.color) this.log(' ');
        currentCommandColor = data.command.color;
        this.log(data.command.data, {
          beforeLog: `<${data.command.color || 'white'}>${
            this._settings.beforeLog
          }</${data.command.color || 'white'}>`
        });
      })
      .on('exit', (data) => {
        if (currentCommandColor !== data.command.color) this.log(' ');
        currentCommandColor = data.command.color;
        this.log(
          `<cyan>The command "${data.command.name}" has been terminated</cyan>`,
          {
            beforeLog: `<${data.command.color || 'white'}>${
              this._settings.beforeLog
            }</${data.command.color || 'white'}>`
          }
        );
      })
      // subscribe to errors
      .on('error', (data) => {
        if (currentCommandColor !== data.command.color) this.log(' ');
        currentCommandColor = data.command.color;
        this.log(`<error>Something went wrong:</error>\n${data.error}`, {
          beforeLog: `<${data.command.color || 'white'}>${
            this._settings.beforeLog
          }</${data.command.color || 'white'}>`
        });
      })
      // subscribe to ask
      .on('ask', async (question) => {
        this.log(' ');
        currentCommandColor = question.command.color;
        const lines = this.log(`<cyan>${question.question}</cyan>`, {
          beforeLog: `<${question.command.color || 'white'}>${
            this._settings.beforeLog
          }</${question.command.color || 'white'}>`
        });
        if (question.type === 'input') {
          const answer = await this.input({
            placeholder: question.default
          }).promise;
          question.answerCallback && question.answerCallback(answer);
        }
        currentAskLinesCount = lines.length + 1;
      })
      // subscribe to answer
      .on('answer', (answer) => {
        for (let i = 0; i < currentAskLinesCount; i++) {
          this._settings.logBox.deleteBottom();
        }
      })
      // subscribe to warnings
      .on('warning', (data) => {
        if (currentCommandColor !== data.command.color) this.log(' ');
        currentCommandColor = data.command.color;
        this.log(`<yellow>${data.warning}</yellow>`, {
          beforeLog: `<${data.command.color || 'white'}>${
            this._settings.beforeLog
          }</${data.command.color || 'white'}>`
        });
      })
      // subscribe to "run", meaning that a new command has just been launched in the process
      .on('run', (data) => {
        if (currentCommandColor !== data.command.color) this.log(' ');
        currentCommandColor = data.command.color;
        this.log(
          `<yellow>Starting the "${data.command.name}" command:</yellow>\n<blue>${data.command.command}</blue>`,
          {
            beforeLog: `<${data.command.color || 'white'}>${
              this._settings.beforeLog
            }</${data.command.color || 'white'}>`
          }
        );
        this._updateKeysBox();
      })
      // subscribe to "kill", meaning that a new command has just been launched in the process
      .on('kill', (data) => {
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
            beforeLog: `<${data.command.color || 'white'}>${
              this._settings.beforeLog
            }</${data.command.color || 'white'}>`
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
    const keys = this._process.getKeys();

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
            bg: keyObj.value ? 'green' : 'red',
            fg: 'black'
          };
          break;
        case 'run':
          settings.style = {
            bg: keyObj._isRunning ? 'green' : 'yellow',
            fg: keyObj._isRunning ? 'black' : 'black'
          };
          break;
        case 'action':
          settings.style = {
            bg: 'white',
            fg: 'black'
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
    const keys = this._process.getKeys();

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
        bg: 'white',
        fg: 'black'
      }
    });

    this.append(this._logBox);
    this.append(this._keysBox);

    // update the keysBox
    this._updateKeysBox();
  }
};
