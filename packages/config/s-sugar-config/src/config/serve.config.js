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
    exports.postprocess = void 0;
    function postprocess(env, serveConfig, config) {
        return serveConfig;
    }
    exports.postprocess = postprocess;
    exports.default = (env, config) => {
        return {
            img: {
                /**
                 * @name            url
                 * @namespace       config.serve.img
                 * @type            String
                 * @default         /dist/img
                 *
                 * Specify the serving img folder path to use in your views
                 *
                 * @since           2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                url: '/dist/img',
            },
            js: {
                /**
                 * @name            url
                 * @namespace       config.serve.js
                 * @type            String
                 * @default         /dist/js
                 *
                 * Specify the serving js folder path to use in your views
                 *
                 * @since           2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                url: '/dist/js',
            },
            css: {
                /**
                 * @name            url
                 * @namespace       config.serve.css
                 * @type            String
                 * @default         /dist/css
                 *
                 * Specify the serving css folder path to use in your views
                 *
                 * @since           2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                url: '/dist/css',
            },
            icons: {
                /**
                 * @name            url
                 * @namespace       config.serve.icons
                 * @type            String
                 * @default         /dist/icons
                 *
                 * Specify the serving icons folder path to use in your views
                 *
                 * @since           2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                url: '/dist/icons',
            },
            fonts: {
                /**
                 * @name            url
                 * @namespace       config.serve.fonts
                 * @type            String
                 * @default         /dist/fonts
                 *
                 * Specify the serving fonts folder path to use in your views
                 *
                 * @since           2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                url: '/dist/fonts',
            },
            cache: {
                /**
                 * @name            url
                 * @namespace       config.serve.cache
                 * @type            String
                 * @default         /cache
                 *
                 * Specify the serving cache folder path to use in your views
                 *
                 * @since           2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                url: '/cache',
            },
        };
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmUuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQUVBLFNBQWdCLFdBQVcsQ0FBQyxHQUFHLEVBQUUsV0FBVyxFQUFFLE1BQU07UUFDaEQsT0FBTyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQUZELGtDQUVDO0lBRUQsa0JBQWUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDM0IsT0FBTztZQUNILEdBQUcsRUFBRTtnQkFDRDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsV0FBVzthQUNuQjtZQUNELEVBQUUsRUFBRTtnQkFDQTs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsVUFBVTthQUNsQjtZQUNELEdBQUcsRUFBRTtnQkFDRDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsV0FBVzthQUNuQjtZQUNELEtBQUssRUFBRTtnQkFDSDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsYUFBYTthQUNyQjtZQUNELEtBQUssRUFBRTtnQkFDSDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsYUFBYTthQUNyQjtZQUNELEtBQUssRUFBRTtnQkFDSDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsUUFBUTthQUNoQjtTQUNKLENBQUM7SUFDTixDQUFDLENBQUMifQ==