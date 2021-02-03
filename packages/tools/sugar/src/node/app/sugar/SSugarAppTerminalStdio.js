"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SBlessedComponent_1 = __importDefault(require("../../blessed/SBlessedComponent"));
const sugarHeading_1 = __importDefault(require("../../ascii/sugarHeading"));
const blessed_1 = __importDefault(require("blessed"));
const parseHtml_1 = __importDefault(require("../../console/parseHtml"));
const countLine_1 = __importDefault(require("../../string/countLine"));
const SBlessedStdio_1 = __importDefault(require("../../stdio/blessed/SBlessedStdio"));
const hotkey_1 = __importDefault(require("../../keyboard/hotkey"));
const json_1 = __importDefault(require("../../package/json"));
const SNotification_1 = __importDefault(require("../../blessed/notification/SNotification"));
const ora_1 = __importDefault(require("ora"));
const SStdio_1 = __importDefault(require("../../stdio/SStdio"));
const inspirational_quotes_1 = __importDefault(require("inspirational-quotes"));
// import __SIpc from '../../ipc/SIpc';
/**
 * @name                SSugarAppTerminalStdio
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
class SSugarAppTerminalStdio extends SStdio_1.default {
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
    constructor(sources, settings = {}) {
        super(sources, deepMerge_1.default({
            sugarAppTerminalStdio: {}
        }, settings));
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
        this._shortcutsCallbackByModule = {};
        this._displayedModuleId = 'welcome';
        this._handlerProcess = this.sources[0];
        // this._appSettings = this._handlerProcess._settings.app;
        // this._processSettings = this._handlerProcess._settings;
        // this._params = Object.assign({}, this._processSettings.initialParams || {});
        const $welcome = this._initWelcome(this._handlerProcess.initialParams);
        const $summary = this._initSummary(this._handlerProcess.initialParams);
        this._modules = Object.assign({ welcome: {
                id: 'welcome',
                name: 'Welcome',
                state: 'ready',
                $stdio: $welcome
            } }, this._handlerProcess.loadedModules);
        nativeConsole.log(this._modules);
        // this._serverSettings = this._modules[
        //   this._appSettings.welcome.serverModule
        // ];
        this.$container = this._initContainer();
        this.$stdio = this._initStdio();
        this.$topBar = this._initTopBar();
        this.$separator = this._initSeparator();
        this.$bottomBar = this._initBottomBar();
        this.$list = this._initModulesList();
        Object.keys(this._modules).forEach((moduleName, i) => {
            const moduleObj = this._modules[moduleName];
            this._initModule(moduleName);
            // $summary.registerSource(moduleObj.instance);
        });
        // show the welcome screen
        // and listen for escape key to display welcome
        this._showModule('welcome');
        hotkey_1.default('escape').on('press', () => {
            this.$list.focus();
            this._showModule('welcome');
        });
        // set focus to list
        this.$list.focus();
        Object.keys(this._modules).forEach((moduleName, i) => {
            const moduleObj = this._modules[moduleName];
            hotkey_1.default(`${i + 1}`).on('press', () => {
                if (!this._modulesReady)
                    return;
                this._showModule(moduleObj.id);
                this.$list.focus();
            });
        });
        // listen app
        this._modulesReady = false;
        this._handlerProcess.on('state', (state) => {
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
        if (!this._displayedModuleId)
            return undefined;
        const moduleObj = this._findModuleObjById(this._displayedModuleId);
        if (!moduleObj.$stdioContainer.parent)
            return undefined;
        return moduleObj;
    }
    _showModule(moduleIdOrName) {
        let module = this._findModuleObj(moduleIdOrName);
        if (!module || !module.$stdio)
            return;
        // this._displayedModuleId = module.id;
        Object.keys(this._modules).forEach((moduleId, i) => {
            const mod = this._modules[moduleId];
            console.log('D', mod.id, module.id);
            if (mod.id === module.id) {
                module.activate && module.activate();
                this.$list.select(i);
            }
            else {
                module.unactivate && module.unactivate();
            }
        });
        this.$stdio.children.forEach(($child) => {
            $child.hide();
        });
        module.$stdio.show();
    }
    _findModuleObj(idOrName) {
        let moduleObj = this._findModuleObjById(idOrName);
        if (!moduleObj)
            moduleObj = this._findModuleObjByName(idOrName);
        return moduleObj;
    }
    _findModuleObjById(id) {
        for (let i = 0; i < Object.keys(this._modules).length; i++) {
            const moduleObj = this._modules[Object.keys(this._modules)[i]];
            if (moduleObj.id === id)
                return moduleObj;
        }
        return false;
    }
    _findModuleObjByName(name) {
        for (let i = 0; i < Object.keys(this._modules).length; i++) {
            const moduleObj = this._modules[Object.keys(this._modules)[i]];
            if (moduleObj.name === name)
                return moduleObj;
        }
        return false;
    }
    _moduleError(data, metas) {
        return;
        const moduleObj = this._findModuleObjById(data.module.id);
        if (!moduleObj)
            return;
        let msg = data.value;
        if (msg.length > 36)
            msg = msg.slice(0, 33) + '...';
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
    _moduleNotification(data, metas) {
        const moduleObj = this._findModuleObjById(data.module.id);
        if (!moduleObj)
            return;
        return;
        let msg = data.value;
        if (msg.length > 36)
            msg = msg.slice(0, 33) + '...';
        const $notification = new SNotification_1.default(data.module.name || data.module.id, msg, {
            onClick: () => {
                this._showModule(moduleObj.id);
            },
            blessed: {
                bg: data.type === 'success'
                    ? 'green'
                    : data.type === 'warn'
                        ? 'yellow'
                        : 'red',
                hover: {
                    bg: 'blue'
                }
            }
        });
        this.append($notification);
    }
    // _moduleStart(value, metas) {
    //   const moduleObj = this._modules[value.module.idx];
    //   if (!moduleObj.spinner) moduleObj.spinner = __ora();
    //   if (!moduleObj) return;
    //   moduleObj.state = value.value;
    // }
    _moduleSuccess(data, metas) {
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
        if (this._getDisplayedModuleObj().id === moduleObj.id)
            return;
        let msg = data.value || 'Process finished successfully';
        if (msg.length > 36)
            msg = msg.slice(0, 33) + '...';
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
    _moduleState(data, metas) {
        return;
        const moduleObj = this._modules[data.module.idx];
        if (!moduleObj)
            return;
        clearTimeout(moduleObj._stateTimeout);
        moduleObj._stateTimeout = setTimeout(() => {
            delete moduleObj._stateTimeout;
        }, 2000);
        moduleObj.state = data.value;
    }
    _moduleStart(data, metas) {
        return;
        const moduleObj = this._findModuleObjById(data.module.id);
        if (moduleObj && moduleObj.$status) {
            clearTimeout(moduleObj.statusTimeout);
            moduleObj.$status.style.bg = 'cyan';
            this.update();
        }
        if (this._getDisplayedModuleObj().id === moduleObj.id)
            return;
        let msg = data.value || 'Process starting...';
        if (msg.length > 36)
            msg = msg.slice(0, 33) + '...';
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
        const $title = blessed_1.default.box({
            top: -2,
            left: 0,
            height: 1,
            content: parseHtml_1.default(`<bgYellow><black> Sugar </black></bgYellow><bgCyan> 2.0.0 </bgCyan>`)
        });
        const $list = blessed_1.default.list({
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
            let prefix = '', bg, fg;
            const moduleObj = this._modules[moduleName];
            if (!moduleObj.spinner)
                moduleObj.spinner = ora_1.default();
            switch (moduleObj.state) {
                case 'success':
                case 'complete':
                    if (moduleObj._stateTimeout)
                        prefix = '✓';
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
                    if (moduleObj._stateTimeout)
                        prefix = '✖';
                    bg = 'red';
                    fg = 'red';
                    break;
                case 'ready':
                    if (moduleObj._stateTimeout)
                        prefix = '✓';
                    bg = 'black';
                    fg = 'green';
                    break;
                default:
                    prefix = '';
                    bg = 'yellow';
                    fg = 'black';
                    break;
            }
            const moduleString = `${i + 1}.<${fg}>${prefix}</${fg}>${prefix !== '' ? '.' : ''}${moduleObj.id}`;
            this.$list.children[i].setContent(parseHtml_1.default(moduleString));
        });
    }
    _initContainer() {
        const $container = new SBlessedComponent_1.default({
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
        const $separator = blessed_1.default.box({
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
        const $stdio = new SBlessedComponent_1.default({
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
        const $topBar = new SBlessedComponent_1.default({
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
        const $bar = new SBlessedComponent_1.default({
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
     * @param         {Object}        params       An object of initial params used to launch the sugar ui
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _initSummary(params) {
        const blessedStdio = new SBlessedStdio_1.default([], {
            blessed: {
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
            }
        });
        return blessedStdio.$container;
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
    _initWelcome(params) {
        const $container = new SBlessedComponent_1.default({
            blessed: {
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                style: {}
            }
        });
        const $centeredBox = new SBlessedComponent_1.default({
            blessed: {
                top: '50%-9',
                left: 'center',
                width: '100%',
                height: 'shrink',
                style: {}
            }
        });
        const logoString = sugarHeading_1.default({
            borders: false
        });
        const $logo = new SBlessedComponent_1.default({
            blessed: {
                width: 'shrink',
                height: 8,
                top: 0,
                left: 'center',
                style: {},
                content: logoString
            }
        });
        const $metasBox = new SBlessedComponent_1.default({
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
        const spinner = ora_1.default('Loading');
        const packageJson = json_1.default();
        const projectLine = `<bgWhite><black> ${packageJson.license} </black></bgWhite> <yellow>${packageJson.name}</yellow> <cyan>${packageJson.version}</cyan>`;
        const projectLineWidth = countLine_1.default(projectLine);
        const byLine = `By ${packageJson.author.split(/<|\(/)[0]}`;
        const byLineSpaces = Math.round((countLine_1.default(projectLine) - countLine_1.default(byLine)) / 2);
        const projectLines = [
            `<yellow>${'-'.repeat(countLine_1.default(projectLine) + 6)}</yellow>`,
            `<yellow>|</yellow>  ${projectLine}  <yellow>|</yellow>`,
            `<yellow>|</yellow>  ${' '.repeat(byLineSpaces)} ${byLine} ${' '.repeat(byLineSpaces)}<yellow>|</yellow>`,
            `<yellow>${'-'.repeat(countLine_1.default(projectLine) + 6)}</yellow>`
        ].map((line) => `{center}${parseHtml_1.default(line)}{/center}`);
        const quote = inspirational_quotes_1.default.getRandomQuote();
        const updateContent = () => {
            let text = [...projectLines, '', spinner.frame()];
            if (projectLineWidth < 60) {
                $metasBox.width = 60;
            }
            else {
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
        let module = this._findModuleObj(moduleIdOrName);
        if (!module || !module.$stdio)
            return;
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
exports.default = SSugarAppTerminalStdio;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwVGVybWluYWxTdGRpby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdWdhckFwcFRlcm1pbmFsU3RkaW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSx1RUFBaUQ7QUFDakQsd0ZBQWtFO0FBQ2xFLDRFQUFzRDtBQUV0RCxzREFBZ0M7QUFDaEMsd0VBQWtEO0FBQ2xELHVFQUFpRDtBQUNqRCxzRkFBZ0U7QUFFaEUsbUVBQTZDO0FBQzdDLDhEQUErQztBQUMvQyw2RkFBdUU7QUFDdkUsOENBQXdCO0FBR3hCLGdFQUEwQztBQUMxQyxnRkFBNEM7QUFDNUMsdUNBQXVDO0FBRXZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFxQixzQkFBdUIsU0FBUSxnQkFBUTtJQThCMUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxPQUFZLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDckMsS0FBSyxDQUNILE9BQU8sRUFDUCxtQkFBVyxDQUNUO1lBQ0UscUJBQXFCLEVBQUUsRUFBRTtTQUMxQixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFoREo7Ozs7Ozs7Ozs7Ozs7O1dBY0c7UUFDSCwrQkFBMEIsR0FBRyxFQUFFLENBQUM7UUFtQzlCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxTQUFTLENBQUM7UUFDcEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXZDLDBEQUEwRDtRQUMxRCwwREFBMEQ7UUFDMUQsK0VBQStFO1FBQy9FLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2RSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLFFBQVEsbUJBQ1gsT0FBTyxFQUFFO2dCQUNQ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