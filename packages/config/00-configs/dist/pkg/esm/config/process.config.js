export default function (api) {
    if (api.env.platform !== 'node')
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsV0FBVyxFQUFFLElBQUk7UUFFakI7Ozs7Ozs7Ozs7OztXQVlHO1FBQ0gsS0FBSyxFQUFFLFNBQVM7UUFFaEI7Ozs7Ozs7Ozs7V0FVRztRQUNILEtBQUssRUFBRSxJQUFJO1FBRVg7Ozs7Ozs7Ozs7V0FVRztRQUNILFNBQVMsRUFBRSxLQUFLO1FBRWhCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxVQUFVLEVBQUUsS0FBSztRQUVqQjs7Ozs7Ozs7Ozs7V0FXRztRQUNILFdBQVcsRUFBRSxJQUFJO0tBQ3BCLENBQUM7QUFDTixDQUFDIn0=