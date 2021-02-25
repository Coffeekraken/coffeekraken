"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    resolve: {
        /**
         * @name        dirs
         * @namespace   sugar.config.module.resolve
         * @type        Array<String>
         * @default     [config.storage.rootDir]
         *
         * Specify the directories from which to try to resolve modules
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        dirs: ['[config.storage.nodeModulesDir]'],
        /**
         * @name        extensions
         * @namespace   sugar.config.module.resolve
         * @type        Array<String>
         * @default     ['js','mjs','json','node']
         *
         * Specify the extensions you want to check if a path extension free is passed
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        extensions: ['js', 'mjs', 'json', 'node'],
        /**
         * @mame          fields
         * @namespace     sugar.config.module.resolve
         * @type          Array<String>
         * @default       ['main','module','browser']
         *
         * Specify which fields to check first to resolve the package file
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        fields: ['main', 'module', 'browser']
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1vZHVsZS5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQkFBZTtJQUNiLE9BQU8sRUFBRTtRQUNQOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FBQztRQUV6Qzs7Ozs7Ozs7OztXQVVHO1FBQ0gsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBRXpDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQztLQUN0QztDQUNGLENBQUMifQ==