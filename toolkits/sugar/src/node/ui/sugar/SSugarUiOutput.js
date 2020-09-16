const __SComponent = require('../../blessed/SComponent');
const __sugarHeading = require('../../ascii/sugarHeading');
const __sugarConfig = require('../../config/sugar');
const __blessed = require('blessed');
const __parseHtml = require('../../terminal/parseHtml');
const __trimLines = require('../../string/trimLines');
const __countLine = require('../../string/countLine');
const __SOutput = require('../../blessed/SOutput');
const __color = require('../../color/color');
const __hotkey = require('../../keyboard/hotkey');
const __packageJson = require('../../package/json');
const __SNotification = require('../../blessed/notification/SNotification');
const __ora = require('ora');

/**
 * @name                SSugarUiOutput
 * @namespace           node.ui.sugar
 * @type                Class
 * @extends             SComponent
 *
 * This class represent the Sugar UI interface in the terminal.
 *
 * @param           {SPromise}          source        The source from where to get data
 * @param           {Object}          [initialParams={}]        An object of initial params
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SSugarUiOutput extends __SComponent {
  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(source, initialParams = {}) {
    super({
      screen: true
    });

    this.$welcome = this._initWelcome(initialParams);
    this.$console = this._initConsole(source);

    __hotkey('c').on('press', () => {
      if (!this.$console.parent) {
        this.append(this.$console);
      }
    });
    __hotkey('escape').on('press', () => {
      if (this.$console.parent) {
        this.$console.detach();
      }
    });

    this._modulesReady = false;
    source.on('state', (state) => {
      if (state === 'ready') {
        this._modulesReady = true;
      }
    });

    source.on('module.start', (e, m) => {
      if (this.$console.parent) return;
      let msg = e.value || 'Process starting...';
      if (msg.length > 36) msg = msg.slice(0, 33) + '...';
      const $startNotification = new __SNotification(
        e.module.name || e.module.id,
        msg,
        {
          bg: 'yellow',
          onClick: () => {
            if (!this.$console.parent) {
              this.append(this.$console);
            }
          }
        }
      );
      this.append($startNotification);
    });

    source.on('module.complete', (e, m) => {
      if (this.$console.parent) return;
      let msg = e.value || 'Process finished successfully';
      if (msg.length > 36) msg = msg.slice(0, 33) + '...';
      const $successNotification = new __SNotification(
        e.module.name || e.module.id,
        msg,
        {
          bg: 'green',
          onClick: () => {
            if (!this.$console.parent) {
              this.append(this.$console);
            }
          }
        }
      );
      this.append($successNotification);
    });

    source.on('module.error', (e) => {
      if (this.$console.parent) return;
      let msg = e.value;
      if (msg.length > 36) msg = msg.slice(0, 33) + '...';
      const $errorNotification = new __SNotification(
        e.module.name || e.module.id,
        msg,
        {
          bg: 'red',
          onClick: () => {
            if (!this.$console.parent) {
              this.append(this.$console);
            }
          }
        }
      );

      this.append($errorNotification);
    });

    this.append(this.$welcome);
  }

  /**
   * @name
   */

  /**
   * @name              _initWelcome
   * @type              Function
   * @private
   *
   * This method init the welcome screen
   *
   * @param         {Object}        initialParams       An object of initial params used to launch the sugar ui
   *
   * @since         2.0.0
   *
   */
  _initWelcome(initialParams) {
    const welcomeSettings = __sugarConfig('sugar-ui.welcome');
    const serverSettings = initialParams.modules[welcomeSettings.serverModule];

    const $centeredBox = __blessed.box({
      top: 'center',
      left: 'center',
      width: '100%',
      style: {}
    });

    const logoString = __sugarHeading({
      borders: false
    });
    const $logo = __blessed.box({
      width: 'shrink',
      height: 8,
      top: 0,
      left: 'center',
      style: {},
      content: logoString
    });

    const $metasBox = __blessed.box({
      width: 'shrink',
      height: 'shrink',
      top: logoString.split('\n').length,
      left: 'center',
      style: {}
    });

    const spinner = __ora('Loading');

    const packageJson = __packageJson();

    const projectLine = `<bgWhite><black> ${packageJson.license} </black></bgWhite> <yellow>${packageJson.name}</yellow> <cyan>${packageJson.version}</cyan>`;
    const byLine = `By ${packageJson.author.split(/<|\(/)[0]}`;
    const byLineSpaces =
      Math.round((__countLine(projectLine) - __countLine(byLine)) / 2) - 1;

    const projectLines = [
      `<yellow>${'-'.repeat(__countLine(projectLine) + 6)}</yellow>`,
      `<yellow>|</yellow>  ${projectLine}  <yellow>|</yellow>`,
      `<yellow>|</yellow>  ${' '.repeat(byLineSpaces)} ${byLine} ${' '.repeat(
        byLineSpaces
      )}  <yellow>|</yellow>`,
      `<yellow>${'-'.repeat(__countLine(projectLine) + 6)}</yellow>`
    ];

    const updateContent = () => {
      let text = [...projectLines, '', spinner.frame()];
      if (this._modulesReady) {
        text = [
          ...projectLines,
          ``,
          `WebUI <green>started</green> at`,
          `<bgYellow><black> http://${serverSettings.hostname}:${serverSettings.port} </black></bgYellow>`,
          '',
          `Display console <magenta>(c)</magenta>`,
          `<cyan>${Object.keys(initialParams.modules).length}</cyan> module${
            Object.keys(initialParams.modules).length > 1 ? 's' : ''
          } loaded <magenta>(m)</magenta>`
        ];
      }
      let larger = 0;
      text = text
        .map((t) => {
          t = __parseHtml(t);
          const length = __countLine(t);
          if (length > larger) larger = length;
          return t;
        })
        .map((line) => {
          line =
            ' '.repeat(Math.round((larger - __countLine(line)) / 2)) + line;
          return line;
        });

      $metasBox.setContent(text.join('\n'));
      $metasBox.screen.render();
    };
    setInterval(() => {
      updateContent();
    }, 10);

    $centeredBox.append($logo);
    $centeredBox.append($metasBox);

    return $centeredBox;
  }

  /**
   * @name             _initConsole
   * @type              Function
   * @private
   *
   * This method init the console output and save it as reference in the "$console" property
   *
   * @param         {SPromise}          source          The source to log
   *
   * @since             2.0.0
   *
   */
  _initConsole(source) {
    const $console = new __SOutput(source, {
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      right: 0,
      mouse: true,
      keys: true,
      clickable: false,
      scrollable: true,
      scrollbar: {
        ch: ' ',
        inverse: true
      },
      style: {
        fg: 'white',
        scrollbar: {
          bg: __color('terminal.primary').toString()
        }
      },
      padding: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 2
      }
    });
    return $console;
  }
};
