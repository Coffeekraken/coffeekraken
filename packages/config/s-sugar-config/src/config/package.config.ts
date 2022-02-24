export default function (env) {
    if (env.platform !== 'node') return;

    return {
        /**
         * @name            manager
         * @namespace       config.package
         * @type            String
         * @values          npm | yarn
         * @default         yarn
         *
         * Specify the package manager you want to use.
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        manager: 'yarn'
    };
}
