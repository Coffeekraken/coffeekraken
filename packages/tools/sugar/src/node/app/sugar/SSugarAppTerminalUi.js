"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SBlessedComponent_1 = __importDefault(require("../../blessed/SBlessedComponent"));
const sugarHeading_1 = __importDefault(require("../../ascii/sugarHeading"));
const blessed_1 = __importDefault(require("blessed"));
const parseHtml_1 = __importDefault(require("../../console/parseHtml"));
const countLine_1 = __importDefault(require("../../string/countLine"));
const SBlessedStdio_1 = __importDefault(require("../../blessed/stdio/SBlessedStdio"));
const hotkey_1 = __importDefault(require("../../keyboard/hotkey"));
const json_1 = __importDefault(require("../../package/json"));
const SNotification_1 = __importDefault(require("../../blessed/notification/SNotification"));
const ora_1 = __importDefault(require("ora"));
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
class SSugarAppTerminalUi extends SBlessedComponent_1.default {
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
        super({
            screen: true
        });
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
        if (!Array.isArray(sources))
            sources = [sources];
        this._handlerInstance = sources[0];
        this._appSettings = this._handlerInstance._settings.app;
        this._processSettings = this._handlerInstance._settings;
        this._sources = Array.isArray(sources) ? sources : [sources];
        this._params = Object.assign({}, this._processSettings.initialParams || {});
        const $welcome = this._initWelcome(this._params);
        const $summary = this._initSummary(this._params);
        this._modulesObjs = Object.assign({ welcome: {
                id: 'welcome',
                name: 'Welcome',
                state: 'ready',
                $content: $welcome
            }, summary: {
                id: 'summary',
                name: 'Summary',
                state: 'ready',
                $content: $summary
            } }, this._handlerInstance.modulesObjs);
        Object.keys(this._modulesObjs).forEach((moduleName, i) => {
            const moduleObj = this._modulesObjs[moduleName];
            if (moduleObj.instance === undefined)
                return;
            $summary.registerSource(moduleObj.instance);
        });
        this._serverSettings = this._modulesObjs[this._appSettings.welcome.serverModule];
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
        hotkey_1.default('escape').on('press', () => {
            this._showModule('welcome');
        });
        Object.keys(this._modulesObjs).forEach((moduleName, i) => {
            const moduleObj = this._modulesObjs[moduleName];
            hotkey_1.default(`${i + 1}`).on('press', () => {
                if (!this._modulesReady)
                    return;
                this._showModule(moduleObj.id);
                this.$list.focus();
            });
        });
        // listen app
        this._modulesReady = false;
        this._handlerInstance.on('state', (state) => {
            if (state === 'ready') {
                this._modulesReady = true;
            }
        });
        // listen modules
        this._handlerInstance.on('*.state', (state, metas) => {
            this._moduleState(state, metas);
        });
        this._handlerInstance.on('*.notification', (notificationObj, metas) => {
            this._moduleNotification(notificationObj);
        });
        this._handlerInstance.on('*.start', (data, metas) => {
            this._moduleStart(data, metas);
        });
        this._handlerInstance.on('*.success', (data, metas) => {
            this._moduleSuccess(data, metas);
        });
        this._handlerInstance.on('*.error', (data, metas) => {
            if (metas.stack === 'state.error')
                return;
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
        if (!this._displayedModuleId)
            return undefined;
        const moduleObj = this._findModuleObjById(this._displayedModuleId);
        if (!moduleObj.$contentContainer.parent)
            return undefined;
        return moduleObj;
    }
    _showModule(moduleIdOrName) {
        let moduleObj = this._findModuleObjById(moduleIdOrName);
        if (!moduleObj)
            moduleObj = this._findModuleObjByName(moduleIdOrName);
        if (!moduleObj || !moduleObj.$contentContainer)
            return;
        this._displayedModuleId = moduleObj.id;
        Object.keys(this._modulesObjs).forEach((moduleId, i) => {
            const moduleObjToShowOrHide = this._modulesObjs[moduleId];
            if (moduleObjToShowOrHide.id === moduleObj.id) {
                if (moduleObjToShowOrHide.instance !== undefined)
                    moduleObjToShowOrHide.instance.activate();
                this.$list.select(i);
            }
            else {
                if (moduleObjToShowOrHide.instance !== undefined)
                    moduleObjToShowOrHide.instance.unactivate();
            }
        });
        this.$content.children.forEach(($child) => {
            $child.hide();
        });
        moduleObj.$contentContainer.show();
    }
    _findModuleObjById(id) {
        for (let i = 0; i < Object.keys(this._modulesObjs).length; i++) {
            const moduleObj = this._modulesObjs[Object.keys(this._modulesObjs)[i]];
            if (moduleObj.id === id)
                return moduleObj;
        }
        return false;
    }
    _findModuleObjByName(name) {
        for (let i = 0; i < Object.keys(this._modulesObjs).length; i++) {
            const moduleObj = this._modulesObjs[Object.keys(this._modulesObjs)[i]];
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
        const moduleObj = this._modulesObjs[data.module.idx];
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
        Object.keys(this._modulesObjs).forEach((moduleName, i) => {
            const moduleObj = this._modulesObjs[moduleName];
            listItems.push(`${i + 1}.${moduleObj.name}`);
        });
        const $list = blessed_1.default.list({
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
            let prefix = '', bg, fg;
            const moduleObj = this._modulesObjs[moduleName];
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
            const moduleString = `${i + 1}.<${fg}>${prefix}</${fg}>${prefix !== '' ? '.' : ''}${moduleObj.name}`;
            this.$list.children[i].setContent(parseHtml_1.default(moduleString));
        });
    }
    _initContainer() {
        const $container = blessed_1.default.box({
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
    _initContent() {
        const $content = blessed_1.default.box({
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
        const $topBar = blessed_1.default.box({
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
            content: parseHtml_1.default(`<bgBlack><white> MIT </white></bgBlack><bgWhite><black> Sugar </black></bgWhite> 2.0.0`)
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
        const $bar = blessed_1.default.box({
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
    _initSummary(params) {
        const $stdio = new SBlessedStdio_1.default([], {});
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
    _initWelcome(params) {
        const $container = blessed_1.default.box({
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            style: {}
        });
        const $centeredBox = blessed_1.default.box({
            top: '50%-11',
            left: 'center',
            width: '100%',
            height: 'shrink',
            style: {}
        });
        const logoString = sugarHeading_1.default({
            borders: false
        });
        const $logo = blessed_1.default.box({
            width: 'shrink',
            height: 8,
            top: 0,
            left: 'center',
            style: {},
            content: logoString
        });
        const $metasBox = blessed_1.default.box({
            width: 'shrink',
            height: 'shrink',
            top: logoString.split('\n').length,
            left: 'center',
            style: {}
        });
        const spinner = ora_1.default('Loading');
        const packageJson = json_1.default();
        const projectLine = `<bgWhite><black> ${packageJson.license} </black></bgWhite> <yellow>${packageJson.name}</yellow> <cyan>${packageJson.version}</cyan>`;
        const byLine = `By ${packageJson.author.split(/<|\(/)[0]}`;
        const byLineSpaces = Math.round((countLine_1.default(projectLine) - countLine_1.default(byLine)) / 2) - 1;
        const projectLines = [
            `<yellow>${'-'.repeat(countLine_1.default(projectLine) + 6)}</yellow>`,
            `<yellow>|</yellow>  ${projectLine}  <yellow>|</yellow>`,
            ` <yellow>|</yellow>  ${' '.repeat(byLineSpaces)} ${byLine} ${' '.repeat(byLineSpaces)} <yellow>|</yellow>`,
            `<yellow>${'-'.repeat(countLine_1.default(projectLine) + 6)}</yellow>`
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
                    `<cyan>${Object.keys(this._modulesObjs).length}</cyan> module${Object.keys(this._modulesObjs).length > 1 ? 's' : ''} loaded`
                ];
            }
            let larger = 0;
            text = text
                .map((t) => {
                t = parseHtml_1.default(t);
                const length = countLine_1.default(t);
                if (length > larger)
                    larger = length;
                return t;
            })
                .map((line) => {
                line =
                    ' '.repeat(Math.round((larger - countLine_1.default(line)) / 2)) + line;
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
                    moduleObj.presets.default = Object.assign({ key: 'd' }, (moduleObj.params || {}));
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
                const $contentContainer = blessed_1.default.box({
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
                const $bottomBar = blessed_1.default.box({
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
                        left += countLine_1.default($child.content);
                    });
                    const $preset = blessed_1.default.box({
                        content: ` (${presetObj.key || i}) ${presetId} `,
                        height: 1,
                        left,
                        width: 'shrink',
                        style: {
                            fg: 'black',
                            bg: 'blue'
                        }
                    });
                    hotkey_1.default(`ctrl+${presetObj.key}`).on('press', () => {
                        if (this._displayedModuleId !== moduleObj.id)
                            return;
                        // emit a new event
                        moduleObj.instance.emit('preset', Object.assign({}, presetObj));
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
exports.default = SSugarAppTerminalUi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwVGVybWluYWxVaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdWdhckFwcFRlcm1pbmFsVWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBSWQsd0ZBQWtFO0FBQ2xFLDRFQUFzRDtBQUV0RCxzREFBZ0M7QUFDaEMsd0VBQWtEO0FBQ2xELHVFQUFpRDtBQUNqRCxzRkFBZ0U7QUFFaEUsbUVBQTZDO0FBQzdDLDhEQUErQztBQUMvQyw2RkFBdUU7QUFDdkUsOENBQXdCO0FBR3hCLHVDQUF1QztBQUV2Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBcUIsbUJBQW9CLFNBQVEsMkJBQW1CO0lBa0JsRTs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLE9BQVksRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUNyQyxLQUFLLENBQUM7WUFDSixNQUFNLEVBQUUsSUFBSTtTQUNiLENBQUMsQ0FBQztRQTlCTDs7Ozs7Ozs7Ozs7Ozs7V0FjRztRQUNILCtCQUEwQixHQUFHLEVBQUUsQ0FBQztRQWlCOUIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFNBQVMsQ0FBQztRQUVwQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFBRSxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRW5DLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7UUFDeEQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7UUFDeEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFD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