export default function (env, config) {
    if (env.platform !== 'node') return;

    return {
        html: {
            /**
             * @name        classPrefix
             * @namespace   config.docblockRenderer.html
             * @type        String
             * @default     s-
             *
             * This define the class prefix applied when rendering a docblock in html
             *
             * @since       2.0.0
             * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            classPrefix: 's-',
        },
    };
}
