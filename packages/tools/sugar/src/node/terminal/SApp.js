"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const child_process_1 = __importDefault(require("child_process"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const blessed_1 = __importDefault(require("blessed"));
const parseSchema_1 = __importDefault(require("../url/parseSchema"));
const SPanel_1 = __importDefault(require("../terminal/SPanel"));
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
module.exports = class SApp extends blessed_1.default.screen {
    /**
     * @name              constructor
     * @type              Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(name, settings = {}) {
        // save the settings
        const _settings = deepMerge_1.default({
            blessed: {
                screen: {
                    smartCSR: true
                }
            }
        }, settings);
        // extend from blessed.box
        super(_settings.blessed.screen);
        /**
         * @name              _name
         * @type              String
         * @private
         *
         * Store the application name
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._name = null;
        /**
         * @name              _settings
         * @type              Object
         * @private
         *
         * Store the application settings
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._settings = {};
        /**
         * @name              _currentPanes
         * @type              Object
         * @private
         *
         * Store the current panes contents depending on the current url
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._currentPanes = {};
        // save settings
        this._settings = _settings;
        // save the name
        this._name = name;
        this.key('C-c', (ch, key) => {
            this.destroy();
        });
        this.key('right', (e) => {
            this.nextMenu();
        });
        this.key('left', (e) => {
            this.previousMenu();
        });
        // render the layout with the current url passed
        setTimeout(() => {
            this.goTo(this._settings.homeRoute);
        });
    }
    /**
     * @name                      _getRouteObj
     * @type                      Function
     * @private
     *
     * Get the route configuration object depending on the current url
     *
     * @param         {String}            url             The current url
     * @return        {Object}                            The corresponding route object
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _getRouteObj(url) {
        // loop on each routes
        for (let i = 0; i < Object.keys(this._settings.routes).length; i++) {
            // copmpare the url to the route
            const parsedSchema = parseSchema_1.default(url, Object.keys(this._settings.routes)[i]);
            if (parsedSchema.match) {
                return Object.assign(Object.assign({}, this._settings.routes[Object.keys(this._settings.routes)[i]]), { url, params: parsedSchema.params });
            }
        }
        // by default, return false
        return false;
    }
    /**
     * @name                    nextMenu
     * @type                    Function
     *
     * This method allows you to pass to the next menu item
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    nextMenu() {
        // get the actual menu item index
        const menuUrls = Object.keys(this._settings.menu);
        const currentMenuItemIndex = menuUrls.indexOf(this._currentUrl);
        if (currentMenuItemIndex === -1 ||
            currentMenuItemIndex === menuUrls.length - 1)
            return;
        const nextMenuItemUrl = menuUrls[currentMenuItemIndex + 1];
        // go to the next menu item
        this.goTo(nextMenuItemUrl);
    }
    /**
     * @name                    previousMenu
     * @type                    Function
     *
     * This method allows you to pass to the next menu item
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    previousMenu() {
        // get the actual menu item index
        const menuUrls = Object.keys(this._settings.menu);
        const currentMenuItemIndex = menuUrls.indexOf(this._currentUrl);
        if (currentMenuItemIndex === -1 || currentMenuItemIndex === 0)
            return;
        const previousMenuItemUrl = menuUrls[currentMenuItemIndex - 1];
        // go to the next menu item
        this.goTo(previousMenuItemUrl);
    }
    /**
     * @name                    goTo
     * @type                    Function
     *
     * This method allows you to change the "page" by passing a simple url like 'build/scss' depending on the registered routes in your app.
     *
     * @param         {String}          url           The url to go to
     * @return        {Boolean}                       true if ok, false if something goes wrong like the page does not exist, etc...
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    goTo(url) {
        // get the current route object
        const routeObj = this._getRouteObj(url);
        // if something goes wrong
        if (!routeObj)
            return false;
        // save the current url
        this._currentUrl = url;
        // render the layout with the current url passed
        this._renderLayout(routeObj);
    }
    /**
     * @name                    isActive
     * @type                    Function
     *
     * This method allows you to check if the passed url is the active one
     *
     * @param       {String}        url            The url to check
     * @return      {Boolean}                       true if is the active one, false if not
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    isActive(url) {
        return this._currentUrl === url;
    }
    /**
     * @name                    _renderLayout
     * @type                    Function
     * @private
     *
     * Render the layout with the current content defined by the current route object passed
     *
     * @param           {Object}          routeObj            The current route object to render with the layout
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _renderLayout(routeObj) {
        return __awaiter(this, void 0, void 0, function* () {
            let contentPanel, contentProcess;
            if (!this._currentPanes[routeObj.url]) {
                this._currentPanes[routeObj.url] = {};
                // creating the panel to host the logs
                contentPanel = new SPanel_1.default({
                    beforeLog: () => {
                        return '<blue><time/></blue> ';
                    }
                });
                // switch between the content types that can be:
                // - string: Launch a new child process with the specified command
                const content = yield routeObj.content(routeObj.params);
                if (typeof content === 'string') {
                    contentProcess = child_process_1.default.spawn(content, [], {
                        env: Object.assign(Object.assign({}, process.env), { IS_CHILD_PROCESS: true }),
                        detached: true,
                        cwd: packageRoot_1.default(process.cwd()),
                        shell: true
                    });
                    contentProcess.stdout.on('data', (data) => {
                        contentPanel.log(data
                            .toString()
                            .split('~')
                            .filter((m) => m !== ''));
                    });
                    contentProcess.stderr.on('data', (data) => {
                        contentPanel.log(data
                            .toString()
                            .split('~')
                            .filter((m) => m !== ''));
                    });
                }
                // store the content panel and process for later
                this._currentPanes[routeObj.url].process = contentProcess;
                this._currentPanes[routeObj.url].panel = contentPanel;
            }
            else {
                // restore the content panel and process
                contentPanel = this._currentPanes[routeObj.url].panel;
                contentProcess = this._currentPanes[routeObj.url].process;
            }
            // getting the overall layout
            const layout = yield this._settings.layout(contentPanel);
            // rendering the layout to the terminal
            this.append(layout);
            // render the screen
            this.render();
        });
    }
};
