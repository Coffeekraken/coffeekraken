"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const SBlessedComponent_1 = __importDefault(require("../../blessed/SBlessedComponent"));
const sugarHeading_1 = __importDefault(require("../../ascii/sugarHeading"));
const sugar_1 = __importDefault(require("../../config/sugar"));
const blessed_1 = __importDefault(require("blessed"));
const parseHtml_1 = __importDefault(require("../../terminal/parseHtml"));
const countLine_1 = __importDefault(require("../../string/countLine"));
const SBlessedOutput_1 = __importDefault(require("../../blessed/output/SBlessedOutput"));
const hotkey_1 = __importDefault(require("../../keyboard/hotkey"));
const json_1 = __importDefault(require("../../package/json"));
const SNotification_1 = __importDefault(require("../../blessed/notification/SNotification"));
const ora_1 = __importDefault(require("ora"));
const clone_1 = __importDefault(require("../../object/clone"));
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
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
    constructor(source, params = {}) {
        super({
            screen: true
        });
        this._sources = Array.isArray(source) ? source : [source];
        this._params = Object.assign({}, params);
        this._settings = sugar_1.default('sugar-app');
        this._serverSettings = this._params.modules[this._settings.welcome.serverModule];
        this.$container = this._initContainer();
        this.$content = this._initContent();
        this.$topBar = this._initTopBar();
        this.$separator = this._initSeparator();
        // init the "welcome" module
        const $welcome = this._initWelcome(params);
        this.$content.append($welcome);
        this._modules = {
            welcome: {
                id: 'welcome',
                name: 'Welcome',
                state: 'ready',
                $content: $welcome
            }
        };
        Object.keys(this._settings.modules).forEach((moduleId) => {
            const moduleObj = clone_1.default(this._settings.modules[moduleId], {
                deep: true
            });
            this._modules[moduleId] = moduleObj;
        });
        this.$bottomBar = this._initBottomBar();
        this.$list = this._initModulesList();
        this._initModulesContent(this.$content);
        // set focus to list
        this.$list.focus();
        hotkey_1.default('escape').on('press', () => {
            this._showModule('welcome');
            this.$list.select(0);
        });
        Object.keys(this._modules).forEach((moduleName, i) => {
            const moduleObj = this._modules[moduleName];
            hotkey_1.default(`${i + 1}`).on('press', () => {
                if (!this._modulesReady)
                    return;
                this._showModule(moduleObj.id);
                this.$list.select(i);
                this.$list.focus();
                // __SIpc.trigger('sugar.ui.displayedModule', moduleObj.id);
            });
        });
        // listen app
        this._modulesReady = false;
        source.on('state', (state) => {
            if (state === 'ready') {
                this._modulesReady = true;
            }
        });
        // listen modules
        source.on('*.state', (state, metas) => {
            this._moduleState(state, metas);
        });
        source.on('*.log', (data, metas) => {
            this._moduleLog(data, metas);
        });
        source.on('*.start', (data, metas) => {
            this._moduleStart(data, metas);
        });
        source.on('*.success', (data, metas) => {
            this._moduleSuccess(data, metas);
        });
        source.on('*.error', (data, metas) => {
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
            return {};
        if (!this.$consoles.parent)
            return {};
        return this._findModuleObjById(this._displayedModuleId);
    }
    _showModule(moduleIdOrName) {
        let moduleObj = this._findModuleObjById(moduleIdOrName);
        if (!moduleObj)
            moduleObj = this._findModuleObjByName(moduleIdOrName);
        if (!moduleObj || !moduleObj.$content)
            return;
        this._displayedModuleId = moduleObj.id;
        this.$content.children.forEach(($child) => {
            $child.hide();
        });
        moduleObj.$content.show();
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
    /**
     * @name          _log
     * @type          Function
     * @private
     *
     * This function log the passed SPromise arguments in the correct module
     *
     * @since       2.0.0
     */
    _moduleLog(data, metas) {
        const moduleObj = this._findModuleObjById(data.module.id);
        if (!moduleObj || !moduleObj.$console)
            return;
        // moduleObj.$console.log(data);
    }
    _moduleError(data, metas) {
        if (this.$consoles.parent)
            return;
        const moduleObj = this._findModuleObjById(data.module.id);
        if (moduleObj && moduleObj.$status) {
            clearTimeout(moduleObj.statusTimeout);
            moduleObj.$status.style.bg = 'red';
            this.update();
        }
        if (this._getDisplayedModuleObj().id === moduleObj.id)
            return;
        let msg = data.value;
        if (msg.length > 36)
            msg = msg.slice(0, 33) + '...';
        const $errorNotification = new SNotification_1.default(data.module.name || data.module.id, msg, {
            bg: 'red',
            onClick: () => {
                this._showModule(moduleObj.id);
            }
        });
        this.append($errorNotification);
    }
    // _moduleStart(value, metas) {
    //   const moduleObj = this._modules[value.module.idx];
    //   if (!moduleObj.spinner) moduleObj.spinner = __ora();
    //   if (!moduleObj) return;
    //   moduleObj.state = value.value;
    // }
    _moduleSuccess(data, metas) {
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
        const $successNotification = new SNotification_1.default(data.module.name || data.module.id, msg, {
            bg: 'green',
            onClick: () => {
                this._showModule(moduleObj.id);
            }
        });
        this.append($successNotification);
    }
    _moduleState(data, metas) {
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
        const $startNotification = new SNotification_1.default(data.module.name || data.module.id, msg, {
            bg: 'yellow',
            onClick: () => {
                this._showModule(moduleObj.id);
            }
        });
        this.append($startNotification);
    }
    _initModulesList() {
        const listItems = ['1.Welcome'];
        Object.keys(this._modules).forEach((moduleName, i) => {
            const moduleObj = this._modules[moduleName];
            listItems.push(`${i + 2}.${moduleObj.name}`);
        });
        for (let i = 3; i < 13; i++) {
            listItems.push(`${i}.Item`);
        }
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
            width: '80%-2',
            height: '100%-2',
            padding: {
                top: 1,
                left: 2,
                bottom: 1,
                right: 2
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
        const $centeredBox = blessed_1.default.box({
            top: '50%-9',
            left: 'center',
            width: '100%',
            height: 'shrink',
            style: {}
        });
        console.log(params);
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
        const updateContent = () => {
            let text = [...projectLines, '', spinner.frame()];
            if (this._modulesReady) {
                text = [
                    ...projectLines,
                    ``,
                    `WebUI <green>started</green> at`,
                    `<bgYellow><black> http://${this._serverSettings.hostname}:${this._serverSettings.port} </black></bgYellow>`,
                    '',
                    `<cyan>${Object.keys(params.modules).length}</cyan> module${Object.keys(params.modules).length > 1 ? 's' : ''} loaded`
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
        return $centeredBox;
    }
    /**
     * @name             _initModulesContent
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
    _initModulesContent($in) {
        Object.keys(this._modules).forEach((moduleName, i) => {
            const moduleObj = this._modules[moduleName];
            let OutputClass;
            if (moduleObj.ui) {
                const requirePath = path_1.default.relative(__dirname, moduleObj.ui);
                OutputClass = require(requirePath);
            }
            else {
                OutputClass = SBlessedOutput_1.default;
            }
            const pipedSources = new SPromise_1.default({});
            this._sources.forEach((source) => {
                SPromise_1.default.pipe(source, pipedSources, {
                    filter: (logObj, metas) => {
                        // console.log(logObj, moduleObj);
                        return logObj.module && logObj.module.id === moduleObj.id;
                    }
                });
            });
            const $content = new OutputClass(pipedSources, Object.assign({ blessed: {
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    style: {}
                } }, moduleObj));
            moduleObj.$content = $content;
            console.log(moduleObj.id);
            $in.append($content);
            $content.hide();
        });
    }
}
exports.default = SSugarAppTerminalUi;
//# sourceMappingURL=SSugarAppTerminalUi.js.map