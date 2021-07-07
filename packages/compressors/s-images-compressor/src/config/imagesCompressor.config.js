export default {
    /**
     * @name            input
     * @namespace       config.imagesCompressor
     * @type            Array<String>
     * @default         [config.storage.src.imgDir]/** /*.{jpg,jpeg,png,gif,svg,webp}
     *
     * Specify which files you want to compress by setting an array of globs
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    input: [
        '[config.storage.src.imgDir]/**/*.{jpg,jpeg,png,gif,svg,webp}'
    ],
    /**
     * @name            outDir
     * @namespace       config.imagesCompressor
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
     * @namespace       config.imagesCompressor
     * @type            Number
     * @default         80
     *
     * Specify an overall quality percentage that you want to target
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    quality: 80,
    imagemin: {
        pluginsSettings: {
            /**
             * @name            gifsicle
             * @namespace       config.imagesCompressor.imagemin.pluginsSettings
             * @type            Any
             * @default         [config.imageminGifsicle]
             *
             * Specify some options for the "gifsicle" imagemin plugin
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            gifsicle: '[config.imageminGifsicle]',
            /**
             * @name            jpegtran
             * @namespace       config.imagesCompressor.imagemin.pluginsSettings
             * @type            Any
             * @default         [config.imageminJpegtran]
             *
             * Specify some options for the "jpegtran" imagemin plugin
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            jpegtran: '[config.imageminJpegtran]',
            /**
             * @name            optipng
             * @namespace       config.imagesCompressor.imagemin.pluginsSettings
             * @type            Any
             * @default         [config.imageminOptipng]
             *
             * Specify some options for the "optipng" imagemin plugin
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            optipng: '[config.imageminOptipng]',
            /**
             * @name            svgo
             * @namespace       config.imagesCompressor.imagemin.pluginsSettings
             * @type            Any
             * @default         [config.imageminSvgo]
             *
             * Specify some options for the "svgo" imagemin plugin
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            svgo: '[config.imageminSvgo]',
            /**
             * @name            webp
             * @namespace       config.imagesCompressor.imagemin.pluginsSettings
             * @type            Any
             * @default         [config.imageminWebp]
             *
             * Specify some options for the "webp" imagemin plugin
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            webp: '[config.imageminWebp]',
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VzQ29tcHJlc3Nvci5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbWFnZXNDb21wcmVzc29yLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxlQUFlO0lBRVg7Ozs7Ozs7Ozs7T0FVRztJQUNILEtBQUssRUFBRTtRQUNILDhEQUE4RDtLQUNqRTtJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxNQUFNLEVBQUUsOEJBQThCO0lBRXRDOzs7Ozs7Ozs7O09BVUc7SUFDSCxPQUFPLEVBQUUsRUFBRTtJQUVYLFFBQVEsRUFBRTtRQUVOLGVBQWUsRUFBRTtZQUViOzs7Ozs7Ozs7O2VBVUc7WUFDSCxRQUFRLEVBQUUsMkJBQTJCO1lBRXJDOzs7Ozs7Ozs7O2VBVUc7WUFDSCxRQUFRLEVBQUUsMkJBQTJCO1lBRXJDOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsMEJBQTBCO1lBRW5DOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsdUJBQXVCO1lBRTdCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsdUJBQXVCO1NBRWhDO0tBQ0o7Q0FFSixDQUFBIn0=