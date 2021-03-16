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
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(require("child_process"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const blessed_1 = __importDefault(require("blessed"));
const parseSchema_1 = __importDefault(require("../url/parseSchema"));
const SPanel_1 = __importDefault(require("../terminal/SPanel"));
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
/**
 * @name                    SApp
 * @namespace           sugar.node.terminal
 * @type                    Class
 * @status              wip
 *
 * This class define an application in the terminal that you can easily configure to have the look and feel that you want
 * through simple settings described bellow.
 *
 * @param           {String}          name            Specify a name for this application
 * @param           {Object}          [settings={}]   An object of settings described bellow:
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import SApp from '@coffeekraken/sugar/node/terminal/SApp';
 * const app = new SApp('My Cool Application', {
 * });
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SApp extends blessed_1.default.screen {
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
}
exports.default = SApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0FwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL3Rlcm1pbmFsL1NBcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0FBRWQsa0VBQTJDO0FBQzNDLG9FQUE4QztBQUM5QyxzREFBZ0M7QUFJaEMscUVBQStDO0FBRS9DLGdFQUEwQztBQUMxQyxzRUFBZ0Q7QUFFaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsTUFBcUIsSUFBSyxTQUFRLGlCQUFTLENBQUMsTUFBTTtJQWtDaEQ7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLElBQUksRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUM3QixvQkFBb0I7UUFDcEIsTUFBTSxTQUFTLEdBQUcsbUJBQVcsQ0FDM0I7WUFDRSxPQUFPLEVBQUU7Z0JBQ1AsTUFBTSxFQUFFO29CQUNOLFFBQVEsRUFBRSxJQUFJO2lCQUNmO2FBQ0Y7U0FDRixFQUNELFFBQVEsQ0FDVCxDQUFDO1FBQ0YsMEJBQTBCO1FBQzFCLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBdkRsQzs7Ozs7Ozs7V0FRRztRQUNILFVBQUssR0FBRyxJQUFJLENBQUM7UUFFYjs7Ozs7Ozs7V0FRRztRQUNILGNBQVMsR0FBRyxFQUFFLENBQUM7UUFFZjs7Ozs7Ozs7V0FRRztRQUNILGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBeUJqQixnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFFM0IsZ0JBQWdCO1FBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWxCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQzFCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxnREFBZ0Q7UUFDaEQsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILFlBQVksQ0FBQyxHQUFHO1FBQ2Qsc0JBQXNCO1FBQ3RCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xFLGdDQUFnQztZQUNoQyxNQUFNLFlBQVksR0FBRyxxQkFBYSxDQUNoQyxHQUFHLEVBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUN0QyxDQUFDO1lBQ0YsSUFBSSxZQUFZLENBQUMsS0FBSyxFQUFFO2dCQUN0Qix1Q0FDSyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FDL0QsR0FBRyxFQUNILE1BQU0sRUFBRSxZQUFZLENBQUMsTUFBTSxJQUMzQjthQUNIO1NBQ0Y7UUFDRCwyQkFBMkI7UUFDM0IsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILFFBQVE7UUFDTixpQ0FBaUM7UUFDakMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELE1BQU0sb0JBQW9CLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEUsSUFDRSxvQkFBb0IsS0FBSyxDQUFDLENBQUM7WUFDM0Isb0JBQW9CLEtBQUssUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBRTVDLE9BQU87UUFDVCxNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0QsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxZQUFZO1FBQ1YsaUNBQWlDO1FBQ2pDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsRCxNQUFNLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hFLElBQUksb0JBQW9CLEtBQUssQ0FBQyxDQUFDLElBQUksb0JBQW9CLEtBQUssQ0FBQztZQUFFLE9BQU87UUFDdEUsTUFBTSxtQkFBbUIsR0FBRyxRQUFRLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDL0QsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILElBQUksQ0FBQyxHQUFHO1FBQ04sK0JBQStCO1FBQy9CLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFeEMsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFFNUIsdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1FBRXZCLGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsUUFBUSxDQUFDLEdBQUc7UUFDVixPQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssR0FBRyxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0csYUFBYSxDQUFDLFFBQVE7O1lBQzFCLElBQUksWUFBWSxFQUFFLGNBQWMsQ0FBQztZQUVqQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFFdEMsc0NBQXNDO2dCQUN0QyxZQUFZLEdBQUcsSUFBSSxnQkFBUSxDQUFDO29CQUMxQixTQUFTLEVBQUUsR0FBRyxFQUFFO3dCQUNkLE9BQU8sdUJBQXVCLENBQUM7b0JBQ2pDLENBQUM7aUJBQ0YsQ0FBQyxDQUFDO2dCQUVILGdEQUFnRDtnQkFDaEQsa0VBQWtFO2dCQUNsRSxNQUFNLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN4RCxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtvQkFDL0IsY0FBYyxHQUFHLHVCQUFjLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUU7d0JBQ2pELEdBQUcsa0NBQ0UsT0FBTyxDQUFDLEdBQUcsS0FDZCxnQkFBZ0IsRUFBRSxJQUFJLEdBQ3ZCO3dCQUNELFFBQVEsRUFBRSxJQUFJO3dCQUNkLEdBQUcsRUFBRSxxQkFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQzt3QkFDakMsS0FBSyxFQUFFLElBQUk7cUJBQ1osQ0FBQyxDQUFDO29CQUNILGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO3dCQUN4QyxZQUFZLENBQUMsR0FBRyxDQUNkLElBQUk7NkJBQ0QsUUFBUSxFQUFFOzZCQUNWLEtBQUssQ0FBQyxHQUFHLENBQUM7NkJBQ1YsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQzNCLENBQUM7b0JBQ0osQ0FBQyxDQUFDLENBQUM7b0JBQ0gsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7d0JBQ3hDLFlBQVksQ0FBQyxHQUFHLENBQ2QsSUFBSTs2QkFDRCxRQUFRLEVBQUU7NkJBQ1YsS0FBSyxDQUFDLEdBQUcsQ0FBQzs2QkFDVixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FDM0IsQ0FBQztvQkFDSixDQUFDLENBQUMsQ0FBQztpQkFDSjtnQkFFRCxnREFBZ0Q7Z0JBQ2hELElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7Z0JBQzFELElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7YUFDdkQ7aUJBQU07Z0JBQ0wsd0NBQXdDO2dCQUN4QyxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUN0RCxjQUFjLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO2FBQzNEO1lBRUQsNkJBQTZCO1lBQzdCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDekQsdUNBQXVDO1lBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEIsb0JBQW9CO1lBQ3BCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoQixDQUFDO0tBQUE7Q0FDRjtBQXZRRCx1QkF1UUMifQ==