import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __unique from '@coffeekraken/sugar/shared/array/unique';
export default {
    /**
     * @name        cache
     * @namespace    config.docmap
     * @type        Boolean
     *
     * Specify if you want to use the cache when read the files, find them, etc...
     * You can alwπLsπays purge the cache using the ```purgeCache``` method on the SDocMap class
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    cache: true,
    generate: {
        /**
         * @name            globs
         * @namespace       config.docmap.generate
         * @type                Array<String>
         *
         * Specify the input globs to use in order to find files that will
         * be used for docmap generation.
         * The syntax is standard glob with an additional feature which is:
         * - [glob]:[regex] -> This will search for files using the [glob] part, and search inside them using the [regex] part
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        globs: [`src/**{5}/*:/.*@namespace.*/gm`, `dist/css/*:/.*@namespace.*/gm`],
        /**
         * @name        exclude
         * @namespace   config.docmap.generate
         * @type        Array<String>
         *
         * Specify some regex to apply on different docblock and path properties
         * to exclude some files from the generated docMap json
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        exclude: ['**/__tests__/**/*', '**/__wip__/**/*'],
        /**
         * @name        filters
         * @namespace   config.docmap.generate
         * @type        Object<String>
         *
         * Specify some regex to apply on different docblock properties
         * to exclude some files from the generated docmap json
         *
         * @example     js
         * {
         *    namespace: /#\{.*\}/gm
         * }
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        filters: {
            namespace: /#\{.*\}/gm
        },
        /**
         * @name        fields
         * @namespace     config.docmap.generate
         * @type        Array<String>
         * @default     ['name','type','description','namespace','status','static','since']
         *
         * Specify which docblock fields you want to integrate to your docmap.json items
         *
         * @since     2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        fields: [
            'name',
            'type',
            'description',
            'namespace',
            'status',
            'static',
            'since',
            'author'
        ],
        /**
         * @name        watch
         * @namespace     config.docmap.generate
         * @type      Boolean
         * @default     false
         *
         * Specify if you want to re-generate the docmap.json file when a source file has been updated
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        watch: false,
        /**
         * @name      save
         * @namespace       config.docmap.generate
         * @type        Boolean
         * @default     true
         *
         * Specify if you want to save the generated docmap.json file under the ```outPath``` path
         *
         * @since     2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        save: true,
        /**
         * @name        outPath
         * @namespace   config.docmap.generate
         * @type         String
         * @default       [config.storage.rootDir]/docmap.json
         *
         * Specify where you want to outPath the file
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        outPath: `[config.storage.rootDir]/docmap.json`
    },
    find: {
        /**
         * @name                globs
         * @namespace           config.docmap.find
         * @type                    Array<String>
         *
         * Specify some globs to find the "docmap.json"
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        globs: __unique([
            'docmap.json',
            `node_modules/**{2}/docmap.json`,
            `${__packageRoot(process.cwd(), true)}/node_modules/**{2}/docmap.json`
        ]),
        /**
         * @name        exclude
         * @namespace   config.docmap.find
         * @type        Array<String>
         *
         * Specify some regex to apply path properties
         * to exclude some files from the generated docMap json
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        exclude: ['**/__tests__/**/*', '**/__wip__/**/*']
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jbWFwLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRvY21hcC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFDdEUsT0FBTyxRQUFRLE1BQU0seUNBQXlDLENBQUM7QUFFL0QsZUFBZTtJQUNiOzs7Ozs7Ozs7O09BVUc7SUFDSCxLQUFLLEVBQUUsSUFBSTtJQUVYLFFBQVEsRUFBRTtRQUNSOzs7Ozs7Ozs7Ozs7V0FZRztRQUNILEtBQUssRUFBRSxDQUFDLGdDQUFnQyxFQUFFLCtCQUErQixDQUFDO1FBRTFFOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxpQkFBaUIsQ0FBQztRQUVqRDs7Ozs7Ozs7Ozs7Ozs7O1dBZUc7UUFDSCxPQUFPLEVBQUU7WUFDUCxTQUFTLEVBQUUsV0FBVztTQUN2QjtRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxNQUFNLEVBQUU7WUFDTixNQUFNO1lBQ04sTUFBTTtZQUNOLGFBQWE7WUFDYixXQUFXO1lBQ1gsUUFBUTtZQUNSLFFBQVE7WUFDUixPQUFPO1lBQ1AsUUFBUTtTQUNUO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILEtBQUssRUFBRSxLQUFLO1FBRVo7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRSxJQUFJO1FBRVY7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRSxzQ0FBc0M7S0FDaEQ7SUFFRCxJQUFJLEVBQUU7UUFDSjs7Ozs7Ozs7O1dBU0c7UUFDSCxLQUFLLEVBQUUsUUFBUSxDQUFDO1lBQ2QsYUFBYTtZQUNiLGdDQUFnQztZQUNoQyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLGlDQUFpQztTQUN2RSxDQUFDO1FBRUY7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRSxDQUFDLG1CQUFtQixFQUFFLGlCQUFpQixDQUFDO0tBQ2xEO0NBQ0YsQ0FBQyJ9