"use strict";
// TODO: doc
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
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
        console: `${__dirname}/../shared/log/adapters/SLogConsoleAdapter`
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvZy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFlBQVk7O0FBRVosa0JBQWU7SUFDYjs7Ozs7Ozs7Ozs7Ozs7OztPQWdCRztJQUNILEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDO0lBRW5DLFFBQVEsRUFBRTtRQUNSLE9BQU8sRUFBRSxHQUFHLFNBQVMsNENBQTRDO0tBQ2xFO0lBQ0QsZUFBZSxFQUFFO1FBQ2YsR0FBRyxFQUFFLElBQUk7UUFDVCxJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxJQUFJO1FBQ1YsS0FBSyxFQUFFLElBQUk7UUFDWCxLQUFLLEVBQUUsSUFBSTtLQUNaO0lBQ0QscUJBQXFCLEVBQUU7UUFDckIsSUFBSSxFQUFFLElBQUk7UUFDVixXQUFXLEVBQUUsSUFBSTtRQUNqQixVQUFVLEVBQUUsSUFBSTtLQUNqQjtJQUNELHFCQUFxQixFQUFFLElBQUk7SUFDM0IsdUJBQXVCLEVBQUUsT0FBTztDQUNqQyxDQUFDIn0=