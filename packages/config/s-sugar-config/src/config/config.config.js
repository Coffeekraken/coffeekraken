(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function default_1(env, config) {
        return {
            browser: {
                /**
                 * @name            include
                 * @namespace       config.config.browser.include
                 * @type            Array<String>
                 * @default         ['contact', 'datetime', 'log', 'serve', 'env', 'theme']
                 *
                 * Specify which configuration you want to include for the "browser". If the array is empty, will include all the configs
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                include: ['contact', 'datetime', 'log', 'serve', 'env', 'theme'],
            },
            node: {
                /**
                 * @name            include
                 * @namespace       config.config.node.include
                 * @type            Array<String>
                 * @default         []
                 *
                 * Specify which configuration you want to include for the "browser". If the array is empty, will include all the configs
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                include: [],
            },
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbmZpZy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSxtQkFBeUIsR0FBRyxFQUFFLE1BQU07UUFDaEMsT0FBTztZQUNILE9BQU8sRUFBRTtnQkFDTDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQzthQUNuRTtZQUNELElBQUksRUFBRTtnQkFDRjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxPQUFPLEVBQUUsRUFBRTthQUNkO1NBQ0osQ0FBQztJQUNOLENBQUM7SUEvQkQsNEJBK0JDIn0=