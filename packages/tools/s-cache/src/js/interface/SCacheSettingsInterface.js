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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NhY2hlU2V0dGluZ3NJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zLWNhY2hlL3NyYy9qcy9pbnRlcmZhY2UvU0NhY2hlU2V0dGluZ3NJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsVUFBVTs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsNEVBQXFEO0lBQ3JELGtGQUE4RDtJQUU5RDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE1BQU0sdUJBQXdCLFNBQVEscUJBQVk7O0lBQ3pDLGtDQUFVLEdBQUc7UUFDbEIsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLFFBQVE7WUFDZCxRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRSxRQUFRO1NBQ2xCO1FBQ0QsR0FBRyxFQUFFO1lBQ0gsSUFBSSxFQUFFLFFBQVE7WUFDZCxRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDWjtRQUNELGNBQWMsRUFBRTtZQUNkLElBQUksRUFBRSxTQUFTO1lBQ2YsUUFBUSxFQUFFLElBQUk7WUFDZCxPQUFPLEVBQUUsSUFBSTtTQUNkO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLFFBQVE7WUFDZCxRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRSxjQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJO1NBQ2xDO1FBQ0QsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLFVBQVU7WUFDaEIsUUFBUSxFQUFFLElBQUk7WUFDZCxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDcEI7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsVUFBVTtZQUNoQixRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUztTQUN4QjtLQUNGLENBQUM7SUFFSixrQkFBZSx1QkFBdUIsQ0FBQyJ9