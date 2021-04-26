"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unique_1 = __importDefault(require("@coffeekraken/sugar/shared/array/unique"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
exports.default = {
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
        globs: unique_1.default([
            'frontspec.json',
            `node_modules/**{4}/frontspec.json`,
            `${packageRoot_1.default(process.cwd(), true)}/node_modules/**{4}/frontspec.json`
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzcGVjLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZyb250c3BlYy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxRkFBK0Q7QUFDL0QsNEZBQXNFO0FBRXRFLGtCQUFlO0lBQ2I7Ozs7Ozs7OztPQVNHO0lBQ0gsS0FBSyxFQUFFLElBQUk7SUFFWCxnQkFBZ0I7SUFDaEIsVUFBVTtJQUNWLGdDQUFnQztJQUNoQyxvREFBb0Q7SUFDcEQsNENBQTRDO0lBQzVDLFNBQVM7SUFDVCx5RUFBeUU7SUFDekUsMkNBQTJDO0lBQzNDLDBFQUEwRTtJQUMxRSw2SEFBNkg7SUFDN0gsU0FBUztJQUNULGdDQUFnQztJQUNoQywrRkFBK0Y7SUFDL0YsVUFBVTtJQUNWLGtGQUFrRjtJQUVsRixVQUFVO0lBQ1YsOEJBQThCO0lBQzlCLGdEQUFnRDtJQUNoRCxvQ0FBb0M7SUFDcEMsU0FBUztJQUNULCtFQUErRTtJQUMvRSxpRUFBaUU7SUFDakUsU0FBUztJQUNULDRCQUE0QjtJQUM1QiwrRkFBK0Y7SUFDL0YsVUFBVTtJQUNWLHlEQUF5RDtJQUV6RCxVQUFVO0lBQ1YsOEJBQThCO0lBQzlCLGdEQUFnRDtJQUNoRCxxQ0FBcUM7SUFDckMsU0FBUztJQUNULHNFQUFzRTtJQUN0RSxpRUFBaUU7SUFDakUsU0FBUztJQUNULHlCQUF5QjtJQUN6QixXQUFXO0lBQ1gsbUNBQW1DO0lBQ25DLFdBQVc7SUFDWCxTQUFTO0lBQ1QsNEJBQTRCO0lBQzVCLCtGQUErRjtJQUMvRixVQUFVO0lBQ1YsaUJBQWlCO0lBQ2pCLCtCQUErQjtJQUMvQixTQUFTO0lBRVQsVUFBVTtJQUNWLDZCQUE2QjtJQUM3QixrREFBa0Q7SUFDbEQsb0NBQW9DO0lBQ3BDLDBGQUEwRjtJQUMxRixTQUFTO0lBQ1QsMEZBQTBGO0lBQzFGLFNBQVM7SUFDVCwwQkFBMEI7SUFDMUIsK0ZBQStGO0lBQy9GLFVBQVU7SUFDVixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQix1QkFBdUI7SUFDdkIscUJBQXFCO0lBQ3JCLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIsaUJBQWlCO0lBQ2pCLGlCQUFpQjtJQUNqQixTQUFTO0lBRVQsVUFBVTtJQUNWLDRCQUE0QjtJQUM1QixrREFBa0Q7SUFDbEQsNEJBQTRCO0lBQzVCLDRCQUE0QjtJQUM1QixTQUFTO0lBQ1Qsd0dBQXdHO0lBQ3hHLFNBQVM7SUFDVCw0QkFBNEI7SUFDNUIsK0ZBQStGO0lBQy9GLFVBQVU7SUFDVixvQkFBb0I7SUFFcEIsVUFBVTtJQUNWLHlCQUF5QjtJQUN6QixvREFBb0Q7SUFDcEQsOEJBQThCO0lBQzlCLDJCQUEyQjtJQUMzQixTQUFTO0lBQ1Qsb0dBQW9HO0lBQ3BHLFNBQVM7SUFDVCwwQkFBMEI7SUFDMUIsK0ZBQStGO0lBQy9GLFVBQVU7SUFDVixrQkFBa0I7SUFFbEIsVUFBVTtJQUNWLDhCQUE4QjtJQUM5QixnREFBZ0Q7SUFDaEQsOEJBQThCO0lBQzlCLGdFQUFnRTtJQUNoRSxTQUFTO0lBQ1Qsb0RBQW9EO0lBQ3BELFNBQVM7SUFDVCw0QkFBNEI7SUFDNUIsK0ZBQStGO0lBQy9GLFVBQVU7SUFDVix5REFBeUQ7SUFDekQsT0FBTztJQUVQLElBQUksRUFBRTtRQUNKOzs7Ozs7Ozs7V0FTRztRQUNILEtBQUssRUFBRSxnQkFBUSxDQUFDO1lBQ2QsZ0JBQWdCO1lBQ2hCLG1DQUFtQztZQUNuQyxHQUFHLHFCQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxvQ0FBb0M7U0FDMUUsQ0FBQztRQUVGOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxpQkFBaUIsQ0FBQztLQUNsRDtDQUNGLENBQUMifQ==