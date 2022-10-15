"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const object_1 = require("@coffeekraken/sugar/object");
const mitosisWebcomponentAdapter_1 = __importDefault(require("./adapters/mitosisWebcomponentAdapter"));
const reactAdapter_1 = __importDefault(require("./adapters/reactAdapter"));
class SComponentProxy extends s_class_1.default {
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
        super((0, object_1.__deepMerge)({
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
SComponentProxy.registerAdapter(mitosisWebcomponentAdapter_1.default);
SComponentProxy.registerAdapter(reactAdapter_1.default);
exports.default = SComponentProxy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBRTdDLHVEQUF5RDtBQUN6RCx1R0FBaUY7QUFDakYsMkVBQXFEO0FBZ0VyRCxNQUFNLGVBQWdCLFNBQVEsaUJBQVE7SUFpRGxDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksU0FBb0MsRUFDcEMsUUFBNEM7UUFFNUMsS0FBSyxDQUNELElBQUEsb0JBQVcsRUFDUDtZQUNJLEtBQUssRUFBRTtnQkFDSCxFQUFFLEVBQUUsaUJBQWlCO2FBQ3hCO1NBQ0osRUFDRCxRQUFRLElBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFDRixJQUFJLENBQUMsU0FBUyxtQkFDVixPQUFPLEVBQUUsSUFBSSxFQUNiLEtBQUssRUFBRSxFQUFFLEVBQ1QsT0FBTyxFQUFFLEVBQUUsRUFDWCxNQUFNLEVBQUUsSUFBSSxFQUNaLGFBQWEsRUFBRSxFQUFFLEVBQ2pCLFFBQVEsRUFBRSxJQUFJLElBQ1gsU0FBUyxDQUNmLENBQUM7UUFFRixLQUFLLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FDcEMsZUFBZSxDQUFDLGtCQUFrQixDQUNyQyxFQUFFO1lBQ0MsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Z0JBQ3ZCLE1BQU07YUFDVDtTQUNKO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuRSxNQUFNLElBQUksS0FBSyxDQUNYLHNGQUFzRixDQUN6RixDQUFDO1NBQ0w7SUFDTCxDQUFDO0lBdEVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFnQztRQUNuRCxJQUFJLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDaEQsTUFBTSxJQUFJLEtBQUssQ0FDWCx1RUFBdUUsT0FBTyxDQUFDLEVBQUUsdUJBQXVCLENBQzNHLENBQUM7U0FDTDtRQUNELGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDO0lBQzdELENBQUM7SUFxREQsc0RBQXNEO0lBQ3RELDhCQUE4QjtJQUM5QiwwQ0FBMEM7SUFDMUMsd0JBQXdCO0lBQ3hCLElBQUk7SUFFSjs7Ozs7Ozs7OztPQVVHO0lBQ0gsTUFBTSxDQUFDLFFBQWlEO1FBQ3BELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxRQUFRLENBQUMsS0FBVTtRQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDakQsQ0FBQzs7QUEvR0Q7O0dBRUc7QUFDSSxrQ0FBa0IsR0FBNEMsRUFBRSxDQUFDO0FBK0c1RSw0QkFBNEI7QUFDNUIsZUFBZSxDQUFDLGVBQWUsQ0FBQyxvQ0FBNEIsQ0FBQyxDQUFDO0FBQzlELGVBQWUsQ0FBQyxlQUFlLENBQUMsc0JBQWMsQ0FBQyxDQUFDO0FBRWhELGtCQUFlLGVBQWUsQ0FBQyJ9