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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0FwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNBcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7QUFFZCxrRUFBMkM7QUFDM0Msb0VBQThDO0FBQzlDLHNEQUFnQztBQUloQyxxRUFBK0M7QUFFL0MsZ0VBQTBDO0FBQzFDLHNFQUFnRDtBQTBCaEQsaUJBQVMsTUFBTSxJQUFLLFNBQVEsaUJBQVMsQ0FBQyxNQUFNO0lBa0MxQzs7Ozs7Ozs7T0FRRztJQUNILFlBQVksSUFBSSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQzdCLG9CQUFvQjtRQUNwQixNQUFNLFNBQVMsR0FBRyxtQkFBVyxDQUMzQjtZQUNFLE9BQU8sRUFBRTtnQkFDUCxNQUFNLEVBQUU7b0JBQ04sUUFBUSxFQUFFLElBQUk7aUJBQ2Y7YUFDRjtTQUNGLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFDRiwwQkFBMEI7UUFDMUIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUF2RGxDOzs7Ozs7OztXQVFHO1FBQ0gsVUFBSyxHQUFHLElBQUksQ0FBQztRQUViOzs7Ozs7OztXQVFHO1FBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUVmOzs7Ozs7OztXQVFHO1FBQ0gsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUF5QmpCLGdCQUFnQjtRQUNoQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUUzQixnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFFbEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDMUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUN0QixJQUFJLENB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