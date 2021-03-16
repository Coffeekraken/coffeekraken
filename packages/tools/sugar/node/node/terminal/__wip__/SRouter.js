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
const __fs = require('fs');
const __parse = require('../url/parse');
const __isClass = require('../is/class');
/**
 * @name                                SRouter
 * @namespace           sugar.node.terminal
 * @type                                Class
 *
 * Provide a simple router class to switch between pages in the terminal
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SRouter {
    /**
     * @name                          constructor
     * @type                          Function
     *
     * Construct the router class with settings described bellow
     *
     * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(routes, settings = {}) {
        /**
         * @name                            _routes
         * @type                            Object
         * @private
         *
         * Store the routes available in this router instance
         *
         * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._routes = {};
        /**
         * @name                            _settings
         * @type                            Object
         * @private
         *
         * Store the settings available in this router instance
         *
         * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._settings = {};
        // save the routes
        this._routes = routes;
        // save the settings
        this._settings = settings;
        // if we have a default page, we go to it
        if (this._settings.default.page) {
            this.goto(this._settings.default.page);
        }
    }
    /**
     * @name                          setOutput
     * @type                          Function
     *
     * Set where you want to output the router results.
     * Can be something like a "blessed" box object, or simple the console.log function by default.
     *
     * @param           {Mixed}                     output                    The output where you want to print the router results
     *
     * @example         js
     * myRouter.setOutput(console.log);
     * const myBox = blessed.box({});
     * myRouter.setOutput(myBox);
     *
     * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    setOutput(output) {
        this._settings.output = output;
    }
    /**
     * @name                          goto
     * @type                          Function
     *
     * Allows you to cvhange the displayed page by specify the route name wanted or by specify
     * a url with some params in it that will be analyzed by the router instance
     *
     * @param           {String}             path             The path where you want to go. Can be a simple route name or a full url with params
     *
     * @example         js
     * myRouter.goto('list');
     * myRouter.goto('something/cool/01');
     *
     * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    goto(path) {
        return __awaiter(this, void 0, void 0, function* () {
            let viewContent, viewData, route, parsedUrl;
            // check what is the path and if a route exist with the passed value name
            if (!path.includes('/') && this._routes[path]) {
                // we have a route passed
                route = this._routes[path];
            }
            else {
                // it seems that it is a url passed. We have to check them one after the other...
                for (let i = 0; i < Object.keys(this._routes).length; i++) {
                    const routeObj = this._routes[Object.keys(this._routes)[i]];
                    const _parsedUrl = __parse(path, {
                        schema: routeObj.url
                    });
                    if (_parsedUrl.match) {
                        route = routeObj;
                        parsedUrl = _parsedUrl;
                        break;
                    }
                }
            }
            // if we don't have any route that match the request,
            // simply redirect the user to the 404 layout
            if (!route && this._routes['404']) {
                return this.goto('404');
            }
            // check if we have a data adapter specified
            viewData =
                parsedUrl && parsedUrl.params
                    ? parsedUrl.params
                    : route.defaultParams || {};
            if (route.dataAdapter) {
                viewData = yield require(route.dataAdapter)(viewData);
            }
            // generate the new view using the specified layout
            // and passing the viewData to it
            const layout = require(route.layout);
            if (__isClass(layout)) {
                viewContent = new layout(viewData);
            }
            else {
                viewContent = yield layout(viewData);
            }
            // check if we have an output specified in the settings
            if (this._settings.output) {
                if (this._settings.output.append && this._settings.output.screen) {
                    this._settings.output.append(viewContent);
                    this._settings.output.screen.render();
                }
            }
        });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1JvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ub2RlL3Rlcm1pbmFsL19fd2lwX18vU1JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzQixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDeEMsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRXpDOzs7Ozs7OztHQVFHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLE9BQU87SUF1QjVCOzs7Ozs7O09BT0c7SUFDSCxZQUFZLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtRQTlCakM7Ozs7Ozs7O1dBUUc7UUFDSCxZQUFPLEdBQUcsRUFBRSxDQUFDO1FBRWI7Ozs7Ozs7O1dBUUc7UUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBV2Isa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBRXRCLG9CQUFvQjtRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUUxQix5Q0FBeUM7UUFDekMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN4QztJQUNILENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxTQUFTLENBQUMsTUFBTTtRQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDRyxJQUFJLENBQUMsSUFBSTs7WUFDYixJQUFJLFdBQVcsRUFBRSxRQUFR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