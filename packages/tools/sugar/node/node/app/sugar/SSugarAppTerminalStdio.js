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
const SNotification_1 = __importDefault(require("../../notification/SNotification"));
const ora_1 = __importDefault(require("ora"));
const clone_1 = __importDefault(require("../../object/clone"));
const SStdio_1 = __importDefault(require("../../stdio/SStdio"));
const inspirational_quotes_1 = __importDefault(require("inspirational-quotes"));
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
            }, summary: {
                id: 'summary',
                name: 'Summary',
                state: 'ready',
                $stdio: $summary
            } }, this._handlerProcess.loadedModules);
        this._notifier = new SNotification_1.default({
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
        Object.keys(this._modules).forEach((moduleId, i) => {
            const mod = this._modules[moduleId];
            if (mod.id === module.id) {
                module.activate && module.activate();
                this.$list.select(i);
            }
            else {
                mod.unactivate && mod.unactivate();
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
        let currentOut;
        const summaryBlessedStdio = new SBlessedStdio_1.default([], {
            stdio: {
                filter: (value, metas) => {
                    if (value && value.type === 'separator')
                        return false;
                    if (value && value.type === 'time')
                        return false;
                    return true;
                },
                processor: (value, metas) => {
                    value = clone_1.default(value, { deep: true });
                    const id = metas.path.split('.').pop();
                    if (id !== currentOut && value && value.value) {
                        value.value =
                            '<yellow>_</yellow>\n' +
                                [`<bgYellow> <black>${id}</black> </bgYellow>`, value.value].join('\n');
                        currentOut = id;
                    }
                    if (value && value.clear)
                        delete value.clear;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwVGVybWluYWxTdGRpby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ub2RlL2FwcC9zdWdhci9TU3VnYXJBcHBUZXJtaW5hbFN0ZGlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsdUVBQWlEO0FBQ2pELHdGQUFrRTtBQUNsRSw0RUFBc0Q7QUFFdEQsc0RBQWdDO0FBQ2hDLHdFQUFrRDtBQUNsRCx1RUFBaUQ7QUFDakQsc0ZBQWdFO0FBRWhFLG1FQUE2QztBQUM3Qyw4REFBK0M7QUFDL0MscUZBQStEO0FBQy9ELDhDQUF3QjtBQUN4QiwrREFBeUM7QUFFekMsZ0VBQTBDO0FBQzFDLGdGQUE0QztBQUM1Qyx1Q0FBdUM7QUFFdkM7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQXFCLHNCQUF1QixTQUFRLGdCQUFRO0lBOEIxRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLE9BQVksRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUNyQyxLQUFLLENBQ0gsT0FBTyxFQUNQLG1CQUFXLENBQ1Q7WUFDRSxxQkFBcUIsRUFBRSxFQUFFO1NBQzFCLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQWhESjs7Ozs7Ozs7Ozs7Ozs7V0FjRztRQUNILCtCQUEwQixHQUFHLEVBQUUsQ0FBQztRQW1DOUIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFNBQVMsQ0FBQztRQUNwQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdkMsMERBQTBEO1FBQzFELDBEQUEwRDtRQUMxRCwrRUFBK0U7UUFDL0UsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZFLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FB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