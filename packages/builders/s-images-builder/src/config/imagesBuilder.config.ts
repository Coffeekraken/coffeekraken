export default function (env, config) {
    if (env.platform !== 'node') return;

    return {
        /**
         * @name            glob
         * @namespace       config.imagesBuilder
         * @type            String
         * @default         [config.imagesBuilder.inDir]/** /*
         *
         * Specify a glob pattern relative to the "inDir" to specify files you want to compress
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        glob: '**/*',

        /**
         * @name            compressExts
         * @namespace       config.imagesBuilder
         * @type            String
         * @default         ['jpg', 'jpeg', 'png', 'svg', 'webp']
         *
         * Specify a which file extensions you want to compress
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        compressExts: ['jpg', 'jpeg', 'png', 'svg', 'webp'],

        /**
         * @name            inDir
         * @namespace       config.imagesBuilder
         * @type            String
         * @default         [config.storage.src.imgDir]
         *
         * Specify a directory from where you want to  compress files
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        inDir: '[config.storage.src.imgDir]',

        /**
         * @name            outDir
         * @namespace       config.imagesBuilder
         * @type            String
         * @default         [config.storage.dist.imgDir]
         *
         * Specify a directory where you want to put the compressed files
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        outDir: '[config.storage.dist.imgDir]',

        /**
         * @name            quality
         * @namespace       config.imagesBuilder
         * @type            Number
         * @default         80
         *
         * Specify an overall quality percentage that you want to target
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        quality: 80,

        /**
         * @name            webp
         * @namespace       config.imagesBuilder
         * @type            Boolean
         * @default         true
         *
         * Specify if you want to generate a webp version of each images
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        webp: true,

        /**
         * @name            width
         * @namespace       config.imagesBuilder
         * @type            Number
         * @default         null
         *
         * Specify a max width you want your resolution 1 images to target
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        width: null,

        /**
         * @name            height
         * @namespace       config.imagesBuilder
         * @type            Number
         * @default         null
         *
         * Specify a max height you want your resolution 1 images to target
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        height: null,

        /**
         * @name            resolution
         * @namespace       config.imagesBuilder
         * @type            Array<Integer>
         * @default         [1,2]
         *
         * Specify some resolutions you want your images to be generated
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        resolution: [1, 2],

        /**
         * @name            clear
         * @namespace       config.imagesBuilder
         * @type            Boolean
         * @default         true
         *
         * Specify if you want to clear the outDir before the generation
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        clear: true,

        /**
         * @name            specificParams
         * @namespace       config.imagesBuilder
         * @type            Record<string, ISimagesBuilderCompressParams>
         * @default         {}
         *
         * Specify some custom params for some files by using a glob (relative to the params.inDir) as object key, and
         * an object of custom params as value like so:
         *
         * @example         js
         * export default {
         *      specificParams: {
         *          'myCoolFolder/*': {
         *              quality: 20
         *          }
         *      }
         * }
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        specificParams: {},
    };
}
