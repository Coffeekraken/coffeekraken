// @ts-nocheck

import __path from 'path';
import __upperFirst from '../../string/upperFirst';
import __SBlessedComponent from '../../blessed/SBlessedComponent';
import __sugarHeading from '../../ascii/sugarHeading';
import __sugarConfig from '../../config/sugar';
import __blessed from 'blessed';
import __parseHtml from '../../console/parseHtml';
import __countLine from '../../string/countLine';
import __SBlessedStdio from '../../blessed/stdio/SBlessedStdio';
import __color from '../../color/color';
import __hotkey from '../../keyboard/hotkey';
import __packageJson from '../../package/json';
import __SNotification from '../../blessed/notification/SNotification';
import __ora from 'ora';
import __clone from '../../object/clone';
import __SPromise from '../../promise/SPromise';
// import __SIpc from '../../ipc/SIpc';

/**
 * @name                SSugarAppTerminalUi
 * @namespace           sugar.node.ui.sugar
 * @type                Class
 * @extends             SBlessedComponent
 * @wip
 *
 * This class represent the Sugar UI interface in the terminal.
 *
 * @param           {SPromise}          source        The source from where to get data
 * @param           {Object}          [params={}]        An object of initial params
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SSugarAppTerminalUi extends __SBlessedComponent {
  /**
   * @name        _shortcutsCallbackByModule
   * @type        Object
   * @private
   *
   * Store each shortcuts by modules like:
   * {
   *    'ctrl+r': {
   *      'moduleId': callback
   *    }
   * }
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _shortcutsCallbackByModule = {};

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
  constructor(sources: any, settings = {}) {
    super({
      screen: true
    });

    this._displayedModuleId = 'welcome';

    if (!Array.isArray(sources)) sources = [sources];
    this._handlerInstance = sources[0];

    this._appSettings = this._handlerInstance._settings.app;
    this._processSettings = this._handlerInstance._settings;
    this._sources = Array.isArray(sources) ? sources : [sources];
    this._params = Object.assign({}, this._processSettings.initialParams || {});
    const $welcome = this._initWelcome(this._params);
    const $summary = this._initSummary(this._params);
    this._modulesObjs = {
      welcome: {
        id: 'welcome',
        name: 'Welcome',
        state: 'ready',
        $content: $welcome
      },
      summary: {
        id: 'summary',
        name: 'Summary',
        state: 'ready',
        $content: $summary
      },
      ...this._handlerInstance.modulesObjs
    };

    Object.keys(this._modulesObjs).forEach((moduleName, i) => {
      const moduleObj = this._modulesObjs[moduleName];
      if (moduleObj.instance === undefined) return;
      $summary.registerSource(moduleObj.instance);
    });

    this._serverSettings = this._modulesObjs[
      this._appSettings.welcome.serverModule
    ];

    this.$container = this._initContainer();
    this.$content = this._initContent();
    this.$topBar = this._initTopBar();
    this.$separator = this._initSeparator();
    this.$bottomBar = this._initBottomBar();
    this.$list = this._initModulesList();
    this._initModules(this.$content);

    // show the welcome screen
    this._showModule('welcome');

    // set focus to list
    this.$list.focus();

    __hotkey('escape').on('press', () => {
      this._showModule('welcome');
    });

    Object.keys(this._modulesObjs).forEach((moduleName, i) => {
      const moduleObj = this._modulesObjs[moduleName];
      __hotkey(`${i + 1}`).on('press', () => {
        if (!this._modulesReady) return;
        this._showModule(moduleObj.id);
        this.$list.focus();
      });
    });

    // listen app
    this._modulesReady = false;
    this._handlerInstance.on('state', (state: any) => {
      if (state === 'ready') {
        this._modulesReady = true;
      }
    });

    // listen modules
    this._handlerInstance.on('*.state', (state: any, metas: any) => {
      this._moduleState(state, metas);
    });
    this._handlerInstance.on(
      '*.notification',
      (notificationObj: any, metas: any) => {
        this._moduleNotification(notificationObj);
      }
    );
    this._handlerInstance.on('*.start', (data: any, metas: any) => {
      this._moduleStart(data, metas);
    });
    this._handlerInstance.on('*.success', (data: any, metas: any) => {
      this._moduleSuccess(data, metas);
    });
    this._handlerInstance.on('*.error', (data: any, metas: any) => {
      if (metas.stack === 'state.error') return;
      this._moduleError(data, metas);
    });

    this.append(this.$topBar);
    this.append(this.$bottomBar);
    this.append(this.$container);
    this.$container.append(this.$list);
    this.$container.append(this.$content);
    this.$container.append(this.$separator);
  }

  _getDisplayedModuleObj() {
    if (!this._displayedModuleId) return undefined;
    const moduleObj = this._findModuleObjById(this._displayedModuleId);
    if (!moduleObj.$contentContainer.parent) return undefined;
    return moduleObj;
  }

  _showModule(moduleIdOrName: any) {
    let moduleObj = this._findModuleObjById(moduleIdOrName);
    if (!moduleObj) moduleObj = this._findModuleObjByName(moduleIdOrName);
    if (!moduleObj || !moduleObj.$contentContainer) return;

    this._displayedModuleId = moduleObj.id;

    Object.keys(this._modulesObjs).forEach((moduleId, i) => {
      const moduleObjToShowOrHide = this._modulesObjs[moduleId];

      if (moduleObjToShowOrHide.id === moduleObj.id) {
        if (moduleObjToShowOrHide.instance !== undefined)
          moduleObjToShowOrHide.instance.activate();
        this.$list.select(i);
      } else {
        if (moduleObjToShowOrHide.instance !== undefined)
          moduleObjToShowOrHide.instance.unactivate();
      }
    });
    this.$content.children.forEach(($child: any) => {
      $child.hide();
    });
    moduleObj.$contentContainer.show();
  }

  _findModuleObjById(id: any) {
    for (let i = 0; i < Object.keys(this._modulesObjs).length; i++) {
      const moduleObj = this._modulesObjs[Object.keys(this._modulesObjs)[i]];
      if (moduleObj.id === id) return moduleObj;
    }
    return false;
  }

  _findModuleObjByName(name: any) {
    for (let i = 0; i < Object.keys(this._modulesObjs).length; i++) {
      const moduleObj = this._modulesObjs[Object.keys(this._modulesObjs)[i]];
      if (moduleObj.name === name) return moduleObj;
    }
    return false;
  }

  _moduleError(data: any, metas: any) {
    return;

    const moduleObj = this._findModuleObjById(data.module.id);

    if (!moduleObj) return;

    let msg = data.value;
    if (msg.length > 36) msg = msg.slice(0, 33) + '...';
    // const $errorNotification = new __SNotification(
    //   data.module.name || data.module.id,
    //   msg,
    //   {
    //     onClick: () => {
    //       this._showModule(moduleObj.id);
    //     },
    //     blessed: {
    //       bg: 'red',
    //       hover: {
    //         bg: 'blue'
    //       }
    //     }
    //   }
    // );

    // this.append($errorNotification);
  }

  _moduleNotification(data: any, metas: any) {
    const moduleObj = this._findModuleObjById(data.module.id);

    if (!moduleObj) return;

    return;

    let msg = data.value;
    if (msg.length > 36) msg = msg.slice(0, 33) + '...';
    const $notification = new __SNotification(
      data.module.name || data.module.id,
      msg,
      {
        onClick: () => {
          this._showModule(moduleObj.id);
        },
        blessed: {
          bg:
            data.type === 'success'
              ? 'green'
              : data.type === 'warn'
              ? 'yellow'
              : 'red',
          hover: {
            bg: 'blue'
          }
        }
      }
    );

    this.append($notification);
  }

  // _moduleStart(value, metas) {
  //   const moduleObj = this._modules[value.module.idx];
  //   if (!moduleObj.spinner) moduleObj.spinner = __ora();
  //   if (!moduleObj) return;

  //   moduleObj.state = value.value;
  // }

  _moduleSuccess(data: any, metas: any) {
    return;

    const moduleObj = this._findModuleObjById(data.module.id);
    if (moduleObj && moduleObj.$status) {
      clearTimeout(moduleObj.statusTimeout);
      moduleObj.$status.style.bg = 'green';

      this.update();
      moduleObj.statusTimeout = setTimeout(() => {
        moduleObj.$status.style.bg = 'blue';

        this.update();
      }, 2000);
    }

    if (this._getDisplayedModuleObj().id === moduleObj.id) return;

    let msg = data.value || 'Process finished successfully';
    if (msg.length > 36) msg = msg.slice(0, 33) + '...';
    // const $successNotification = new __SNotification(
    //   data.module.name || data.module.id,
    //   msg,
    //   {
    //     bg: 'green',
    //     onClick: () => {
    //       this._showModule(moduleObj.id);
    //     }
    //   }
    // );

    // this.append($successNotification);
  }

  _moduleState(data: any, metas: any) {
    return;

    const moduleObj = this._modulesObjs[data.module.idx];
    if (!moduleObj) return;
    clearTimeout(moduleObj._stateTimeout);
    moduleObj._stateTimeout = setTimeout(() => {
      delete moduleObj._stateTimeout;
    }, 2000);
    moduleObj.state = data.value;
  }

  _moduleStart(data: any, metas: any) {
    return;

    const moduleObj = this._findModuleObjById(data.module.id);
    if (moduleObj && moduleObj.$status) {
      clearTimeout(moduleObj.statusTimeout);
      moduleObj.$status.style.bg = 'cyan';

      this.update();
    }

    if (this._getDisplayedModuleObj().id === moduleObj.id) return;

    let msg = data.value || 'Process starting...';
    if (msg.length > 36) msg = msg.slice(0, 33) + '...';
    // const $startNotification = new __SNotification(
    //   data.module.name || data.module.id,
    //   msg,
    //   {
    //     bg: 'yellow',
    //     onClick: () => {
    //       this._showModule(moduleObj.id);
    //     }
    //   }
    // );

    // this.append($startNotification);
  }

  _initModulesList() {
    const listItems = [];
    Object.keys(this._modulesObjs).forEach((moduleName, i) => {
      const moduleObj = this._modulesObjs[moduleName];
      listItems.push(`${i + 1}.${moduleObj.name}`);
    });

    const $list = __blessed.list({
      top: 0,
      left: 0,
      bottom: 0,
      width: '20%',
      mouse: true,
      keys: true,
      items: listItems,
      padding: {
        top: 1,
        left: 2,
        right: 2,
        bottom: 1
      },
      style: {
        selected: {
          fg: 'yellow'
        }
      }
    });

    $list.on('select', (item) => {
      const name = item.content.split('.').pop();
      const moduleObj = this._findModuleObjByName(name);
      this._showModule(moduleObj.id);
    });

    setInterval(() => {
      this._updateModulesList();
    }, 100);

    return $list;
  }

  _updateModulesList() {
    Object.keys(this._modulesObjs).forEach((moduleName, i) => {
      let prefix = '',
        bg,
        fg;

      const moduleObj = this._modulesObjs[moduleName];
      if (!moduleObj.spinner) moduleObj.spinner = __ora();

      switch (moduleObj.state) {
        case 'success':
        case 'complete':
          if (moduleObj._stateTimeout) prefix = '✓';
          bg = 'green';
          fg = 'black';
          break;
        case 'running':
        case 'start':
          prefix = moduleObj.spinner.frame().trim();
          bg = 'blue';
          fg = 'cyan';
          break;
        case 'watching':
          prefix = moduleObj.spinner.frame().trim();
          bg = 'black';
          fg = 'magenta';
          break;
        case 'error':
          if (moduleObj._stateTimeout) prefix = '✖';
          bg = 'red';
          fg = 'red';
          break;
        case 'ready':
          if (moduleObj._stateTimeout) prefix = '✓';
          bg = 'black';
          fg = 'green';
          break;
        default:
          prefix = '';
          bg = 'yellow';
          fg = 'black';
          break;
      }

      const moduleString = `${i + 1}.<${fg}>${prefix}</${fg}>${
        prefix !== '' ? '.' : ''
      }${moduleObj.name}`;

      this.$list.children[i].setContent(__parseHtml(moduleString));
    });
  }

  _initContainer() {
    const $container = __blessed.box({
      top: 3,
      left: 0,
      right: 0,
      bottom: 1,
      width: '100%',
      style: {}
    });
    return $container;
  }

  _initSeparator() {
    const $separator = __blessed.box({
      top: 0,
      left: '20%',
      bottom: 0,
      width: 1,
      style: {
        bg: 'yellow'
      }
    });
    return $separator;
  }

  _initContent() {
    const $content = __blessed.box({
      left: '20%',
      width: '80%',
      height: '100%',
      padding: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      }
    });
    return $content;
  }

  _initTopBar() {
    const $topBar = __blessed.box({
      top: 0,
      left: 0,
      right: 0,
      height: 3,
      style: {
        bg: 'yellow',
        fg: 'black'
      },
      padding: {
        top: 1,
        left: 2,
        right: 2
      },
      content: __parseHtml(
        `<bgBlack><white> MIT </white></bgBlack><bgWhite><black> Sugar </black></bgWhite> 2.0.0`
      )
    });
    return $topBar;
  }

  /**
   * @name              _initBottomBar
   * @type              Function
   * @private
   *
   * This method init the bottom screen bar
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _initBottomBar() {
    const $bar = __blessed.box({
      bottom: 0,
      left: 0,
      right: 0,
      height: 1,
      style: {
        bg: 'yellow'
      }
    });

    return $bar;
  }

  /**
   * @name            _initSummary
   * @type            Function
   * @private
   *
   * This method init the sumarry stream
   *
   * @param         {Object}        params       An object of initial params used to launch the sugar ui
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _initSummary(params: any) {
    const $stdio = new __SBlessedStdio([], {});
    $stdio.top = 0;
    $stdio.left = 0;
    $stdio.width = '100%';
    $stdio.height = '100%';
    return $stdio;
  }

  /**
   * @name              _initWelcome
   * @type              Function
   * @private
   *
   * This method init the welcome screen
   *
   * @param         {Object}        params       An object of initial params used to launch the sugar ui
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _initWelcome(params: any) {
    const $container = __blessed.box({
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      style: {}
    });

    const $centeredBox = __blessed.box({
      top: '50%-11',
      left: 'center',
      width: '100%',
      height: 'shrink',
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
      ` <yellow>|</yellow>  ${' '.repeat(byLineSpaces)} ${byLine} ${' '.repeat(
        byLineSpaces
      )} <yellow>|</yellow>`,
      `<yellow>${'-'.repeat(__countLine(projectLine) + 6)}</yellow>`
    ];

    // console.log(this._serverSettings);

    const updateContent = () => {
      let text = [...projectLines, '', spinner.frame()];

      if (this._modulesReady) {
        text = [
          ...projectLines,
          ``,
          `WebUI <green>started</green> at`,
          `<bgYellow><black> http://${this._serverSettings.hostname}:${this._serverSettings.port} </black></bgYellow>`,
          '',
          `<cyan>${Object.keys(this._modulesObjs).length}</cyan> module${
            Object.keys(this._modulesObjs).length > 1 ? 's' : ''
          } loaded`
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
    }, 100);

    $centeredBox.append($logo);
    $centeredBox.append($metasBox);
    $container.append($centeredBox);

    return $container;
  }

  /**
   * @name             _initModules
   * @type              Function
   * @private
   *
   * This method init the console Stdio and save it as reference in the "$console" property
   *
   * @param         {SPromise}          source          The source to log
   *
   * @since             2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _initModules($in) {
    Object.keys(this._modulesObjs).forEach((moduleName, i) => {
      const moduleObj = this._modulesObjs[moduleName];

      if (moduleObj.presets) {
        if (!moduleObj.presets.default)
          moduleObj.presets.default = {
            key: 'd',
            ...(moduleObj.params || {})
          };
      }

      if (!moduleObj.$content && moduleObj.instance) {
        moduleObj.instance.on('stdio.terminal:1', (stdio, metas) => {
          moduleObj.$content = stdio;
          moduleObj.$content.top = 0;
          moduleObj.$content.left = 1;
          moduleObj.$content.width = '100%-2';
          moduleObj.$content.height =
            moduleObj.presets !== undefined ? '100%-1' : '100%';
          moduleObj.$content.padding = {
            top: 1,
            left: 2,
            right: 2,
            bottom: 0
          };
          moduleObj.$contentContainer.append(moduleObj.$content);
        });
      }

      if (moduleObj.$contentContainer === undefined) {
        const $contentContainer = __blessed.box({
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          style: {}
        });
        moduleObj.$contentContainer = $contentContainer;
      }

      if (moduleObj.$bottomBar === undefined) {
        const $bottomBar = __blessed.box({
          width: '100%',
          height: 1,
          bottom: 0,
          left: 1,
          right: 0,
          style: {
            bg: 'yellow'
          }
        });
        moduleObj.$bottomBar = $bottomBar;
      }

      if (moduleObj.presets && Object.keys(moduleObj.presets).length) {
        Object.keys(moduleObj.presets).forEach((presetId, i) => {
          const presetObj = moduleObj.presets[presetId];

          let left = 0;
          moduleObj.$bottomBar.children.forEach(($child) => {
            left += __countLine($child.content);
          });

          const $preset = __blessed.box({
            content: ` (${presetObj.key || i}) ${presetId} `,
            height: 1,
            left,
            width: 'shrink',
            style: {
              fg: 'black',
              bg: 'blue'
            }
          });

          __hotkey(`ctrl+${presetObj.key}`).on('press', () => {
            if (this._displayedModuleId !== moduleObj.id) return;
            // emit a new event
            moduleObj.instance.emit('preset', {
              ...presetObj
            });
          });

          moduleObj.$bottomBar.append($preset);
        });
      }

      if (moduleObj.$content) {
        moduleObj.$contentContainer.append(moduleObj.$content);
        moduleObj.$content.top = 0;
        moduleObj.$content.left = 1;
        moduleObj.$content.width = '100%';
        moduleObj.$content.height =
          moduleObj.presets !== undefined ? '100%-1' : '100%';

        moduleObj.$content.padding = {
          top: 1,
          left: 2,
          right: 2,
          bottom: 0
        };
      }
      if (moduleObj.presets !== undefined) {
        moduleObj.$contentContainer.append(moduleObj.$bottomBar);
      }
      $in.append(moduleObj.$contentContainer);
      moduleObj.$contentContainer.hide();
    });
  }
}
