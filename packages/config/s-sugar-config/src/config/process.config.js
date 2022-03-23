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
    function default_1(env) {
        if (env.platform !== 'node')
            return;
        return {
            /**
             * @name            killOnError
             * @namespace       config.process
             * @type            Boolean
             * @default         true
             *
             * Specify if the process has to be killed (rejected) on error
             *
             * @since           2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            killOnError: true,
            /**
             * @name              stdio
             * @namespace         config.process
             * @type              String
             * @default           inherit
             *
             * Specify the in/out style to use. Available by default:
             * - inherit: Simply log into console
             * - blessed: Take the entire screen and log items using blessed
             *
             * @since             2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            stdio: 'inherit',
            /**
             * @name          throw
             * @namespace         config.process
             * @type          Boolean
             * @default       true
             *
             * Specify if you want to process class to throw errors when some happend
             *
             * @since           2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            throw: true,
            /**
             * @name          exitAtEnd
             * @namespace         config.process
             * @type          Boolean
             * @default       false
             *
             * Specify if you want the actual node process to exist when the process has ended
             *
             * @since         2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            exitAtEnd: false,
            /**
             * @name          runAsChild
             * @namespace     config.process
             * @type          Boolean
             * @default       true
             *
             * Specify if you want the process to be runned into a child process
             *
             * @since         2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            runAsChild: false,
            /**
             * @name          processPath
             * @namespace         config.process
             * @type          String
             * @default           null
             *
             * Specify the path to the SProcess file. Usually setted automatically and used to start the process as child one
             * when specify the parameter ```runAsChild```
             *
             * @since         2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            processPath: null,
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzcy5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9jZXNzLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLG1CQUF5QixHQUFHO1FBQ3hCLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1lBQUUsT0FBTztRQUVwQyxPQUFPO1lBQ0g7Ozs7Ozs7Ozs7ZUFVRztZQUNILFdBQVcsRUFBRSxJQUFJO1lBRWpCOzs7Ozs7Ozs7Ozs7ZUFZRztZQUNILEtBQUssRUFBRSxTQUFTO1lBRWhCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxLQUFLLEVBQUUsSUFBSTtZQUVYOzs7Ozs7Ozs7O2VBVUc7WUFDSCxTQUFTLEVBQUUsS0FBSztZQUVoQjs7Ozs7Ozs7OztlQVVHO1lBQ0gsVUFBVSxFQUFFLEtBQUs7WUFFakI7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxXQUFXLEVBQUUsSUFBSTtTQUNwQixDQUFDO0lBQ04sQ0FBQztJQXJGRCw0QkFxRkMifQ==