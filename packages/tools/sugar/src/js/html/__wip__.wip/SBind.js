// @ts-nocheck
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
import SWatch from '../../shared/object/SWatch';
export default class SBind {
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
            obj2attr: {}
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
        this._watcher = new SWatch();
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
            source = new SWatch(source);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0JpbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQmluZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFFSCxPQUFPLE1BQU0sTUFBTSw0QkFBNEIsQ0FBQztBQVFoRCxNQUFNLENBQUMsT0FBTyxPQUFPLEtBQUs7SUF3Q3hCOztPQUVHO0lBQ0g7UUExQ0E7Ozs7Ozs7O1dBUUc7UUFDSCxlQUFVLEdBQUc7WUFDWCxRQUFRLEVBQUUsRUFBRTtZQUNaLFFBQVEsRUFBRSxFQUFFO1NBQ2IsQ0FBQztRQUVGOzs7Ozs7Ozs7V0FTRztRQUNILG1DQUE4QixHQUFHLEVBQUUsQ0FBQztRQUVwQzs7Ozs7Ozs7OztXQVVHO1FBQ0gscUJBQWdCLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQU0zQixtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxVQUFVO1FBQ3pDLHNEQUFzRDtRQUN0RCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDckUsTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQztDQXdLRiJ9