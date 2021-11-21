export default function (env) {
    if (env.platform !== 'node') return;

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
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
    };
}
