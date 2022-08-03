"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name 		SBind
 * @namespace            js.class
 * @type    Class
 *
 * This class allows to bind properties between objects, object to HTMLElement attribute and vice versa.
 *
 * @example		js
 * const binder = new SBind();
 *
 * // keep in sync the myObject2.title with the myObject1.title property
 * binder.bindObjectPath2ObjectPath(myObject1, 'title', myObject2, 'title');
 *
 * // update and HTMLElement attribute when the myObject1.title is updated
 * binder.bindObjectPath2ElementAttribute(myObject1, 'title', myHTMLElement, 'title');
 *
 * // and more...
 *
 * @author		Olivier Bossel<olivier.bossel@gmail.com>
 */
const SWatch_1 = __importDefault(require("../../shared/object/SWatch"));
class SBind {
    /**
     * @constructor
     */
    constructor() {
        /**
         * @name              _bindStack
         * @type              Object
         * @private
         *
         * Store all the bind objects settings
         *
         * @author		Olivier Bossel<olivier.bossel@gmail.com>
         */
        this._bindStack = {
            attr2obj: {},
            obj2attr: {},
        };
        /**
         * @name                _mutationObservedElementsStack
         * @type                Array
         * @private
         *
         * Store all the mutation observers that are used to
         * be notified when attributes are updated
         *
         * @author		Olivier Bossel<olivier.bossel@gmail.com>
         */
        this._mutationObservedElementsStack = [];
        /**
         * @name                _digestsMutation
         * @type                Map
         * @private
         *
         * Store for each binded HTMLElement if each binded attributes are
         * in digest phase to avoid multiple assignement of the same attribute
         * in each digest phase
         *
         * @author		Olivier Bossel<olivier.bossel@gmail.com>
         */
        this._digestsMutation = new Map();
        // init new watcher
        this._watcher = new SWatch_1.default();
    }
    /**
     * @name                  bind
     * @type                  Function
     *
     * This method allows you to bind an Object|HTMLElement property to another Object|HTMLElement property
     * This mean that when the property of the first passed element is updated, the same property on the second
     * element will be updated as well
     *
     * @param       {Object|HTMLElement}        source            The source object
     * @param       {String}                    sourcePath        The source path to the property that you want to bind
     * @param       {Object|HTMLElement}        target            The target object
     * @param       {String}                    [targetPath=sourcePath]        The target path to the property that you want to be sync with the source element
     *
     * @author		Olivier Bossel<olivier.bossel@gmail.com>
     */
    bind(source, sourcePath, target, targetPath) {
        // check if the source object is already a watched one
        if (typeof source === 'object' && !source.hasOwnProperty('__$SWatch')) {
            source = new SWatch_1.default(source);
        }
    }
}
exports.default = SBind;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsd0VBQWdEO0FBRWhELE1BQXFCLEtBQUs7SUF3Q3RCOztPQUVHO0lBQ0g7UUExQ0E7Ozs7Ozs7O1dBUUc7UUFDSCxlQUFVLEdBQUc7WUFDVCxRQUFRLEVBQUUsRUFBRTtZQUNaLFFBQVEsRUFBRSxFQUFFO1NBQ2YsQ0FBQztRQUVGOzs7Ozs7Ozs7V0FTRztRQUNILG1DQUE4QixHQUFHLEVBQUUsQ0FBQztRQUVwQzs7Ozs7Ozs7OztXQVVHO1FBQ0gscUJBQWdCLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQU16QixtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGdCQUFNLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVTtRQUN2QyxzREFBc0Q7UUFDdEQsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ25FLE1BQU0sR0FBRyxJQUFJLGdCQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDL0I7SUFDTCxDQUFDO0NBd0tKO0FBNU9ELHdCQTRPQyJ9