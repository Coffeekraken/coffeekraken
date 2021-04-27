// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/s-interface", "@coffeekraken/sugar/src/shared/is/node"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
    const node_1 = __importDefault(require("@coffeekraken/sugar/src/shared/is/node"));
    /**
     * @name            SCacheSettingsInterface
     * @namespace       sugar.js.cache.interface
     * @type            Class
     * @extends         SInterface
     * @status          beta
     *
     * Represent the SCache settings interface
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    class SCacheSettingsInterface extends s_interface_1.default {
    }
    SCacheSettingsInterface.definition = {
        name: {
            type: 'String',
            required: true,
            default: 'SCache'
        },
        ttl: {
            type: 'Number',
            required: true,
            default: -1
        },
        deleteOnExpire: {
            type: 'Boolean',
            required: true,
            default: true
        },
        adapter: {
            type: 'String',
            required: true,
            default: node_1.default() ? 'fs' : 'ls'
        },
        parse: {
            type: 'Function',
            required: true,
            default: JSON.parse
        },
        stringify: {
            type: 'Function',
            required: true,
            default: JSON.stringify
        }
    };
    exports.default = SCacheSettingsInterface;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NhY2hlU2V0dGluZ3NJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ2FjaGVTZXR0aW5nc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFFViw0RUFBcUQ7SUFDckQsa0ZBQThEO0lBRTlEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsTUFBTSx1QkFBd0IsU0FBUSxxQkFBWTs7SUFDekMsa0NBQVUsR0FBRztRQUNsQixJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsUUFBUTtZQUNkLFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFLFFBQVE7U0FDbEI7UUFDRCxHQUFHLEVBQUU7WUFDSCxJQUFJLEVBQUUsUUFBUTtZQUNkLFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUNaO1FBQ0QsY0FBYyxFQUFFO1lBQ2QsSUFBSSxFQUFFLFNBQVM7WUFDZixRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRSxJQUFJO1NBQ2Q7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsUUFBUTtZQUNkLFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFLGNBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUk7U0FDbEM7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsVUFBVTtZQUNoQixRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSztTQUNwQjtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxVQUFVO1lBQ2hCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQ3hCO0tBQ0YsQ0FBQztJQUVKLGtCQUFlLHVCQUF1QixDQUFDIn0=