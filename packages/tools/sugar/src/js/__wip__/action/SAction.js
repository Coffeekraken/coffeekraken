// @ts-nocheck
import __deepMerge from '../object/deepMerge';
import __SPromise from '../promise/SPromise';
import __flatten from '../object/flatten';
import __typeMap from './typeMap';
/**
 * @name 		                    SAction
 * @namespace           sugar.js.action
 * @type                        Class
 *
 * This class represent an action. An action is something that happened depending on
 * settings. It can be an "url" action that will change the user page, a "login" action
 * that will allow the user to log in his favorite services like "google", etc...
 * All this is wrapped into a nicely formated system that use the SPromise class
 * to let you know the state of the action, etc...
 *
 * @example 	js
 * import SAction from '@coffeekraken/sugar/js/action/SAction';
 * class MyCoolAction extends SAction {
 *    constructor(descriptorObj, settings = {}) {
 *      super(descriptorObj, settings);
 *    }
 * }
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SAction extends __SPromise {
    /**
     * @name                              constructor
     * @type                              Function
     *
     * Constructor
     *
     * @param           	{SActionConfig|Object} 		            request 	            	The request object used to make ajax call
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(descriptorObj, settings = {}) {
        super((resolve, reject, emit) => { });
        /**
         * @name            _settings
         * @type            Object
         * @private
         *
         * Store this action instance settings
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._settings = {};
        /**
         * @name            _descriptorObj
         * @type            Object
         * @private
         *
         * Store this action instance settings
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._descriptorObj = {};
        this._settings = __deepMerge({}, settings);
        this._descriptorObj = descriptorObj;
    }
    /**
     * @name              on
     * @type              Function
     * @static
     *
     * This function allows you to subscribe to general SAction actions events by
     * prefixing it with the action class name like "SUrlAction.{event}", etc...
     *
     * @return      {Function}          A function that you can call to unregister to the event
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static on(event, callback) {
        SAction._promise.on(event, callback);
        return () => {
            SAction._promise.off(event, callback);
        };
    }
    /**
     * @name            run
     * @type            Function
     *
     * This method is meant to be overrided by your custom actions classes.
     * You still need to call it using the ```super.run()``` statement in order
     * to keep all the features like promises events, etc...
     *
     * @return      {SPromise}      An SPromise instance only for this particular run process. You can subscribe to the same "events" has on the class itself but these events are happening only for this run process.
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    run() {
        const promise = new __SPromise(({ resolve, reject, emit }) => {
            SAction._promise.emit(`${this.constructor.name}.run`, this);
            emit(`run`, this);
            this.emit(`run`, this);
        }, {
            id: SAction._promise.id + 'Run'
        });
        promise.complete = () => {
            SAction._promise.emit(`${this.constructor.name}.complete`, this);
            promise.emit('complete', this);
            this.emit(`complete`, this);
        };
        return promise;
    }
    /**
     * @name          toJson
     * @type          Function
     *
     * This method is usefull to turn your action instance into a
     * proper JSON object to you can pass it through http request, etc...
     * You can then instanciate back your action by using the ```
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    toJson() {
        const types = __flatten(__typeMap);
        let type = null;
        for (const key in types) {
            if (types[key] === this.constructor) {
                type = key.replace('.default', '');
                break;
            }
        }
        if (!type)
            throw new Error(`You try to convert your "<primary>${this.constructor.name}</primary>" instance to JSON but this Class is not registered into the "<cyan>js.action.typeMap</cyan>" mapping object. Please add it to it before continue...`);
        return {
            type: type,
            descriptorObj: this._descriptorObj,
            settings: this._settings
        };
    }
}
/**
 * @name              _promise
 * @type              SPromise
 * @static
 * @private
 *
 * Store the global SPromise instance used to dispatch global events
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SAction._promise = new __SPromise({
    id: 'SAction'
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0FjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNBY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUdkLE9BQU8sV0FBVyxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sVUFBVSxNQUFNLHFCQUFxQixDQUFDO0FBRTdDLE9BQU8sU0FBUyxNQUFNLG1CQUFtQixDQUFDO0FBRzFDLE9BQU8sU0FBUyxNQUFNLFdBQVcsQ0FBQztBQUVsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLE9BQVEsU0FBUSxVQUFVO0lBNEQ3Qzs7Ozs7Ozs7OztPQVVHO0lBQ0gsWUFBWSxhQUFhLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDdEMsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxHQUFFLENBQUMsQ0FBQyxDQUFDO1FBdkV2Qzs7Ozs7Ozs7O1dBU0c7UUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBRWY7Ozs7Ozs7OztXQVNHO1FBQ0gsbUJBQWMsR0FBRyxFQUFFLENBQUM7UUFrRGxCLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztJQUN0QyxDQUFDO0lBbkNEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVE7UUFDdkIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sR0FBRyxFQUFFO1lBQ1YsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFtQkQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsR0FBRztRQUNELE1BQU0sT0FBTyxHQUFHLElBQUksVUFBVSxDQUM1QixDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQzVCLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pCLENBQUMsRUFDRDtZQUNFLEVBQUUsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxLQUFLO1NBQ2hDLENBQ0YsQ0FBQztRQUNGLE9BQU8sQ0FBQyxRQUFRLEdBQUcsR0FBRyxFQUFFO1lBQ3RCLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNqRSxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUM7UUFDRixPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILE1BQU07UUFDSixNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLEtBQUssTUFBTSxHQUFHLElBQUksS0FBSyxFQUFFO1lBQ3ZCLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ25DLElBQUksR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDbkMsTUFBTTthQUNQO1NBQ0Y7UUFFRCxJQUFJLENBQUMsSUFBSTtZQUNQLE1BQU0sSUFBSSxLQUFLLENBQ2IscUNBQXFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxnS0FBZ0ssQ0FDM04sQ0FBQztRQUVKLE9BQU87WUFDTCxJQUFJLEVBQUUsSUFBSTtZQUNWLGFBQWEsRUFBRSxJQUFJLENBQUMsY0FBYztZQUNsQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVM7U0FDekIsQ0FBQztJQUNKLENBQUM7O0FBbkhEOzs7Ozs7Ozs7O0dBVUc7QUFDSSxnQkFBUSxHQUFHLElBQUksVUFBVSxDQUFDO0lBQy9CLEVBQUUsRUFBRSxTQUFTO0NBQ2QsQ0FBQyxDQUFDIn0=