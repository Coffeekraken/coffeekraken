import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import type { ISStateSettings } from './SState';
import __SState from './SState';

/**
 * @name                SStateManager
 * @namespace           node
 * @type                Class
 * @extends             SBuilder
 * @platform            node
 * @status              beta
 *
 * This class represent a state in your application. This state can be updated, saved, restored, etc...
 * You can subscribe to a state to be notified when data are updating inside, etc...
 *
 * @param           {ISStateManagerSettings}          [settings={}]           Some settings to configure your state instance
 *
 * @example         js
 * import SStateManager from '@coffeekraken/s-state';
 * const myState = new SStateManager({
 *      myProp: 'hello',
 *      sub: {
 *          title: 'world'
 *      }
 * });
 * myState.$set('*', (actionObj) => {
 *     // do something when your props are updating
 * });
 * myState.$set('myProp', (actionObj) => {
 *     // do something when the prop "myProp" is updated
 * });
 * myState.$set('sub.*', (actionObj) => {
 *     // do something when the sub.title prop is updated
 * });
 *
 * // updating the state as a normal object
 * myState.sub.title = 'plop';
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISStateManagerSettings {
    id: string;
    save: boolean;
}

export default class SStateManager extends __SClass {
    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings?: Partial<ISStateManagerSettings>) {
        super(__deepMerge({}, settings ?? {}));
    }

    /**
     * @name           define
     * @type            Function
     *
     * This method allows you to define a new state inside the state manager.
     * It's like creating a new SState instance but quicker
     *
     * @param       {String}            id          The state id you want to create
     * @param       {Object}            state       The state object used to create the SState instance
     * @param       {ISStateSettings}   [setting={}]        Some settings to configure your SState instance
     * @return      {SState}                        The SState instanvce that describe your state
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    define(
        id: string,
        state: any,
        settings?: Partial<ISStateSettings>,
    ): __SState {
        this[id] = new __SState(state, {
            save: this.settings.save,
            id,
            ...settings,
        });
        return this[id];
    }
}
