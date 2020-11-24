"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const upperFirst_1 = __importDefault(require("../../string/upperFirst"));
const SBlessedComponent_1 = __importDefault(require("../../blessed/SBlessedComponent"));
const sugarHeading_1 = __importDefault(require("../../ascii/sugarHeading"));
const sugar_1 = __importDefault(require("../../config/sugar"));
const blessed_1 = __importDefault(require("blessed"));
const parseHtml_1 = __importDefault(require("../../terminal/parseHtml"));
const countLine_1 = __importDefault(require("../../string/countLine"));
const SBlessedOutput_1 = __importDefault(require("../../blessed/SBlessedOutput"));
const color_1 = __importDefault(require("../../color/color"));
const hotkey_1 = __importDefault(require("../../keyboard/hotkey"));
const json_1 = __importDefault(require("../../package/json"));
const SNotification_1 = __importDefault(require("../../blessed/notification/SNotification"));
const ora_1 = __importDefault(require("ora"));
const SIpc_1 = __importDefault(require("../../ipc/SIpc"));
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
 * @param           {Object}          [initialParams={}]        An object of initial params
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
    constructor(source, initialParams = {}) {
        super({
            screen: true
        });
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_sources' does not exist on type 'SSugar... Remove this comment to see the full error message
        this._sources = source;
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_initialParams' does not exist on type '... Remove this comment to see the full error message
        this._initialParams = Object.assign({}, initialParams);
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_settings' does not exist on type 'SSuga... Remove this comment to see the full error message
        this._settings = sugar_1.default('sugar-app');
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_serverSettings' does not exist on type ... Remove this comment to see the full error message
        this._serverSettings = this._initialParams.modules[
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_settings' does not exist on type 'SSuga... Remove this comment to see the full error message
        this._settings.welcome.serverModule];
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_modules' does not exist on type 'SSugar... Remove this comment to see the full error message
        this._modules = this._settings.modules;
        // @ts-expect-error ts-migrate(2339) FIXME: Property '$welcome' does not exist on type 'SSugar... Remove this comment to see the full error message
        this.$welcome = this._initWelcome(initialParams);
        // @ts-expect-error ts-migrate(2339) FIXME: Property '$modules' does not exist on type 'SSugar... Remove this comment to see the full error message
        this.$modules = this._initConsoles();
        // @ts-expect-error ts-migrate(2339) FIXME: Property '$bottomBar' does not exist on type 'SSug... Remove this comment to see the full error message
        this.$bottomBar = this._initBottomBar();
        hotkey_1.default('escape').on('press', () => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property '$modules' does not exist on type 'SSugar... Remove this comment to see the full error message
            if (this.$modules.parent) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property '$modules' does not exist on type 'SSugar... Remove this comment to see the full error message
                this.$modules.detach();
            }
        });
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_modules' does not exist on type 'SSugar... Remove this comment to see the full error message
        Object.keys(this._modules).forEach((moduleName, i) => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property '_modules' does not exist on type 'SSugar... Remove this comment to see the full error message
            const moduleObj = this._modules[moduleName];
            hotkey_1.default(`${i + 1}`).on('press', () => {
                // @ts-expect-error ts-migrate(2339) FIXME: Property '_modulesReady' does not exist on type 'S... Remove this comment to see the full error message
                if (!this._modulesReady)
                    return;
                this._showModule(moduleObj.id);
                SIpc_1.default.trigger('sugar.ui.displayedModule', moduleObj.id);
            });
        });
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_modulesReady' does not exist on type 'S... Remove this comment to see the full error message
        this._modulesReady = false;
        source.on('*.state', (state, metas) => {
            console.log('SA', state, metas);
            if (state === 'ready') {
                // @ts-expect-error ts-migrate(2339) FIXME: Property '_modulesReady' does not exist on type 'S... Remove this comment to see the full error message
                this._modulesReady = true;
            }
        });
        source.on('*.SSugarAppModule.*', (data, metas) => {
            switch (metas.originalStack) {
                case 'state':
                    this._moduleState(data, metas);
                    break;
                case 'log':
                    this._moduleLog(data, metas);
                    break;
                case 'start':
                    this._moduleStart(data, metas);
                    break;
                case 'success':
                    this._moduleSuccess(data, metas);
                    break;
                case 'error':
                    this._moduleError(data, metas);
                    break;
            }
        });
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'append' does not exist on type 'SSugarAp... Remove this comment to see the full error message
        this.append(this.$bottomBar);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'append' does not exist on type 'SSugarAp... Remove this comment to see the full error message
        this.append(this.$welcome);
        // update bottom bar
        setInterval(() => {
            this._updateBottomBar();
        }, 100);
    }
    _getDisplayedModuleObj() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_displayedModuleId' does not exist on ty... Remove this comment to see the full error message
        if (!this._displayedModuleId)
            return {};
        // @ts-expect-error ts-migrate(2339) FIXME: Property '$modules' does not exist on type 'SSugar... Remove this comment to see the full error message
        if (!this.$modules.parent)
            return {};
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_displayedModuleId' does not exist on ty... Remove this comment to see the full error message
        return this._findModuleObjById(this._displayedModuleId);
    }
    _showModule(moduleId) {
        const moduleObj = this._findModuleObjById(moduleId);
        if (!moduleObj || !moduleObj.$container)
            return;
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_displayedModuleId' does not exist on ty... Remove this comment to see the full error message
        this._displayedModuleId = moduleObj.id;
        // @ts-expect-error ts-migrate(2339) FIXME: Property '$modules' does not exist on type 'SSugar... Remove this comment to see the full error message
        this.$modules.children.forEach(($child) => {
            $child.detach();
        });
        // @ts-expect-error ts-migrate(2339) FIXME: Property '$modules' does not exist on type 'SSugar... Remove this comment to see the full error message
        if (!this.$modules.parent) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'append' does not exist on type 'SSugarAp... Remove this comment to see the full error message
            this.append(this.$modules);
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property '$modules' does not exist on type 'SSugar... Remove this comment to see the full error message
        this.$modules.append(moduleObj.$container);
    }
    _updateBottomBar() {
        let content = '';
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_initialParams' does not exist on type '... Remove this comment to see the full error message
        Object.keys(this._initialParams.modules).forEach((moduleName, i) => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property '_modules' does not exist on type 'SSugar... Remove this comment to see the full error message
            const moduleObj = this._modules[moduleName];
            let bg, fg;
            switch (moduleObj.state) {
                case 'success':
                case 'complete':
                    bg = 'green';
                    fg = 'black';
                    break;
                case 'running':
                case 'start':
                    bg = 'blue';
                    fg = 'white';
                    break;
                case 'watching':
                    bg = 'black';
                    fg = 'white';
                    break;
                case 'error':
                    bg = 'red';
                    fg = 'black';
                    break;
                case 'ready':
                    bg = 'black';
                    fg = 'white';
                    break;
                default:
                    bg = 'yellow';
                    fg = 'black';
                    break;
            }
            let spinner = '';
            switch (moduleObj.state) {
                case 'watching':
                case 'running':
                case 'start':
                    spinner = `${moduleObj.spinner.frame()}`;
                    break;
                case 'success':
                case 'complete':
                    spinner = `✓ `;
                    break;
                case 'error':
                    spinner = '✖ ';
                    break;
                default:
                    spinner = `› `;
                    break;
            }
            const moduleString = ` ${spinner}${moduleObj.id} `
                .replace('[36m', '')
                .replace('[39m', '')
                .split('')
                .map((char) => {
                return `<bg${upperFirst_1.default(bg)}><${fg}>${char}</${fg}></bg${upperFirst_1.default(bg)}>`;
            })
                .join('');
            content += moduleString;
        });
        // @ts-expect-error ts-migrate(2339) FIXME: Property '$bottomBar' does not exist on type 'SSug... Remove this comment to see the full error message
        this.$bottomBar.setContent(parseHtml_1.default(content));
    }
    _findModuleObjById(id) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_modules' does not exist on type 'SSugar... Remove this comment to see the full error message
        for (let i = 0; i < Object.keys(this._modules).length; i++) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property '_modules' does not exist on type 'SSugar... Remove this comment to see the full error message
            const moduleObj = this._modules[Object.keys(this._modules)[i]];
            if (moduleObj.id === id)
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
        // @ts-expect-error ts-migrate(2339) FIXME: Property '$modules' does not exist on type 'SSugar... Remove this comment to see the full error message
        if (this.$modules.parent)
            return;
        const moduleObj = this._findModuleObjById(data.module.id);
        if (moduleObj && moduleObj.$status) {
            clearTimeout(moduleObj.statusTimeout);
            moduleObj.$status.style.bg = 'red';
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'update' does not exist on type 'SSugarAp... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'append' does not exist on type 'SSugarAp... Remove this comment to see the full error message
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
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'update' does not exist on type 'SSugarAp... Remove this comment to see the full error message
            this.update();
            moduleObj.statusTimeout = setTimeout(() => {
                moduleObj.$status.style.bg = 'blue';
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'update' does not exist on type 'SSugarAp... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'append' does not exist on type 'SSugarAp... Remove this comment to see the full error message
        this.append($successNotification);
    }
    _moduleState(data, metas) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_modules' does not exist on type 'SSugar... Remove this comment to see the full error message
        const moduleObj = this._modules[data.module.idx];
        if (!moduleObj.spinner)
            moduleObj.spinner = ora_1.default();
        if (!moduleObj)
            return;
        moduleObj.state = data.value;
    }
    _moduleStart(data, metas) {
        const moduleObj = this._findModuleObjById(data.module.id);
        if (moduleObj && moduleObj.$status) {
            clearTimeout(moduleObj.statusTimeout);
            moduleObj.$status.style.bg = 'cyan';
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'update' does not exist on type 'SSugarAp... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'append' does not exist on type 'SSugarAp... Remove this comment to see the full error message
        this.append($startNotification);
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
     * @param         {Object}        initialParams       An object of initial params used to launch the sugar ui
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _initWelcome(initialParams) {
        const $centeredBox = blessed_1.default.box({
            top: 'center',
            left: 'center',
            width: '100%',
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
            `<yellow>|</yellow>  ${' '.repeat(byLineSpaces)} ${byLine} ${' '.repeat(byLineSpaces)}  <yellow>|</yellow>`,
            `<yellow>${'-'.repeat(countLine_1.default(projectLine) + 6)}</yellow>`
        ];
        const updateContent = () => {
            let text = [...projectLines, '', spinner.frame()];
            // @ts-expect-error ts-migrate(2339) FIXME: Property '_modulesReady' does not exist on type 'S... Remove this comment to see the full error message
            if (this._modulesReady) {
                text = [
                    ...projectLines,
                    ``,
                    `WebUI <green>started</green> at`,
                    `<bgYellow><black> http://${
                    // @ts-expect-error ts-migrate(2339) FIXME: Property '_serverSettings' does not exist on type ... Remove this comment to see the full error message
                    this._serverSettings.hostname}:${this._serverSettings.port} </black></bgYellow>`,
                    '',
                    `<cyan>${Object.keys(initialParams.modules).length}</cyan> module${Object.keys(initialParams.modules).length > 1 ? 's' : ''} loaded`
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
     * @name             _initConsoles
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
    _initConsoles() {
        const $consolesContainer = blessed_1.default.box({
            width: '100%',
            height: '100%-1',
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
                    bg: color_1.default('terminal.primary').toString()
                }
            },
            padding: {
                top: 0,
                left: 0,
                right: 0,
                bottom: 2
            }
        });
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_modules' does not exist on type 'SSugar... Remove this comment to see the full error message
        Object.keys(this._modules).forEach((moduleName) => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property '_modules' does not exist on type 'SSugar... Remove this comment to see the full error message
            const moduleObj = this._modules[moduleName];
            const $container = blessed_1.default.box({
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                height: '100%',
                style: {}
            });
            const $topBar = blessed_1.default.box({
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                style: {
                    bg: 'black'
                },
                padding: {
                    top: 1,
                    left: 2,
                    right: 2
                },
                content: parseHtml_1.default(`<yellow>${moduleObj.name}</yellow> | <white>${moduleObj.id}</white>`)
            });
            let OutputClass;
            if (moduleObj.ui) {
                // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
                const requirePath = path_1.default.relative(__dirname, moduleObj.ui);
                // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
                OutputClass = require(requirePath);
            }
            else {
                OutputClass = SBlessedOutput_1.default;
            }
            // @ts-expect-error ts-migrate(2339) FIXME: Property '_sources' does not exist on type 'SSugar... Remove this comment to see the full error message
            const $console = new OutputClass(this._sources, Object.assign({ filter: (logObj) => {
                    return logObj.module && logObj.module.id === moduleObj.id;
                }, width: '100%', height: '100%-3', top: 3, left: 0, right: 0, mouse: true, keys: true, clickable: false, scrollable: true, scrollbar: {
                    ch: ' ',
                    inverse: true
                }, style: {
                    fg: 'white',
                    scrollbar: {
                        bg: color_1.default('terminal.primary').toString()
                    }
                }, padding: {
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 2
                } }, moduleObj));
            $container.append($console);
            $container.append($topBar);
            moduleObj.$container = $container;
            moduleObj.$topBar = $topBar;
            moduleObj.$console = $console;
        });
        return $consolesContainer;
    }
}
exports.default = SSugarAppTerminalUi;
