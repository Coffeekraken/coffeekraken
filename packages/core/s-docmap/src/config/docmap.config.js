import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
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
        input: `${__packageRootDir()}/docmap.json`
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jbWFwLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRvY21hcC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxnQkFBZ0IsTUFBTSw4Q0FBOEMsQ0FBQztBQUc1RSxlQUFlO0lBRWIsSUFBSSxFQUFFO1FBQ0o7Ozs7Ozs7OztXQVNHO1FBQ0gsS0FBSyxFQUFFLEdBQUcsZ0JBQWdCLEVBQUUsY0FBYztLQUMzQztJQUVELEtBQUssRUFBRTtRQUNMOzs7Ozs7Ozs7Ozs7V0FZRztRQUNILEtBQUssRUFBRSxDQUFDLGdDQUFnQyxFQUFFLCtCQUErQixDQUFDO1FBRTFFOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsQ0FBQztRQUUxRTs7Ozs7Ozs7OztXQVVHO1FBQ0gsU0FBUyxFQUFFLEtBQUs7UUFFaEI7Ozs7Ozs7Ozs7Ozs7OztXQWVHO1FBQ0gsT0FBTyxFQUFFO1lBQ1AsU0FBUyxFQUFFLFdBQVc7U0FDdkI7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsTUFBTSxFQUFFO1lBQ04sTUFBTTtZQUNOLE1BQU07WUFDTixVQUFVO1lBQ1YsYUFBYTtZQUNiLFdBQVc7WUFDWCxRQUFRO1lBQ1IsU0FBUztZQUNULFFBQVE7WUFDUixPQUFPO1lBQ1AsUUFBUTtTQUNUO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRSxJQUFJO1FBRVY7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRSw4Q0FBOEM7S0FDeEQ7Q0FDRixDQUFDIn0=