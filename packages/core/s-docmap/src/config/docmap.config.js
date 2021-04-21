"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const unique_1 = __importDefault(require("@coffeekraken/sugar/shared/array/unique"));
exports.default = {
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
        globs: [`src/**{5}/*:/.*@namespace.*/gm`],
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
            'since'
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
         * @default     false
         *
         * Specify if you want to save the generated docmap.json file under the ```outPath``` path
         *
         * @since     2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        save: false,
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
        globs: unique_1.default([
            'docmap.json',
            `node_modules/**{4}/docmap.json`,
            `${packageRoot_1.default(process.cwd(), true)}/node_modules/**{4}/docmap.json`
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jbWFwLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRvY21hcC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0RkFBc0U7QUFDdEUscUZBQStEO0FBRS9ELGtCQUFlO0lBQ2I7Ozs7Ozs7Ozs7T0FVRztJQUNILEtBQUssRUFBRSxJQUFJO0lBRVgsUUFBUSxFQUFFO1FBQ1I7Ozs7Ozs7Ozs7OztXQVlHO1FBQ0gsS0FBSyxFQUFFLENBQUMsZ0NBQWdDLENBQUM7UUFFekM7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRSxDQUFDLG1CQUFtQixFQUFFLGlCQUFpQixDQUFDO1FBRWpEOzs7Ozs7Ozs7Ozs7Ozs7V0FlRztRQUNILE9BQU8sRUFBRTtZQUNQLFNBQVMsRUFBRSxXQUFXO1NBQ3ZCO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILE1BQU0sRUFBRTtZQUNOLE1BQU07WUFDTixNQUFNO1lBQ04sYUFBYTtZQUNiLFdBQVc7WUFDWCxRQUFRO1lBQ1IsUUFBUTtZQUNSLE9BQU87U0FDUjtRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxLQUFLLEVBQUUsS0FBSztRQUVaOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLEVBQUUsS0FBSztRQUVYOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUUsc0NBQXNDO0tBQ2hEO0lBRUQsSUFBSSxFQUFFO1FBQ0o7Ozs7Ozs7OztXQVNHO1FBQ0gsS0FBSyxFQUFFLGdCQUFRLENBQUM7WUFDZCxhQUFhO1lBQ2IsZ0NBQWdDO1lBQ2hDLEdBQUcscUJBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLGlDQUFpQztTQUN2RSxDQUFDO1FBRUY7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRSxDQUFDLG1CQUFtQixFQUFFLGlCQUFpQixDQUFDO0tBQ2xEO0NBQ0YsQ0FBQyJ9