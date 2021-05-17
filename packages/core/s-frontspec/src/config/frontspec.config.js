import __unique from '@coffeekraken/sugar/shared/array/unique';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
export default {
    /**
     * @name        default
     * @namespace       config.frontspec
     * @type          Object
     *
     * Specify the default frontspec file values that will be overrided by the user frontspec file ones
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    default: {
        /**
         * @name      assets
         * @namespace     config.frontspec.default
         * @type      Object
         * @default       [config.assets]
         *
         * Specify the default assets available in the current working directory like js, css, etc...
         *
         * @todo      Types
         *
         * @since     2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        assets: '[config.assets]'
    },
    /**
     * @name        cache
     * @namespace    config.frontspec
     * @type        Boolean
     *
     * Specify if you want to use the cache when read the files, find them, etc...
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    cache: true,
    //   generate: {
    //     /**
    //      * @name            globs
    //      * @namespace       config.frontspec.generate
    //      * @type                Array<String>
    //      *
    //      * Specify the input globs to use in order to find files that will
    //      * be used for frontspec generation.
    //      * The syntax is standard glob with an additional feature which is:
    //      * - [glob]:[regex] -> This will search for files using the [glob] part, and search inside them using the [regex] part
    //      *
    //      * @since           2.0.0
    //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //      */
    //     globs: [`src/**{5}/*:/.*@namespace.*/gm`, `dist/css/*:/.*@namespace.*/gm`],
    //     /**
    //      * @name        exclude
    //      * @namespace   config.frontspec.generate
    //      * @type        Array<String>
    //      *
    //      * Specify some regex to apply on different docblock and path properties
    //      * to exclude some files from the generated frontspec json
    //      *
    //      * @since       2.0.0
    //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //      */
    //     exclude: ['**/__tests__/**/*', '**/__wip__/**/*'],
    //     /**
    //      * @name        filters
    //      * @namespace   config.frontspec.generate
    //      * @type        Object<String>
    //      *
    //      * Specify some regex to apply on different docblock properties
    //      * to exclude some files from the generated frontspec json
    //      *
    //      * @example     js
    //      * {
    //      *    namespace: /#\{.*\}/gm
    //      * }
    //      *
    //      * @since       2.0.0
    //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //      */
    //     filters: {
    //       namespace: /#\{.*\}/gm
    //     },
    //     /**
    //      * @name        fields
    //      * @namespace     config.frontspec.generate
    //      * @type        Array<String>
    //      * @default     ['name','type','description','namespace','status','static','since']
    //      *
    //      * Specify which docblock fields you want to integrate to your frontspec.json items
    //      *
    //      * @since     2.0.0
    //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //      */
    //     fields: [
    //       'name',
    //       'type',
    //       'description',
    //       'namespace',
    //       'status',
    //       'static',
    //       'since',
    //       'author'
    //     ],
    //     /**
    //      * @name        watch
    //      * @namespace     config.frontspec.generate
    //      * @type      Boolean
    //      * @default     false
    //      *
    //      * Specify if you want to re-generate the frontspec.json file when a source file has been updated
    //      *
    //      * @since       2.0.0
    //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //      */
    //     watch: false,
    //     /**
    //      * @name      save
    //      * @namespace       config.frontspec.generate
    //      * @type        Boolean
    //      * @default     true
    //      *
    //      * Specify if you want to save the generated frontspec.json file under the ```outPath``` path
    //      *
    //      * @since     2.0.0
    //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //      */
    //     save: true,
    //     /**
    //      * @name        outPath
    //      * @namespace   config.frontspec.generate
    //      * @type         String
    //      * @default       [config.storage.rootDir]/frontspec.json
    //      *
    //      * Specify where you want to outPath the file
    //      *
    //      * @since       2.0.0
    //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //      */
    //     outPath: `[config.storage.rootDir]/frontspec.json`
    //   },
    find: {
        /**
         * @name                globs
         * @namespace           config.frontspec.find
         * @type                    Array<String>
         *
         * Specify some globs to find the "frontspec.json"
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        globs: __unique([
            'frontspec.json',
            `node_modules/**{4}/frontspec.json`,
            `${__packageRoot(process.cwd(), true)}/node_modules/**{4}/frontspec.json`
        ]),
        /**
         * @name        exclude
         * @namespace   config.frontspec.find
         * @type        Array<String>
         *
         * Specify some regex to apply path properties
         * to exclude some files from the generated frontspec json
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        exclude: ['**/__tests__/**/*', '**/__wip__/**/*']
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzcGVjLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZyb250c3BlYy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxRQUFRLE1BQU0seUNBQXlDLENBQUM7QUFDL0QsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFFdEUsZUFBZTtJQUNiOzs7Ozs7Ozs7T0FTRztJQUNILE9BQU8sRUFBRTtRQUNQOzs7Ozs7Ozs7Ozs7V0FZRztRQUNILE1BQU0sRUFBRSxpQkFBaUI7S0FDMUI7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxLQUFLLEVBQUUsSUFBSTtJQUVYLGdCQUFnQjtJQUNoQixVQUFVO0lBQ1YsZ0NBQWdDO0lBQ2hDLG9EQUFvRDtJQUNwRCw0Q0FBNEM7SUFDNUMsU0FBUztJQUNULHlFQUF5RTtJQUN6RSwyQ0FBMkM7SUFDM0MsMEVBQTBFO0lBQzFFLDZIQUE2SDtJQUM3SCxTQUFTO0lBQ1QsZ0NBQWdDO0lBQ2hDLCtGQUErRjtJQUMvRixVQUFVO0lBQ1Ysa0ZBQWtGO0lBRWxGLFVBQVU7SUFDViw4QkFBOEI7SUFDOUIsZ0RBQWdEO0lBQ2hELG9DQUFvQztJQUNwQyxTQUFTO0lBQ1QsK0VBQStFO0lBQy9FLGlFQUFpRTtJQUNqRSxTQUFTO0lBQ1QsNEJBQTRCO0lBQzVCLCtGQUErRjtJQUMvRixVQUFVO0lBQ1YseURBQXlEO0lBRXpELFVBQVU7SUFDViw4QkFBOEI7SUFDOUIsZ0RBQWdEO0lBQ2hELHFDQUFxQztJQUNyQyxTQUFTO0lBQ1Qsc0VBQXNFO0lBQ3RFLGlFQUFpRTtJQUNqRSxTQUFTO0lBQ1QseUJBQXlCO0lBQ3pCLFdBQVc7SUFDWCxtQ0FBbUM7SUFDbkMsV0FBVztJQUNYLFNBQVM7SUFDVCw0QkFBNEI7SUFDNUIsK0ZBQStGO0lBQy9GLFVBQVU7SUFDVixpQkFBaUI7SUFDakIsK0JBQStCO0lBQy9CLFNBQVM7SUFFVCxVQUFVO0lBQ1YsNkJBQTZCO0lBQzdCLGtEQUFrRDtJQUNsRCxvQ0FBb0M7SUFDcEMsMEZBQTBGO0lBQzFGLFNBQVM7SUFDVCwwRkFBMEY7SUFDMUYsU0FBUztJQUNULDBCQUEwQjtJQUMxQiwrRkFBK0Y7SUFDL0YsVUFBVTtJQUNWLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLHVCQUF1QjtJQUN2QixxQkFBcUI7SUFDckIsa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixpQkFBaUI7SUFDakIsaUJBQWlCO0lBQ2pCLFNBQVM7SUFFVCxVQUFVO0lBQ1YsNEJBQTRCO0lBQzVCLGtEQUFrRDtJQUNsRCw0QkFBNEI7SUFDNUIsNEJBQTRCO0lBQzVCLFNBQVM7SUFDVCx3R0FBd0c7SUFDeEcsU0FBUztJQUNULDRCQUE0QjtJQUM1QiwrRkFBK0Y7SUFDL0YsVUFBVTtJQUNWLG9CQUFvQjtJQUVwQixVQUFVO0lBQ1YseUJBQXlCO0lBQ3pCLG9EQUFvRDtJQUNwRCw4QkFBOEI7SUFDOUIsMkJBQTJCO0lBQzNCLFNBQVM7SUFDVCxvR0FBb0c7SUFDcEcsU0FBUztJQUNULDBCQUEwQjtJQUMxQiwrRkFBK0Y7SUFDL0YsVUFBVTtJQUNWLGtCQUFrQjtJQUVsQixVQUFVO0lBQ1YsOEJBQThCO0lBQzlCLGdEQUFnRDtJQUNoRCw4QkFBOEI7SUFDOUIsZ0VBQWdFO0lBQ2hFLFNBQVM7SUFDVCxvREFBb0Q7SUFDcEQsU0FBUztJQUNULDRCQUE0QjtJQUM1QiwrRkFBK0Y7SUFDL0YsVUFBVTtJQUNWLHlEQUF5RDtJQUN6RCxPQUFPO0lBRVAsSUFBSSxFQUFFO1FBQ0o7Ozs7Ozs7OztXQVNHO1FBQ0gsS0FBSyxFQUFFLFFBQVEsQ0FBQztZQUNkLGdCQUFnQjtZQUNoQixtQ0FBbUM7WUFDbkMsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxvQ0FBb0M7U0FDMUUsQ0FBQztRQUVGOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxpQkFBaUIsQ0FBQztLQUNsRDtDQUNGLENBQUMifQ==