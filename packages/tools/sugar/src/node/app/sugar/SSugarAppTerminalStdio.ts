// @ts-nocheck
import __blessed from 'blessed';
import __quotes from 'inspirational-quotes';
import __ora from 'ora';
import __parseHtml from '../../../shared/console/parseHtml';
import __SNotification from '../../../shared/notification/_SNotification';
import __clone from '../../../shared/object/clone';
import __deepMerge from '../../../shared/object/deepMerge';
import __countLine from '../../../shared/string/countLine';
import __sugarHeading from '../../ascii/sugarHeading';
import __SBlessedComponent from '../../blessed/SBlessedComponent';
import __hotkey from '../../keyboard/hotkey';
import __packageJson from '../../package/json';
import __SBlessedStdio from '../../stdio/blessed/SBlessedStdio';
import __SStdio from '../../stdio/SStdio';
// import __SIpc from '../../ipc/SIpc';

/**
 * @name                SSugarAppTerminalStdio
 * @namespace           sugar.node.ui.sugar
 * @type                Class
 * @extends             SBlessedComponent
 * @status              wip
 *
 * This class represent the Sugar UI interface in the terminal.
 *
 * @param           {SPromise}          source        The source from where to get data
 * @param           {Object}          [params={}]        An object of initial params
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SSugarAppTerminalStdio extends __SStdio {
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
   * @name          $modulesContainer
   * @type          SBlessedComponent
   * @private
   *
   * Store the module container
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  $modulesContainer: any;

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
    super(
      sources,
      __deepMerge(
        {
          sugarAppTerminalStdio: {}
        },
        settings
      )
    );

    this._displayedModuleId = 'welcome';
    this._handlerProcess = this.sources[0];

    // this._appSettings = this._handlerProcess._settings.app;
    // this._processSettings = this._handlerProcess._settings;
    // this._params = Object.assign({}, this._processSettings.initialParams || {});
    const $welcome = this._initWelcome(this._handlerProcess.initialParams);
    const $summary = this._initSummary(this._handlerProcess.initialParams);
    this._modules = {
      welcome: {
        id: 'welcome',
        name: 'Welcome',
        state: 'ready',
        $stdio: $welcome
      },
      summary: {
        id: 'summary',
        name: 'Summary',
        state: 'ready',
        $stdio: $summary
      },
      ...this._handlerProcess.loadedModules
    };

    this._notifier = new __SNotification({
      notification: {
        adapters: ['node', 'blessed']
      }
    });

    this.$container = this._initContainer();
    this.$stdio = this._initStdio();
    this.$topBar = this._initTopBar();
    this.$separator = this._initSeparator();
    this.$bottomBar = this._initBottomBar();
    this.$list = this._initModulesList();

    Object.keys(this._modules).forEach((moduleName, i) => {
      const moduleObj = this._modules[moduleName];
      this._initModule(moduleName);
      if (moduleObj.on && typeof moduleObj.on === 'function') {
        this._summaryStdio.registerSource(moduleObj);
        // listen notifications
        moduleObj.on('notification', (value, metas) => {
          this._notifier.notify(value).on('click', () => {
            this._showModule(moduleObj.id);
          });
        });
      }
    });

    // show the welcome screen
    // and listen for escape key to display welcome
    this._showModule('welcome');
    __hotkey('escape').on('press', () => {
      this.$list.focus();
      this._showModule('welcome');
    });

    // set focus to list
    this.$list.focus();
    Object.keys(this._modules).forEach((moduleName, i) => {
      const moduleObj = this._modules[moduleName];
      __hotkey(`${i + 1}`).on('press', () => {
        if (!this._modulesReady) return;
        this._showModule(moduleObj.id);
        this.$list.focus();
      });
    });

    // listen app
    this._modulesReady = false;
    this._handlerProcess.on('state', (state: any) => {
      if (state === 'ready') {
        this._modulesReady = true;
      }
    });

    // // listen modules
    // this._handlerProcess.on('*.state', (state: any, metas: any) => {
    //   this._moduleState(state, metas);
    // });
    // this._handlerProcess.on(
    //   '*.notification',
    //   (notificationObj: any, metas: any) => {
    //     this._moduleNotification(notificationObj);
    //   }
    // );
    // this._handlerProcess.on('*.start', (data: any, metas: any) => {
    //   this._moduleStart(data, metas);
    // });
    // this._handlerProcess.on('*.success', (data: any, metas: any) => {
    //   this._moduleSuccess(data, metas);
    // });
    // this._handlerProcess.on('*.error', (data: any, metas: any) => {
    //   if (metas.stack === 'state.error') return;
    //   this._moduleError(data, metas);
    // });

    this.$container.append(this.$topBar);
    this.$container.append(this.$bottomBar);
    this.$container.append(this.$list);
    this.$container.append(this.$stdio);
    this.$container.append(this.$separator);
  }

  _getDisplayedModuleObj() {
    if (!this._displayedModuleId) return undefined;
    const moduleObj = this._findModuleObjById(this._displayedModuleId);
    if (!moduleObj.$stdioContainer.parent) return undefined;
    return moduleObj;
  }

  _showModule(moduleIdOrName: any) {
    const module = this._findModuleObj(moduleIdOrName);
    if (!module || !module.$stdio) return;

    Object.keys(this._modules).forEach((moduleId, i) => {
      const mod = this._modules[moduleId];
      if (mod.id === module.id) {
        module.activate && module.activate();
        this.$list.select(i);
      } else {
        mod.unactivate && mod.unactivate();
      }
    });
    this.$stdio.children.forEach(($child: any) => {
      $child.hide();
    });
    module.$stdio.show();
  }

  _findModuleObj(idOrName: string) {
    let moduleObj = this._findModuleObjById(idOrName);
    if (!moduleObj) moduleObj = this._findModuleObjByName(idOrName);
    return moduleObj;
  }

  _findModuleObjById(id: any) {
    for (let i = 0; i < Object.keys(this._modules).length; i++) {
      const moduleObj = this._modules[Object.keys(this._modules)[i]];
      if (moduleObj.id === id) return moduleObj;
    }
    return false;
  }

  _findModuleObjByName(name: any) {
    for (let i = 0; i < Object.keys(this._modules).length; i++) {
      const moduleObj = this._modules[Object.keys(this._modules)[i]];
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

    const moduleObj = this._modules[data.module.idx];
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
    Object.keys(this._modules).forEach((moduleName, i) => {
      const moduleObj = this._modules[moduleName];
      listItems.push(`${i + 1}.${moduleObj.id}`);
    });

    const $title = __blessed.box({
      top: -2,
      left: 0,
      height: 1,
      content: __parseHtml(
        `<bgYellow><black> Sugar </black></bgYellow><bgCyan> 2.0.0 </bgCyan>`
      )
    });

    const $list = __blessed.list({
      top: 1,
      left: 0,
      bottom: 1,
      width: '20%',
      mouse: true,
      keys: true,
      items: listItems,
      padding: {
        top: 3,
        left: 1,
        right: 2,
        bottom: 1
      },
      style: {
        selected: {
          fg: 'yellow'
        }
      }
    });

    $list.append($title);

    $list.on('select', (item) => {
      const id = item.content.split('.').pop();
      const moduleObj = this._findModuleObj(id);
      this._showModule(moduleObj.id);
    });

    setInterval(() => {
      this._updateModulesList();
    }, 100);

    return $list;
  }

  _updateModulesList() {
    Object.keys(this._modules).forEach((moduleName, i) => {
      let prefix = '',
        bg,
        fg;

      const moduleObj = this._modules[moduleName];
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
      }${moduleObj.id}`;

      this.$list.children[i].setContent(__parseHtml(moduleString));
    });
  }

  _initContainer() {
    const $container = new __SBlessedComponent({
      attach: true,
      blessed: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        style: {}
      }
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

  _initStdio() {
    const $stdio = new __SBlessedComponent({
      blessed: {
        top: 1,
        bottom: 1,
        left: '20%+1',
        width: '80%',
        padding: {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        },
        style: {}
      }
    });
    return $stdio;
  }

  _initTopBar() {
    const $topBar = new __SBlessedComponent({
      blessed: {
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        style: {
          bg: 'yellow',
          fg: 'black'
        }
      }
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
    const $bar = new __SBlessedComponent({
      blessed: {
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
        style: {
          bg: 'yellow'
        }
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
   * @param         {Object}        params       An object of initial params used to launch the sugar ui
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _initSummary(params: any) {
    let currentOut;
    const summaryBlessedStdio = new __SBlessedStdio([], {
      stdio: {
        filter: (value, metas) => {
          if (value && value.type === 'separator') return false;
          if (value && value.type === 'time') return false;
          return true;
        },
        processor: (value, metas) => {
          value = __clone(value, { deep: true });

          const id = metas.path.split('.').pop();
          if (id !== currentOut && value && value.value) {
            value.value =
              '<yellow>_</yellow>\n' +
              [`<bgYellow> <black>${id}</black> </bgYellow>`, value.value].join(
                '\n'
              );
            currentOut = id;
          }
          if (value && value.clear) delete value.clear;
          return [value, metas];
        }
      },
      blessed: {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }
    });
    this._summaryStdio = summaryBlessedStdio;
    return summaryBlessedStdio.$container;
  }

  /**
   * @name              _initWelcome
   * @type              Function
   * @private
   *
   * This method init the welcome screen
   *
   * @param         {Object}        params       An object of initial params used to launch the sugar ui
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _initWelcome(params: any) {
    const $container = new __SBlessedComponent({
      blessed: {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        style: {}
      }
    });

    const $centeredBox = new __SBlessedComponent({
      blessed: {
        top: '50%-9',
        left: 'center',
        width: '100%',
        height: 'shrink',
        style: {}
      }
    });

    const logoString = __sugarHeading({
      borders: false
    });
    const $logo = new __SBlessedComponent({
      blessed: {
        width: 'shrink',
        height: 8,
        top: 0,
        left: 'center',
        style: {},
        content: logoString
      }
    });

    const $metasBox = new __SBlessedComponent({
      blessed: {
        width: 50,
        height: 8,
        top: logoString.split('\n').length,
        left: 'center',
        tags: true,
        style: {
          // bg: 'red'
        }
      }
    });

    const spinner = __ora('Loading');

    const packageJson = __packageJson();

    const projectLine = `<bgWhite><black> ${packageJson.license} </black></bgWhite> <yellow>${packageJson.name}</yellow> <cyan>${packageJson.version}</cyan>`;
    const projectLineWidth = __countLine(projectLine);
    const byLine = `By ${packageJson.author.split(/<|\(/)[0]}`;
    const byLineSpaces = Math.round(
      (__countLine(projectLine) - __countLine(byLine)) / 2
    );

    const projectLines = [
      `<yellow>${'-'.repeat(__countLine(projectLine) + 6)}</yellow>`,
      `<yellow>|</yellow>  ${projectLine}  <yellow>|</yellow>`,
      `<yellow>|</yellow>  ${' '.repeat(byLineSpaces)} ${byLine} ${' '.repeat(
        byLineSpaces
      )}<yellow>|</yellow>`,
      `<yellow>${'-'.repeat(__countLine(projectLine) + 6)}</yellow>`
    ].map((line) => `{center}${__parseHtml(line)}{/center}`);

    const quote = __quotes.getRandomQuote();

    const updateContent = () => {
      let text = [...projectLines, '', spinner.frame()];

      if (projectLineWidth < 60) {
        $metasBox.width = 60;
      } else {
        $metasBox.width = projectLineWidth;
      }

      if (this._modulesReady) {
        text = [...projectLines, '', `{center}${quote}{/center}`];
      }

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
   * @name             _initModule
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
  _initModule(moduleIdOrName) {
    const module = this._findModuleObj(moduleIdOrName);
    if (!module || !module.$stdio) return;
    module.$stdio.hide();
    this.$stdio.append(module.$stdio);
    return module.$stdio;

    // console.log(moduleObj.instance.stdios);

    // if (moduleObj.presets) {
    //   if (!moduleObj.presets.default)
    //     moduleObj.presets.default = {
    //       key: 'd',
    //       ...(moduleObj.params || {})
    //     };
    // }

    // if (!moduleObj.$stdio && moduleObj.instance) {
    //   moduleObj.instance.on('stdio.terminal:1', (stdio, metas) => {
    //     moduleObj.$stdio = stdio;
    //     moduleObj.$stdio.top = 0;
    //     moduleObj.$stdio.left = 1;
    //     moduleObj.$stdio.width = '100%-2';
    //     moduleObj.$stdio.height =
    //       moduleObj.presets !== undefined ? '100%-1' : '100%';
    //     moduleObj.$stdio.padding = {
    //       top: 1,
    //       left: 2,
    //       right: 2,
    //       bottom: 0
    //     };
    //     moduleObj.$stdioContainer.append(moduleObj.$stdio);
    //   });
    // }

    // if (moduleObj.$stdioContainer === undefined) {
    //   const $stdioContainer = __blessed.box({
    //     width: '100%',
    //     height: '100%',
    //     top: 0,
    //     left: 0,
    //     right: 0,
    //     bottom: 0,
    //     style: {}
    //   });
    //   moduleObj.$stdioContainer = $stdioContainer;
    // }

    // if (moduleObj.$bottomBar === undefined) {
    //   const $bottomBar = __blessed.box({
    //     width: '100%',
    //     height: 1,
    //     bottom: 0,
    //     left: 1,
    //     right: 0,
    //     style: {
    //       bg: 'yellow'
    //     }
    //   });
    //   moduleObj.$bottomBar = $bottomBar;
    // }

    // if (moduleObj.presets && Object.keys(moduleObj.presets).length) {
    //   Object.keys(moduleObj.presets).forEach((presetId, i) => {
    //     const presetObj = moduleObj.presets[presetId];

    //     let left = 0;
    //     moduleObj.$bottomBar.children.forEach(($child) => {
    //       left += __countLine($child.content);
    //     });

    //     const $preset = __blessed.box({
    //       content: ` (${presetObj.key || i}) ${presetId} `,
    //       height: 1,
    //       left,
    //       width: 'shrink',
    //       style: {
    //         fg: 'black',
    //         bg: 'blue'
    //       }
    //     });

    //     __hotkey(`ctrl+${presetObj.key}`).on('press', () => {
    //       if (this._displayedModuleId !== moduleObj.id) return;
    //       // emit a new event
    //       moduleObj.instance.emit('preset', {
    //         ...presetObj
    //       });
    //     });

    //     moduleObj.$bottomBar.append($preset);
    //   });
    // }

    // if (moduleObj.$stdio) {
    //   moduleObj.$stdioContainer.append(moduleObj.$stdio);
    //   moduleObj.$stdio.top = 0;
    //   moduleObj.$stdio.left = 1;
    //   moduleObj.$stdio.width = '100%';
    //   moduleObj.$stdio.height =
    //     moduleObj.presets !== undefined ? '100%-1' : '100%';

    //   moduleObj.$stdio.padding = {
    //     top: 1,
    //     left: 2,
    //     right: 2,
    //     bottom: 0
    //   };
    // }
    // if (moduleObj.presets !== undefined) {
    //   moduleObj.$stdioContainer.append(moduleObj.$bottomBar);
    // }
    // // $in.append(moduleObj.$stdioContainer);
    // moduleObj.$stdioContainer.hide();
  }
}
