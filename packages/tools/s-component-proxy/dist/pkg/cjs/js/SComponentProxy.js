"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const object_1 = require("@coffeekraken/sugar/object");
const webcomponentAdapter_1 = __importDefault(require("./adapters/webcomponentAdapter"));
// import __reactAdapter from './adapters/reactAdapter';
const vue3Adapter_1 = __importDefault(require("./adapters/vue3Adapter"));
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
                return yield Promise.resolve().then(() => __importStar(require(this.component.path)));
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
SComponentProxy.registerAdapter(webcomponentAdapter_1.default);
// SComponentProxy.registerAdapter(__reactAdapter);
SComponentProxy.registerAdapter(vue3Adapter_1.default);
exports.default = SComponentProxy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFFN0MsdURBQXlEO0FBQ3pELHlGQUFtRTtBQUNuRSx3REFBd0Q7QUFDeEQseUVBQW1EO0FBbUVuRCxNQUFNLGVBQWdCLFNBQVEsaUJBQVE7SUFpRGxDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksU0FBb0MsRUFDcEMsUUFBNEM7UUFFNUMsS0FBSyxDQUNELElBQUEsb0JBQVcsRUFDUDtZQUNJLEtBQUssRUFBRTtnQkFDSCxFQUFFLEVBQUUsaUJBQWlCO2FBQ3hCO1NBQ0osRUFDRCxRQUFRLElBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFDRixJQUFJLENBQUMsU0FBUyxtQkFDVixPQUFPLEVBQUUsSUFBSSxFQUNiLElBQUksRUFBRSxJQUFJLEVBQ1YsS0FBSyxFQUFFLEVBQUUsRUFDVCxPQUFPLEVBQUUsRUFBRSxFQUNYLE1BQU0sRUFBRSxJQUFJLEVBQ1osYUFBYSxFQUFFLEVBQUUsRUFDakIsUUFBUSxFQUFFLElBQUksSUFDWCxTQUFTLENBQ2YsQ0FBQztRQUVGLEtBQUssSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUNwQyxlQUFlLENBQUMsa0JBQWtCLENBQ3JDLEVBQUU7WUFDQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBRS9CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2dCQUN2QixNQUFNO2FBQ1Q7U0FDSjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbkUsTUFBTSxJQUFJLEtBQUssQ0FDWCxzRkFBc0YsQ0FDekYsQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQXpFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBZ0M7UUFDbkQsSUFBSSxlQUFlLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ2hELE1BQU0sSUFBSSxLQUFLLENBQ1gsdUVBQXVFLE9BQU8sQ0FBQyxFQUFFLHVCQUF1QixDQUMzRyxDQUFDO1NBQ0w7UUFDRCxlQUFlLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQztJQUM3RCxDQUFDO0lBd0REOzs7Ozs7Ozs7OztPQVdHO0lBQ0csSUFBSSxDQUFDLFFBQWtEOztZQUN6RCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7Z0JBQ3BCLE9BQU8sd0RBQWEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUMsQ0FBQzthQUM1QztZQUNELE9BQU8sTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzdELENBQUM7S0FBQTtJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxNQUFNLENBQUMsUUFBa0Q7UUFDckQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFFBQVEsQ0FBQyxLQUFVO1FBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNqRCxDQUFDOztBQS9IRDs7R0FFRztBQUNJLGtDQUFrQixHQUE0QyxFQUFFLENBQUM7QUErSDVFLDRCQUE0QjtBQUM1QixlQUFlLENBQUMsZUFBZSxDQUFDLDZCQUFxQixDQUFDLENBQUM7QUFDdkQsbURBQW1EO0FBQ25ELGVBQWUsQ0FBQyxlQUFlLENBQUMscUJBQWEsQ0FBQyxDQUFDO0FBRS9DLGtCQUFlLGVBQWUsQ0FBQyJ9