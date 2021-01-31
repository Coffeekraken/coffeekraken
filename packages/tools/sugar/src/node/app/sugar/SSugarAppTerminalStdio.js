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
            if (mod.id === module.id) {
                // module.activate();
                this.$list.select(i);
            }
            else {
                // module.unactivate();
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