// @shared
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
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
        define(["require", "exports", "../../is/node", "../../interface/SInterface"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var node_1 = __importDefault(require("../../is/node"));
    var SInterface_1 = __importDefault(require("../../interface/SInterface"));
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
    }(SInterface_1.default));
    exports.default = SCacheSettingsInterface;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NhY2hlU2V0dGluZ3NJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ2FjaGVTZXR0aW5nc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsdURBQXFDO0lBQ3JDLDBFQUFzRDtJQUV0RDs7Ozs7Ozs7Ozs7T0FXRztJQUNIO1FBQXNDLDJDQUFZO1FBQWxEOztRQWlDQSxDQUFDO1FBaENRLGtDQUFVLEdBQUc7WUFDbEIsSUFBSSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxRQUFRO2FBQ2xCO1lBQ0QsR0FBRyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxDQUFDLENBQUM7YUFDWjtZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsU0FBUztnQkFDZixRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsSUFBSTthQUNkO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxjQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJO2FBQ2xDO1lBQ0QsS0FBSyxFQUFFO2dCQUNMLElBQUksRUFBRSxVQUFVO2dCQUNoQixRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUs7YUFDcEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUzthQUN4QjtTQUNGLENBQUM7UUFDSiw4QkFBQztLQUFBLEFBakNELENBQXNDLG9CQUFZLEdBaUNqRDtJQUNELGtCQUFlLHVCQUF1QixDQUFDIn0=