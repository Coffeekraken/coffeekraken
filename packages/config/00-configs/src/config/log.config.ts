// TODO: doc

export default function (api) {
    if (api.env.platform !== 'node') return;

    return {
        /**
         * @name        types
         * @namespace     config.log
         * @type        String[]
         * @values      false,info,warning,error,verbose
         * @default      ['info','warning','error']
         *
         * Set the log types you want for your app.
         * - false: No log at all
         * - info: Default logs
         * - warning: Display the warnings
         * - error: Display the errors
         * - verbose: Detailed logs
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        types: ['info', 'warning', 'error'],
    };
}
