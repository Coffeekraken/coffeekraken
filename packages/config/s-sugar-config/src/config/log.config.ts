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
