import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
export default {
    read: {
        /**
         * @name          input
         * @namespace     config.docmap.read
         * @type          String
         *
         * Specify the path of the docmap.json source file to read
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        input: `${__packageRoot()}/docmap.json`,
        /**
         * @name        collect
         * @namespace     config.docmap.read
         * @type        Array<String>
         *
         * Specify which "fields" you want to collect and make an array of value with
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        collect: ['type', 'platform', 'status', 'author', 'since']
    },
    build: {
        /**
         * @name            globs
         * @namespace       config.docmap.build
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
         * @namespace   config.docmap.build
         * @type        Array<String>
         *
         * Specify some regex to apply on different docblock and path properties
         * to exclude some files from the buildd docMap json
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        exclude: ['**/__tests__/**/*', '**/__tests__.wip/**/*', '**/__wip__/**/*'],
        /**
         * @name        noExtends
         * @namespace   config.docmap.build
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
         * @namespace   config.docmap.build
         * @type        Object<String>
         *
         * Specify some regex to apply on different docblock properties
         * to exclude some files from the buildd docmap json
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
         * @namespace     config.docmap.build
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
            'platform',
            'description',
            'namespace',
            'status',
            'example',
            'static',
            'since',
            'author'
        ],
        /**
         * @name      save
         * @namespace       config.docmap.build
         * @type        Boolean
         * @default     true
         *
         * Specify if you want to save the buildd docmap.json file under the ```outPath``` path
         *
         * @since     2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        save: true,
        /**
         * @name        outPath
         * @namespace   config.docmap.build
         * @type         String
         * @default       [config.storage.package.rootDir]/docmap.json
         *
         * Specify where you want to outPath the file
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        outPath: `[config.storage.package.rootDir]/docmap.json`
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jbWFwLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRvY21hcC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFHdEUsZUFBZTtJQUViLElBQUksRUFBRTtRQUNKOzs7Ozs7Ozs7V0FTRztRQUNILEtBQUssRUFBRSxHQUFHLGFBQWEsRUFBRSxjQUFjO1FBRXZDOzs7Ozs7Ozs7V0FTRztRQUNILE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxPQUFPLENBQUM7S0FDdkQ7SUFFRCxLQUFLLEVBQUU7UUFDTDs7Ozs7Ozs7Ozs7O1dBWUc7UUFDSCxLQUFLLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRSwrQkFBK0IsQ0FBQztRQUUxRTs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLENBQUM7UUFFMUU7Ozs7Ozs7Ozs7V0FVRztRQUNILFNBQVMsRUFBRSxLQUFLO1FBRWhCOzs7Ozs7Ozs7Ozs7Ozs7V0FlRztRQUNILE9BQU8sRUFBRTtZQUNQLFNBQVMsRUFBRSxXQUFXO1NBQ3ZCO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILE1BQU0sRUFBRTtZQUNOLE1BQU07WUFDTixNQUFNO1lBQ04sVUFBVTtZQUNWLGFBQWE7WUFDYixXQUFXO1lBQ1gsUUFBUTtZQUNSLFNBQVM7WUFDVCxRQUFRO1lBQ1IsT0FBTztZQUNQLFFBQVE7U0FDVDtRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLEVBQUUsSUFBSTtRQUVWOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUUsOENBQThDO0tBQ3hEO0NBQ0YsQ0FBQyJ9