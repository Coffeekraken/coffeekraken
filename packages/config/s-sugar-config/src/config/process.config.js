export default function (env) {
    if (env.platform !== 'node')
        return;
    return {
        /**
         * @name            asyncStart
         * @namespace       config.process
         * @type            Boolean
         * @default         false
         *
         * Specify if the process has to start asyncronously or not
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        asyncStart: false,
        /**
         * @name            killOnError
         * @namespace       config.process
         * @type            Boolean
         * @default         true
         *
         * Specify if the process has to be killed (rejected) on error
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        killOnError: true,
        /**
         * @name            emitErrorAsEvent
         * @namespace       config.process
         * @type            Boolean
         * @default         false
         *
         * Specify if the you want the thrown errors inside the promise to be emitted as "error" event
         * or if you want the default behavior and that you catch errors with a .catch or "try catch".
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        emitErrorAsEvent: false,
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
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        stdio: 'inherit',
        /**
         * @name              decorators
         * @namespace         config.process
         * @type              Boolean
         * @default           false
         *
         * Specify if you want to log decorators (start message, end message, etc...)
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        decorators: false,
        /**
         * @name          throw
         * @namespace         config.process
         * @type          Boolean
         * @default       true
         *
         * Specify if you want to process class to throw errors when some happend
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        processPath: null,
        /**
         * @name      notification
         * @namespace       config.process
         * @type        Boolean
         * @default         '[config.notification]'
         *
         * Notification settings
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        notification: '[config.notification]',
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzcy5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9jZXNzLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXBDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsVUFBVSxFQUFFLEtBQUs7UUFFakI7Ozs7Ozs7Ozs7V0FVRztRQUNILFdBQVcsRUFBRSxJQUFJO1FBRWpCOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsZ0JBQWdCLEVBQUUsS0FBSztRQUV2Qjs7Ozs7Ozs7Ozs7O1dBWUc7UUFDSCxLQUFLLEVBQUUsU0FBUztRQUVoQjs7Ozs7Ozs7OztXQVVHO1FBQ0gsVUFBVSxFQUFFLEtBQUs7UUFFakI7Ozs7Ozs7Ozs7V0FVRztRQUNILEtBQUssRUFBRSxJQUFJO1FBRVg7Ozs7Ozs7Ozs7V0FVRztRQUNILFNBQVMsRUFBRSxLQUFLO1FBRWhCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxVQUFVLEVBQUUsS0FBSztRQUVqQjs7Ozs7Ozs7Ozs7V0FXRztRQUNILFdBQVcsRUFBRSxJQUFJO1FBRWpCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxZQUFZLEVBQUUsdUJBQXVCO0tBQ3hDLENBQUM7QUFDTixDQUFDIn0=