"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jTWFwLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRvY01hcC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxrQkFBZTtJQUNiLEtBQUssRUFBRTtRQUNMOzs7Ozs7Ozs7Ozs7V0FZRztRQUNILEtBQUssRUFBRSxDQUFDLGdDQUFnQyxDQUFDO1FBRXpDOzs7Ozs7Ozs7Ozs7Ozs7O1dBZ0JHO1FBQ0gsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLHVCQUF1QjtZQUM3QixTQUFTLEVBQUUsV0FBVztTQUN2QjtLQUNGO0lBRUQsSUFBSSxFQUFFO1FBQ0o7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRSxzQ0FBc0M7S0FDN0M7SUFFRCxJQUFJLEVBQUU7UUFDSjs7Ozs7Ozs7O1dBU0c7UUFDSCxLQUFLLEVBQUUsQ0FBQyxhQUFhLEVBQUUsZ0NBQWdDLENBQUM7UUFFeEQ7Ozs7Ozs7Ozs7Ozs7OztXQWVHO1FBQ0gsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLHVCQUF1QjtTQUM5QjtLQUNGO0NBQ0YsQ0FBQyJ9