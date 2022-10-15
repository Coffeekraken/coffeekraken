import __SClass from '@coffeekraken/s-class';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __mitosisWebcomponentAdapter from './adapters/mitosisWebcomponentAdapter';
import __reactAdapter from './adapters/reactAdapter';
class SComponentProxy extends __SClass {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(component, settings) {
        super(__deepMerge({
            metas: {
                id: 'SComponentProxy',
            },
        }, settings || {}));
        this.component = Object.assign({ default: null, metas: {}, preview: '', define: null, DEFAULT_PROPS: {}, $element: null }, component);
        for (let [id, adapter] of Object.entries(SComponentProxy._registeredAdapter)) {
            if (adapter.test(this.component)) {
                this.adapter = adapter;
                break;
            }
        }
        if (!this.adapter) {
            console.log('[SComponentProxy] Passed component:', this.component);
            throw new Error(`[SComponentProxy] Sorry but no adapter has been found to handle the passed component`);
        }
    }
    /**
     * @name            registerAdapter
     * @type            Function
     * @static
     *
     * This static method allows you to register a new component adapter for different frameworks, etc...
     *
     * @param       {ISComponentProxyAdapter}       adapter             The adapter to register
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static registerAdapter(adapter) {
        if (SComponentProxy._registeredAdapter[adapter.id]) {
            throw new Error(`[SComponentProxy.registerAdapter] Sorry but an adapter with the id "${adapter.id}" does already exists`);
        }
        SComponentProxy._registeredAdapter[adapter.id] = adapter;
    }
    // _apply(component: ISComponentProxyComponent): any {
    //     if (!component) return;
    //     this.component.default = component;
    //     return component;
    // }
    /**
     * @name            create
     * @type            Function
     *
     * This method allows you to create a component through the adapter
     *
     * @param       {any}           props           The properties you want to set
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    create(settings) {
        this.adapter.create(this.component, settings);
    }
    /**
     * @name            setProps
     * @type            Function
     *
     * This method allows you to set the properties of a component
     *
     * @param       {any}           props           The properties you want to set
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    setProps(props) {
        this.adapter.setProps(this.component, props);
    }
}
/**
 * Store the registered adapters in { id: adapter } key pair object
 */
SComponentProxy._registeredAdapter = {};
// register default adapters
SComponentProxy.registerAdapter(__mitosisWebcomponentAdapter);
SComponentProxy.registerAdapter(__reactAdapter);
export default SComponentProxy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLDRCQUE0QixNQUFNLHVDQUF1QyxDQUFDO0FBQ2pGLE9BQU8sY0FBYyxNQUFNLHlCQUF5QixDQUFDO0FBZ0VyRCxNQUFNLGVBQWdCLFNBQVEsUUFBUTtJQWlEbEM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDSSxTQUFvQyxFQUNwQyxRQUE0QztRQUU1QyxLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksS0FBSyxFQUFFO2dCQUNILEVBQUUsRUFBRSxpQkFBaUI7YUFDeEI7U0FDSixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQUNGLElBQUksQ0FBQyxTQUFTLG1CQUNWLE9BQU8sRUFBRSxJQUFJLEVBQ2IsS0FBSyxFQUFFLEVBQUUsRUFDVCxPQUFPLEVBQUUsRUFBRSxFQUNYLE1BQU0sRUFBRSxJQUFJLEVBQ1osYUFBYSxFQUFFLEVBQUUsRUFDakIsUUFBUSxFQUFFLElBQUksSUFDWCxTQUFTLENBQ2YsQ0FBQztRQUVGLEtBQUssSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUNwQyxlQUFlLENBQUMsa0JBQWtCLENBQ3JDLEVBQUU7WUFDQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztnQkFDdkIsTUFBTTthQUNUO1NBQ0o7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ25FLE1BQU0sSUFBSSxLQUFLLENBQ1gsc0ZBQXNGLENBQ3pGLENBQUM7U0FDTDtJQUNMLENBQUM7SUF0RUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQWdDO1FBQ25ELElBQUksZUFBZSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNoRCxNQUFNLElBQUksS0FBSyxDQUNYLHVFQUF1RSxPQUFPLENBQUMsRUFBRSx1QkFBdUIsQ0FDM0csQ0FBQztTQUNMO1FBQ0QsZUFBZSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUM7SUFDN0QsQ0FBQztJQXFERCxzREFBc0Q7SUFDdEQsOEJBQThCO0lBQzlCLDBDQUEwQztJQUMxQyx3QkFBd0I7SUFDeEIsSUFBSTtJQUVKOzs7Ozs7Ozs7O09BVUc7SUFDSCxNQUFNLENBQUMsUUFBaUQ7UUFDcEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFFBQVEsQ0FBQyxLQUFVO1FBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNqRCxDQUFDOztBQS9HRDs7R0FFRztBQUNJLGtDQUFrQixHQUE0QyxFQUFFLENBQUM7QUErRzVFLDRCQUE0QjtBQUM1QixlQUFlLENBQUMsZUFBZSxDQUFDLDRCQUE0QixDQUFDLENBQUM7QUFDOUQsZUFBZSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUVoRCxlQUFlLGVBQWUsQ0FBQyJ9