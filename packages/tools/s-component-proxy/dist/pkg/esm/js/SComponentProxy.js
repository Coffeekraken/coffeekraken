var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __webcomponentAdapter from './adapters/webcomponentAdapter';
// import __reactAdapter from './adapters/reactAdapter';
import __vue3Adapter from './adapters/vue3Adapter';
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
        this.component = Object.assign({ default: null, path: null, metas: {}, preview: '', define: null, DEFAULT_PROPS: {}, $element: null }, component);
        for (let [id, adapter] of Object.entries(SComponentProxy._registeredAdapter)) {
            if (adapter.test(this.component)) {
                console.log('OUN', adapter.id);
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
    /**
     * @name            load
     * @type            Function
     * @async
     *
     * This method allows you to load the component you want to use
     *
     * @param       {any}           props           The properties you want to set
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    load(settings) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.adapter.load) {
                return yield import(this.component.path);
            }
            return yield this.adapter.load(this.component, settings);
        });
    }
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
SComponentProxy.registerAdapter(__webcomponentAdapter);
// SComponentProxy.registerAdapter(__reactAdapter);
SComponentProxy.registerAdapter(__vue3Adapter);
export default SComponentProxy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLHFCQUFxQixNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLHdEQUF3RDtBQUN4RCxPQUFPLGFBQWEsTUFBTSx3QkFBd0IsQ0FBQztBQW1FbkQsTUFBTSxlQUFnQixTQUFRLFFBQVE7SUFpRGxDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksU0FBb0MsRUFDcEMsUUFBNEM7UUFFNUMsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLEtBQUssRUFBRTtnQkFDSCxFQUFFLEVBQUUsaUJBQWlCO2FBQ3hCO1NBQ0osRUFDRCxRQUFRLElBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFDRixJQUFJLENBQUMsU0FBUyxtQkFDVixPQUFPLEVBQUUsSUFBSSxFQUNiLElBQUksRUFBRSxJQUFJLEVBQ1YsS0FBSyxFQUFFLEVBQUUsRUFDVCxPQUFPLEVBQUUsRUFBRSxFQUNYLE1BQU0sRUFBRSxJQUFJLEVBQ1osYUFBYSxFQUFFLEVBQUUsRUFDakIsUUFBUSxFQUFFLElBQUksSUFDWCxTQUFTLENBQ2YsQ0FBQztRQUVGLEtBQUssSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUNwQyxlQUFlLENBQUMsa0JBQWtCLENBQ3JDLEVBQUU7WUFDQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBRS9CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2dCQUN2QixNQUFNO2FBQ1Q7U0FDSjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbkUsTUFBTSxJQUFJLEtBQUssQ0FDWCxzRkFBc0YsQ0FDekYsQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQXpFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBZ0M7UUFDbkQsSUFBSSxlQUFlLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ2hELE1BQU0sSUFBSSxLQUFLLENBQ1gsdUVBQXVFLE9BQU8sQ0FBQyxFQUFFLHVCQUF1QixDQUMzRyxDQUFDO1NBQ0w7UUFDRCxlQUFlLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQztJQUM3RCxDQUFDO0lBd0REOzs7Ozs7Ozs7OztPQVdHO0lBQ0csSUFBSSxDQUFDLFFBQWtEOztZQUN6RCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7Z0JBQ3BCLE9BQU8sTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM1QztZQUNELE9BQU8sTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzdELENBQUM7S0FBQTtJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxNQUFNLENBQUMsUUFBa0Q7UUFDckQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFFBQVEsQ0FBQyxLQUFVO1FBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNqRCxDQUFDOztBQS9IRDs7R0FFRztBQUNJLGtDQUFrQixHQUE0QyxFQUFFLENBQUM7QUErSDVFLDRCQUE0QjtBQUM1QixlQUFlLENBQUMsZUFBZSxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDdkQsbURBQW1EO0FBQ25ELGVBQWUsQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFL0MsZUFBZSxlQUFlLENBQUMifQ==