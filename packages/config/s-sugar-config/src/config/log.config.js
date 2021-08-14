// TODO: doc
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export default function (env, config) {
    if (env.platform !== 'node')
        return;
    return {
        /**
         * @name        types
         * @namespace     config.log
         * @type        String[]
         * @values      false,info,warning,error,verbose
         * @defaul      ['info','warning','error']
         *
         * Set the log types you want for your app.
         * - false: No log at all
         * - info: Default logs
         * - warning: Display the warnings
         * - error: Display the errors
         * - verbose: Detailed logs
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        types: ['info', 'warning', 'error'],
        adapters: {
            console: `${__dirname()}/../shared/log/adapters/SLogConsoleAdapter`,
        },
        adaptersByLevel: {
            log: null,
            info: null,
            warn: null,
            debug: null,
            error: null,
        },
        adaptersByEnvironment: {
            test: null,
            development: null,
            production: null,
        },
        overrideNativeConsole: true,
        invisibleSplitCharacter: '‏‏‎ ‎',
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvZy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWTtBQUVaLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBRTVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRyxFQUFFLE1BQU07SUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXBDLE9BQU87UUFDSDs7Ozs7Ozs7Ozs7Ozs7OztXQWdCRztRQUNILEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDO1FBRW5DLFFBQVEsRUFBRTtZQUNOLE9BQU8sRUFBRSxHQUFHLFNBQVMsRUFBRSw0Q0FBNEM7U0FDdEU7UUFDRCxlQUFlLEVBQUU7WUFDYixHQUFHLEVBQUUsSUFBSTtZQUNULElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxFQUFFLElBQUk7WUFDVixLQUFLLEVBQUUsSUFBSTtZQUNYLEtBQUssRUFBRSxJQUFJO1NBQ2Q7UUFDRCxxQkFBcUIsRUFBRTtZQUNuQixJQUFJLEVBQUUsSUFBSTtZQUNWLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFVBQVUsRUFBRSxJQUFJO1NBQ25CO1FBQ0QscUJBQXFCLEVBQUUsSUFBSTtRQUMzQix1QkFBdUIsRUFBRSxPQUFPO0tBQ25DLENBQUM7QUFDTixDQUFDIn0=