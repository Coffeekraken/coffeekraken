export default function (api) {
    if (api.env.platform !== 'node')
        return;
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
         * @default         ['jpg', 'jpeg', 'png', 'webp']
         *
         * Specify a which file extensions you want to compress
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        compressExts: ['jpg', 'jpeg', 'png', 'webp'],
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
        get inDir() {
            return api.config.storage.src.imgDir;
        },
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
        get outDir() {
            return api.config.storage.dist.imgDir;
        },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFLE1BQU07UUFFWjs7Ozs7Ozs7OztXQVVHO1FBQ0gsWUFBWSxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDO1FBRTVDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLEtBQUs7WUFDTCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDekMsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLE1BQU07WUFDTixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDMUMsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUUsRUFBRTtRQUVYOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLEVBQUUsSUFBSTtRQUVWOzs7Ozs7Ozs7O1dBVUc7UUFDSCxLQUFLLEVBQUUsSUFBSTtRQUVYOzs7Ozs7Ozs7O1dBVUc7UUFDSCxNQUFNLEVBQUUsSUFBSTtRQUVaOzs7Ozs7Ozs7O1dBVUc7UUFDSCxVQUFVLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWxCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxLQUFLLEVBQUUsSUFBSTtRQUVYOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQW9CRztRQUNILGNBQWMsRUFBRSxFQUFFO0tBQ3JCLENBQUM7QUFDTixDQUFDIn0=