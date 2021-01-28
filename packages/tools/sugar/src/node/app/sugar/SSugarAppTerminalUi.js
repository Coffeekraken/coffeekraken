"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwVGVybWluYWxVaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdWdhckFwcFRlcm1pbmFsVWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSx3RkFBa0U7QUFDbEUsNEVBQXNEO0FBRXRELHNEQUFnQztBQUNoQyx3RUFBa0Q7QUFDbEQsdUVBQWlEO0FBQ2pELHNGQUFnRTtBQUVoRSxtRUFBNkM7QUFDN0MsOERBQStDO0FBQy9DLDZGQUF1RTtBQUN2RSw4Q0FBd0I7QUFHeEIsdUNBQXVDO0FBRXZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFxQixtQkFBb0IsU0FBUSwyQkFBbUI7SUFrQmxFOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksT0FBWSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQ3JDLEtBQUssQ0FBQztZQUNKLE1BQU0sRUFBRSxJQUFJO1NBQ2IsQ0FBQyxDQUFDO1FBOUJMOzs7Ozs7Ozs7Ozs7OztXQWNHO1FBQ0gsK0JBQTBCLEdBQUcsRUFBRSxDQUFDO1FBaUI5QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDO1FBRXBDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUFFLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztRQUN4RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQztRQUN4RCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3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