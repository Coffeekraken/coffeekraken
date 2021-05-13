import __unique from '@coffeekraken/sugar/shared/array/unique';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
export default {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzcGVjLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZyb250c3BlYy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxRQUFRLE1BQU0seUNBQXlDLENBQUM7QUFDL0QsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFFdEUsZUFBZTtJQUNiOzs7Ozs7Ozs7T0FTRztJQUNILEtBQUssRUFBRSxJQUFJO0lBRVgsZ0JBQWdCO0lBQ2hCLFVBQVU7SUFDVixnQ0FBZ0M7SUFDaEMsb0RBQW9EO0lBQ3BELDRDQUE0QztJQUM1QyxTQUFTO0lBQ1QseUVBQXlFO0lBQ3pFLDJDQUEyQztJQUMzQywwRUFBMEU7SUFDMUUsNkhBQTZIO0lBQzdILFNBQVM7SUFDVCxnQ0FBZ0M7SUFDaEMsK0ZBQStGO0lBQy9GLFVBQVU7SUFDVixrRkFBa0Y7SUFFbEYsVUFBVTtJQUNWLDhCQUE4QjtJQUM5QixnREFBZ0Q7SUFDaEQsb0NBQW9DO0lBQ3BDLFNBQVM7SUFDVCwrRUFBK0U7SUFDL0UsaUVBQWlFO0lBQ2pFLFNBQVM7SUFDVCw0QkFBNEI7SUFDNUIsK0ZBQStGO0lBQy9GLFVBQVU7SUFDVix5REFBeUQ7SUFFekQsVUFBVTtJQUNWLDhCQUE4QjtJQUM5QixnREFBZ0Q7SUFDaEQscUNBQXFDO0lBQ3JDLFNBQVM7SUFDVCxzRUFBc0U7SUFDdEUsaUVBQWlFO0lBQ2pFLFNBQVM7SUFDVCx5QkFBeUI7SUFDekIsV0FBVztJQUNYLG1DQUFtQztJQUNuQyxXQUFXO0lBQ1gsU0FBUztJQUNULDRCQUE0QjtJQUM1QiwrRkFBK0Y7SUFDL0YsVUFBVTtJQUNWLGlCQUFpQjtJQUNqQiwrQkFBK0I7SUFDL0IsU0FBUztJQUVULFVBQVU7SUFDViw2QkFBNkI7SUFDN0Isa0RBQWtEO0lBQ2xELG9DQUFvQztJQUNwQywwRkFBMEY7SUFDMUYsU0FBUztJQUNULDBGQUEwRjtJQUMxRixTQUFTO0lBQ1QsMEJBQTBCO0lBQzFCLCtGQUErRjtJQUMvRixVQUFVO0lBQ1YsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsdUJBQXVCO0lBQ3ZCLHFCQUFxQjtJQUNyQixrQkFBa0I7SUFDbEIsa0JBQWtCO0lBQ2xCLGlCQUFpQjtJQUNqQixpQkFBaUI7SUFDakIsU0FBUztJQUVULFVBQVU7SUFDViw0QkFBNEI7SUFDNUIsa0RBQWtEO0lBQ2xELDRCQUE0QjtJQUM1Qiw0QkFBNEI7SUFDNUIsU0FBUztJQUNULHdHQUF3RztJQUN4RyxTQUFTO0lBQ1QsNEJBQTRCO0lBQzVCLCtGQUErRjtJQUMvRixVQUFVO0lBQ1Ysb0JBQW9CO0lBRXBCLFVBQVU7SUFDVix5QkFBeUI7SUFDekIsb0RBQW9EO0lBQ3BELDhCQUE4QjtJQUM5QiwyQkFBMkI7SUFDM0IsU0FBUztJQUNULG9HQUFvRztJQUNwRyxTQUFTO0lBQ1QsMEJBQTBCO0lBQzFCLCtGQUErRjtJQUMvRixVQUFVO0lBQ1Ysa0JBQWtCO0lBRWxCLFVBQVU7SUFDViw4QkFBOEI7SUFDOUIsZ0RBQWdEO0lBQ2hELDhCQUE4QjtJQUM5QixnRUFBZ0U7SUFDaEUsU0FBUztJQUNULG9EQUFvRDtJQUNwRCxTQUFTO0lBQ1QsNEJBQTRCO0lBQzVCLCtGQUErRjtJQUMvRixVQUFVO0lBQ1YseURBQXlEO0lBQ3pELE9BQU87SUFFUCxJQUFJLEVBQUU7UUFDSjs7Ozs7Ozs7O1dBU0c7UUFDSCxLQUFLLEVBQUUsUUFBUSxDQUFDO1lBQ2QsZ0JBQWdCO1lBQ2hCLG1DQUFtQztZQUNuQyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLG9DQUFvQztTQUMxRSxDQUFDO1FBRUY7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRSxDQUFDLG1CQUFtQixFQUFFLGlCQUFpQixDQUFDO0tBQ2xEO0NBQ0YsQ0FBQyJ9