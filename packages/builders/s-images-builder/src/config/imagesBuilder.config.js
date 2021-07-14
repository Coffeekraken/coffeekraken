export default {
    /**
     * @name            glob
     * @namespace       config.imagesBuilder
     * @type            String
     * @default         [config.imagesBuilder.inDir]/** /*.{jpg,jpeg,png,gif,svg,webp}
     *
     * Specify a glob pattern relative to the "inDir" to specify files you want to compress
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    glob: '**/*.{jpg,jpeg,png,gif,svg,webp}',
    /**
    * @name            inDir
    * @namespace       config.imagesBuilder
    * @type            String
    * @default         [config.storage.src.imgDir]
    *
    * Specify a directory from where you want to  compress files
    *
    * @since       2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    webp: true,
    /**
     * @name            width
     * @namespace       config.imagesBuilder
     * @type            Number
     * @default         undefined
     *
     * Specify a max width you want your resolution 1 images to target
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    width: undefined,
    /**
     * @name            height
     * @namespace       config.imagesBuilder
     * @type            Boolean
     * @default         true
     *
     * Specify a max height you want your resolution 1 images to target
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    height: undefined,
    /**
     * @name            resolution
     * @namespace       config.imagesBuilder
     * @type            Array<Integer>
     * @default         [1,2]
     *
     * Specify some resolutions you want your images to be generated
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    specificParams: {}
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VzQnVpbGRlci5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbWFnZXNCdWlsZGVyLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxlQUFlO0lBRVg7Ozs7Ozs7Ozs7T0FVRztJQUNILElBQUksRUFBRSxrQ0FBa0M7SUFFdkM7Ozs7Ozs7Ozs7TUFVRTtJQUNILEtBQUssRUFBRSw2QkFBNkI7SUFFcEM7Ozs7Ozs7Ozs7T0FVRztJQUNILE1BQU0sRUFBRSw4QkFBOEI7SUFFdEM7Ozs7Ozs7Ozs7T0FVRztJQUNILE9BQU8sRUFBRSxFQUFFO0lBRVg7Ozs7Ozs7Ozs7T0FVRztJQUNILElBQUksRUFBRSxJQUFJO0lBRVY7Ozs7Ozs7Ozs7T0FVRztJQUNILEtBQUssRUFBRSxTQUFTO0lBRWhCOzs7Ozs7Ozs7O09BVUc7SUFDSCxNQUFNLEVBQUUsU0FBUztJQUVqQjs7Ozs7Ozs7OztPQVVHO0lBQ0gsVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztJQUVqQjs7Ozs7Ozs7OztPQVVHO0lBQ0gsS0FBSyxFQUFDLElBQUk7SUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FvQkc7SUFDSCxjQUFjLEVBQUUsRUFBRTtDQUVyQixDQUFBIn0=