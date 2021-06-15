export default {
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
        exclude: ['**/__tests__/**/*', '**/__tests__.wip/**/*', '**/__wip__/**/*'],
        /**
         * @name        noExtends
         * @namespace   config.docmap.generate
         * @type        Boolean
         * @default     false
         *
         * Specify if you want to disable the extends search process that will result in the "extends" array in the docmap.json file
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        noExtends: false,
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
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jbWFwLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRvY21hcC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsZUFBZTtJQUViLFFBQVEsRUFBRTtRQUNSOzs7Ozs7Ozs7Ozs7V0FZRztRQUNILEtBQUssRUFBRSxDQUFDLGdDQUFnQyxFQUFFLCtCQUErQixDQUFDO1FBRTFFOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsQ0FBQztRQUUxRTs7Ozs7Ozs7OztXQVVHO1FBQ0gsU0FBUyxFQUFFLEtBQUs7UUFFaEI7Ozs7Ozs7Ozs7Ozs7OztXQWVHO1FBQ0gsT0FBTyxFQUFFO1lBQ1AsU0FBUyxFQUFFLFdBQVc7U0FDdkI7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsTUFBTSxFQUFFO1lBQ04sTUFBTTtZQUNOLE1BQU07WUFDTixhQUFhO1lBQ2IsV0FBVztZQUNYLFFBQVE7WUFDUixRQUFRO1lBQ1IsT0FBTztZQUNQLFFBQVE7U0FDVDtRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxLQUFLLEVBQUUsS0FBSztRQUVaOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLEVBQUUsSUFBSTtRQUVWOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUUsc0NBQXNDO0tBQ2hEO0NBQ0YsQ0FBQyJ9