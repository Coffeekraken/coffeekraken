export default function (env, config) {
    if (env.platform !== 'node') return;
    return {
        /**
         * @name            cache
         * @namespace       config.postcssSugarPlugin
         * @type            Boolean
         * @default         true
         *
         * Specify if you want to use the internal cache to speed up your compilations or not
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        cache: false,
    };
}
