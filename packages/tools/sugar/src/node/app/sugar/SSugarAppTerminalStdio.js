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
const SStdio_1 = __importDefault(require("../../stdio/SStdio"));
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
        super(sources, __deepMerge({
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
        this._handlerInstance = this.sources[0];
        // this._appSettings = this._handlerInstance._settings.app;
        // this._processSettings = this._handlerInstance._settings;
        // this._params = Object.assign({}, this._processSettings.initialParams || {});
        // const $welcome = this._initWelcome(this._params);
        // const $summary = this._initSummary(this._params);
        // this._modulesObjs = {
        //   welcome: {
        //     id: 'welcome',
        //     name: 'Welcome',
        //     state: 'ready',
        //     $content: $welcome
        //   },
        //   summary: {
        //     id: 'summary',
        //     name: 'Summary',
        //     state: 'ready',
        //     $content: $summary
        //   },
        //   ...this._handlerInstance.modulesObjs
        // };
        // Object.keys(this._modulesObjs).forEach((moduleName, i) => {
        //   const moduleObj = this._modulesObjs[moduleName];
        //   if (moduleObj.instance === undefined) return;
        //   $summary.registerSource(moduleObj.instance);
        // });
        // this._serverSettings = this._modulesObjs[
        //   this._appSettings.welcome.serverModule
        // ];
        // this.$container = this._initContainer();
        // this.$content = this._initContent();
        // this.$topBar = this._initTopBar();
        // this.$separator = this._initSeparator();
        // this.$bottomBar = this._initBottomBar();
        // this.$list = this._initModulesList();
        // this._initModules(this.$content);
        // // show the welcome screen
        // this._showModule('welcome');
        // // set focus to list
        // this.$list.focus();
        // __hotkey('escape').on('press', () => {
        //   this._showModule('welcome');
        // });
        // Object.keys(this._modulesObjs).forEach((moduleName, i) => {
        //   const moduleObj = this._modulesObjs[moduleName];
        //   __hotkey(`${i + 1}`).on('press', () => {
        //     if (!this._modulesReady) return;
        //     this._showModule(moduleObj.id);
        //     this.$list.focus();
        //   });
        // });
        // // listen app
        // this._modulesReady = false;
        // this._handlerInstance.on('state', (state: any) => {
        //   if (state === 'ready') {
        //     this._modulesReady = true;
        //   }
        // });
        // // listen modules
        // this._handlerInstance.on('*.state', (state: any, metas: any) => {
        //   this._moduleState(state, metas);
        // });
        // this._handlerInstance.on(
        //   '*.notification',
        //   (notificationObj: any, metas: any) => {
        //     this._moduleNotification(notificationObj);
        //   }
        // );
        // this._handlerInstance.on('*.start', (data: any, metas: any) => {
        //   this._moduleStart(data, metas);
        // });
        // this._handlerInstance.on('*.success', (data: any, metas: any) => {
        //   this._moduleSuccess(data, metas);
        // });
        // this._handlerInstance.on('*.error', (data: any, metas: any) => {
        //   if (metas.stack === 'state.error') return;
        //   this._moduleError(data, metas);
        // });
        // this.$container.append(this.$topBar);
        // this.$container.append(this.$bottomBar);
        // this.$container.append(this.$list);
        // this.$container.append(this.$content);
        // this.$container.append(this.$separator);
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
    _initContent() {
        const $content = new SBlessedComponent_1.default({
            blessed: {
                left: '20%',
                width: '80%',
                height: '100%',
                padding: {
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                }
            }
        });
        return $content;
    }
    _initTopBar() {
        const $topBar = new SBlessedComponent_1.default({
            blessed: {
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
                top: '50%-11',
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
                width: 'shrink',
                height: 'shrink',
                top: logoString.split('\n').length,
                left: 'center',
                style: {}
            }
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
exports.default = SSugarAppTerminalStdio;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwVGVybWluYWxTdGRpby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdWdhckFwcFRlcm1pbmFsU3RkaW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSx3RkFBa0U7QUFDbEUsNEVBQXNEO0FBRXRELHNEQUFnQztBQUNoQyx3RUFBa0Q7QUFDbEQsdUVBQWlEO0FBQ2pELHNGQUFnRTtBQUVoRSxtRUFBNkM7QUFDN0MsOERBQStDO0FBQy9DLDZGQUF1RTtBQUN2RSw4Q0FBd0I7QUFHeEIsZ0VBQTBDO0FBQzFDLHVDQUF1QztBQUV2Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBcUIsc0JBQXVCLFNBQVEsZ0JBQVE7SUFrQjFEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksT0FBWSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQ3JDLEtBQUssQ0FDSCxPQUFPLEVBQ1AsV0FBVyxDQUNUO1lBQ0UscUJBQXFCLEVBQUUsRUFBRTtTQUMxQixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFwQ0o7Ozs7Ozs7Ozs7Ozs7O1dBY0c7UUFDSCwrQkFBMEIsR0FBRyxFQUFFLENBQUM7UUF1QjlCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxTQUFTLENBQUM7UUFDcEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFeEMsMkRBQTJEO1FBQzNELDJEQUEyRDtRQUMzRCwrRUFBK0U7UUFDL0Usb0RBQW9EO1FBQ3BELG9EQUFvRDtRQUNwRCx3QkFBd0I7UUFDeEIsZUFBZTtRQUNmLHFCQUFxQjtRQUNyQix1QkFBdUI7UUFDdkIsc0JBQXNCO1FBQ3RCLHlCQUF5QjtRQUN6QixPQUFPO1FBQ1AsZUFBZTtRQUNmLHFCQUFxQjtRQUNyQix1QkFBdUI7UUFDdkIsc0JBQXNCO1FBQ3RCLHlCQUF5QjtRQUN6QixPQUFPO1FBQ1AseUNBQXlDO1FBQ3pDLEtBQUs7UUFFTCw4REFBOEQ7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