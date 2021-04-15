var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/s-interface"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
    /**
     * @name                SColorApplyParamsInterface
     * @namespace           sugar.node.svelte.compile.interface
     * @type                Class
     * @extends             SInterface
     * @status              wip
     *
     * This class represent the interface that describe parameters of the SSvelteCompiler
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    class SColorApplyParamsInterface extends s_interface_1.default {
    }
    SColorApplyParamsInterface.definition = {
        desaturate: {
            type: 'Number',
            default: 0,
            alias: 'd',
            description: 'Allows you to desaturate the color using a percentage'
        },
        saturate: {
            type: 'Number',
            default: 0,
            alias: 's',
            description: 'Allows you to saturate the color using a percentage'
        },
        greyscale: {
            type: 'Boolean',
            default: false,
            alias: 'g',
            description: 'Allows you to get back the grayscale version of your color'
        },
        spin: {
            type: 'Number',
            default: 0,
            description: 'Spin the hue on the passed value (max 360)'
        },
        transparentize: {
            type: 'Number',
            default: 0,
            description: 'The amount of transparence to apply between 0-100|0-1'
        },
        alpha: {
            type: 'Number',
            default: 0,
            alias: 'a',
            description: 'The new alpha value to apply between 0-100|0-1'
        },
        opacity: {
            type: 'Number',
            default: 0,
            alias: 'o',
            description: 'The new alpha value to apply between 0-100|0-1'
        },
        opacify: {
            type: 'Number',
            default: 0,
            description: 'The amount of transparence to remove between 0-100|0-1'
        },
        darken: {
            type: 'Number',
            default: 0,
            description: 'The amount of darkness (of the nightmare of the shadow) to apply between 0-100'
        },
        lighten: {
            type: 'Number',
            default: 0,
            alias: 'l',
            description: 'The amount of lightness (of the sky of the angels) to apply between 0-100'
        }
    };
    exports.default = SColorApplyParamsInterface;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbG9yQXBwbHlQYXJhbXNJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ29sb3JBcHBseVBhcmFtc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUNBLDRFQUFxRDtJQUVyRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxNQUFNLDBCQUEyQixTQUFRLHFCQUFZOztJQUM1QyxxQ0FBVSxHQUFHO1FBQ2xCLFVBQVUsRUFBRTtZQUNWLElBQUksRUFBRSxRQUFRO1lBQ2QsT0FBTyxFQUFFLENBQUM7WUFDVixLQUFLLEVBQUUsR0FBRztZQUNWLFdBQVcsRUFBRSx1REFBdUQ7U0FDckU7UUFDRCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsUUFBUTtZQUNkLE9BQU8sRUFBRSxDQUFDO1lBQ1YsS0FBSyxFQUFFLEdBQUc7WUFDVixXQUFXLEVBQUUscURBQXFEO1NBQ25FO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLFNBQVM7WUFDZixPQUFPLEVBQUUsS0FBSztZQUNkLEtBQUssRUFBRSxHQUFHO1lBQ1YsV0FBVyxFQUFFLDREQUE0RDtTQUMxRTtRQUNELElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxRQUFRO1lBQ2QsT0FBTyxFQUFFLENBQUM7WUFDVixXQUFXLEVBQUUsNENBQTRDO1NBQzFEO1FBQ0QsY0FBYyxFQUFFO1lBQ2QsSUFBSSxFQUFFLFFBQVE7WUFDZCxPQUFPLEVBQUUsQ0FBQztZQUNWLFdBQVcsRUFBRSx1REFBdUQ7U0FDckU7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsUUFBUTtZQUNkLE9BQU8sRUFBRSxDQUFDO1lBQ1YsS0FBSyxFQUFFLEdBQUc7WUFDVixXQUFXLEVBQUUsZ0RBQWdEO1NBQzlEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLFFBQVE7WUFDZCxPQUFPLEVBQUUsQ0FBQztZQUNWLEtBQUssRUFBRSxHQUFHO1lBQ1YsV0FBVyxFQUFFLGdEQUFnRDtTQUM5RDtRQUNELE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxRQUFRO1lBQ2QsT0FBTyxFQUFFLENBQUM7WUFDVixXQUFXLEVBQUUsd0RBQXdEO1NBQ3RFO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLFFBQVE7WUFDZCxPQUFPLEVBQUUsQ0FBQztZQUNWLFdBQVcsRUFDVCxnRkFBZ0Y7U0FDbkY7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsUUFBUTtZQUNkLE9BQU8sRUFBRSxDQUFDO1lBQ1YsS0FBSyxFQUFFLEdBQUc7WUFDVixXQUFXLEVBQ1QsMkVBQTJFO1NBQzlFO0tBQ0YsQ0FBQztJQUdKLGtCQUFlLDBCQUEwQixDQUFDIn0=