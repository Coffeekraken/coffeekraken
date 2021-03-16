"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    /**
     * @name        cache
     * @namespace    config.docMap
     * @type        Boolean
     *
     * Specify if you want to use the cache when read the files, find them, etc...
     * You can alwπLsπays purge the cache using the ```purgeCache``` method on the SDocMap class
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    cache: true,
    build: {
        /**
         * @name            globs
         * @namespace       config.docMap.build
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
         * @namespace   config.docMap.build
         * @type        Object<String>
         *
         * Specify some regex to apply on different docblock and path properties
         * to exclude some files from the buildd docMap json
         *
         * @example     js
         * {
         *    path: /(__wip__|__tests__)/gm,
         *    namespace: /#\{.*\}/gm
         * }
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        exclude: {
            path: /(__wip__|__tests__)/gm,
            namespace: /#\{.*\}/gm
        }
    },
    save: {
        /**
         * @name        path
         * @namespace   config.docMap.save
         * @type         String
         * @default       [config.storage.rootDir]/docMap.json
         *
         * Specify where you want to path the file
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        path: `[config.storage.rootDir]/docMap.json`
    },
    find: {
        /**
         * @name                globs
         * @namespace           config.docMap.find
         * @type                    Array<String>
         *
         * Specify some globs to find the "docMap.json"
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        globs: ['docMap.json', `node_modules/**{4}/docMap.json`],
        /**
         * @name        exclude
         * @namespace   config.docMap.find
         * @type        Object<String>
         *
         * Specify some regex to apply path properties
         * to exclude some files from the buildd docMap json
         *
         * @example     js
         * {
         *    path: /(__wip__|__tests__)/gm,
         * }
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        exclude: {
            path: /(__wip__|__tests__)/gm
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jTWFwLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvZG9jTWFwLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlO0lBQ2I7Ozs7Ozs7Ozs7T0FVRztJQUNILEtBQUssRUFBRSxJQUFJO0lBRVgsS0FBSyxFQUFFO1FBQ0w7Ozs7Ozs7Ozs7OztXQVlHO1FBQ0gsS0FBSyxFQUFFLENBQUMsZ0NBQWdDLENBQUM7UUFFekM7Ozs7Ozs7Ozs7Ozs7Ozs7V0FnQkc7UUFDSCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsdUJBQXVCO1lBQzdCLFNBQVMsRUFBRSxXQUFXO1NBQ3ZCO0tBQ0Y7SUFFRCxJQUFJLEVBQUU7UUFDSjs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFLHNDQUFzQztLQUM3QztJQUVELElBQUksRUFBRTtRQUNKOzs7Ozs7Ozs7V0FTRztRQUNILEtBQUssRUFBRSxDQUFDLGFBQWEsRUFBRSxnQ0FBZ0MsQ0FBQztRQUV4RDs7Ozs7Ozs7Ozs7Ozs7O1dBZUc7UUFDSCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsdUJBQXVCO1NBQzlCO0tBQ0Y7Q0FDRixDQUFDIn0=