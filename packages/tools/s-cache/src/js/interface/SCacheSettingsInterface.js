// @shared
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/sugar/src/shared/interface/_SInterface", "@coffeekraken/sugar/src/shared/is/node"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _SInterface_1 = __importDefault(require("@coffeekraken/sugar/src/shared/interface/_SInterface"));
    var node_1 = __importDefault(require("@coffeekraken/sugar/src/shared/is/node"));
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
    var SCacheSettingsInterface = /** @class */ (function (_super) {
        __extends(SCacheSettingsInterface, _super);
        function SCacheSettingsInterface() {
            return _super !== null && _super.apply(this, arguments) || this;
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
        return SCacheSettingsInterface;
    }(_SInterface_1.default));
    exports.default = SCacheSettingsInterface;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NhY2hlU2V0dGluZ3NJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ2FjaGVTZXR0aW5nc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFVixxR0FBZ0Y7SUFDaEYsZ0ZBQThEO0lBRTlEOzs7Ozs7Ozs7OztPQVdHO0lBQ0g7UUFBc0MsMkNBQVk7UUFBbEQ7O1FBaUNBLENBQUM7UUFoQ1Esa0NBQVUsR0FBRztZQUNsQixJQUFJLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLFFBQVE7YUFDbEI7WUFDRCxHQUFHLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLENBQUMsQ0FBQzthQUNaO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSxTQUFTO2dCQUNmLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxJQUFJO2FBQ2Q7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLGNBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUk7YUFDbEM7WUFDRCxLQUFLLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSzthQUNwQjtZQUNELFNBQVMsRUFBRTtnQkFDVCxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTO2FBQ3hCO1NBQ0YsQ0FBQztRQUNKLDhCQUFDO0tBQUEsQUFqQ0QsQ0FBc0MscUJBQVksR0FpQ2pEO0lBQ0Qsa0JBQWUsdUJBQXVCLENBQUMifQ==