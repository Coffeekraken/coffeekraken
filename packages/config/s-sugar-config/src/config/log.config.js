// TODO: doc
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export default {
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
        console: `${__dirname()}/../shared/log/adapters/SLogConsoleAdapter`
    },
    adaptersByLevel: {
        log: null,
        info: null,
        warn: null,
        debug: null,
        error: null
    },
    adaptersByEnvironment: {
        test: null,
        development: null,
        production: null
    },
    overrideNativeConsole: true,
    invisibleSplitCharacter: '‏‏‎ ‎'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvZy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWTtBQUVaLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBRTVELGVBQWU7SUFDYjs7Ozs7Ozs7Ozs7Ozs7OztPQWdCRztJQUNILEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDO0lBRW5DLFFBQVEsRUFBRTtRQUNSLE9BQU8sRUFBRSxHQUFHLFNBQVMsRUFBRSw0Q0FBNEM7S0FDcEU7SUFDRCxlQUFlLEVBQUU7UUFDZixHQUFHLEVBQUUsSUFBSTtRQUNULElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLElBQUk7UUFDVixLQUFLLEVBQUUsSUFBSTtRQUNYLEtBQUssRUFBRSxJQUFJO0tBQ1o7SUFDRCxxQkFBcUIsRUFBRTtRQUNyQixJQUFJLEVBQUUsSUFBSTtRQUNWLFdBQVcsRUFBRSxJQUFJO1FBQ2pCLFVBQVUsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QscUJBQXFCLEVBQUUsSUFBSTtJQUMzQix1QkFBdUIsRUFBRSxPQUFPO0NBQ2pDLENBQUMifQ==