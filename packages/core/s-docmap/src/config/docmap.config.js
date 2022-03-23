var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/sugar/node/path/packageRoot", "@coffeekraken/sugar/shared/extension/commonTextFileExtensions"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
    const commonTextFileExtensions_1 = __importDefault(require("@coffeekraken/sugar/shared/extension/commonTextFileExtensions"));
    function default_1(env, config) {
        if (env.platform !== 'node')
            return;
        return {
            read: {
                /**
                 * @name          input
                 * @namespace     config.docmap.read
                 * @type          String
                 * @default         ${__packageRoot()}/docmap.json
                 *
                 * Specify the path of the docmap.json source file to read
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                input: `${(0, packageRoot_1.default)()}/docmap.json`,
            },
            snapshot: {
                /**
                 * @name          outDir
                 * @namespace     config.docmap.snapshot
                 * @type          String
                 * @default       [config.storage.package.rootDir]/.docmap
                 *
                 * Specify where to save the generated snapshot
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                outDir: `[config.storage.package.rootDir]/.docmap`,
            },
            installSnapshot: {
                /**
                 * @name          glob
                 * @namespace     config.docmap.installSnapshot
                 * @type          String
                 * @default       [config.storage.package.rootDir]/.docmap/*
                 *
                 * Specify where to find the snapshot(s) to install. It must refer
                 * to folder(s) where a docmap.json and a package.json exists...
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                glob: `[config.storage.package.rootDir]/.docmap/*`,
            },
            build: {
                /**
                 * @name            globs
                 * @namespace       config.docmap.build
                 * @type                Array<String>
                 * @default             ['*',`src/!(css)/** /*.+(${__commonTextFileExtensions(false).join('|')})`,`dist/+(css)/*`]
                 *
                 * Specify the input globs to use in order to find files that will
                 * be used for docmap generation.
                 * The syntax is standard glob with an additional feature which is:
                 * - [glob]:[regex] -> This will search for files using the [glob] part, and search inside them using the [regex] part
                 *
                 * @since           2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                globs: [
                    '*',
                    `src/!(css)/*{0,4}/*.+(${(0, commonTextFileExtensions_1.default)(false).join('|')})`,
                    `dist/+(css)/*`
                ],
                /**
                 * @name        exclude
                 * @namespace   config.docmap.build
                 * @type        Array<String>
                 * @default         ['**\/__tests__/**\/*','**\/__tests__.wip/**\/*','**\/__wip__/**\/*']
                 *
                 * Specify some regex to apply on different docblock and path properties
                 * to exclude some files from the buildd docMap json
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                exclude: [
                    '**/__tests__/**/*',
                    '**/__tests__.wip/**/*',
                    '**/__wip__/**/*',
                ],
                /**
                 * @name        noExtends
                 * @namespace   config.docmap.build
                 * @type        Boolean
                 * @default     false
                 *
                 * Specify if you want to disable the extends search process that will result in the "extends" array in the docmap.json file
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                noExtends: false,
                filters: {
                    /**
                     * @name        namespace
                     * @namespace   config.docmap.build.filters
                     * @type        Object<String>
                     * @default       /#\{.*\}/gm
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
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    namespace: /#\{.*\}/gm,
                },
                /**
                 * @name        tags
                 * @namespace     config.docmap.build
                 * @type        Array<String>
                 * @default     ['name','type','menu','default','platform','description','namespace','status','example','interface','styleguide','static','since','author']
                 *
                 * Specify which docblock tags you want to integrate to your docmap.json items
                 *
                 * @since     2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                tags: [
                    'name',
                    'type',
                    'menu',
                    'default',
                    'platform',
                    'description',
                    'namespace',
                    'status',
                    'example',
                    'interface',
                    'async',
                    'static',
                    'since',
                    'author',
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                outPath: `[config.storage.package.rootDir]/docmap.json`,
            },
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jbWFwLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRvY21hcC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFBQSw0RkFBc0U7SUFFdEUsNkhBQXVHO0lBRXZHLG1CQUF5QixHQUFHLEVBQUUsTUFBTTtRQUNoQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtZQUFFLE9BQU87UUFFcEMsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUsR0FBRyxJQUFBLHFCQUFhLEdBQUUsY0FBYzthQUMxQztZQUVELFFBQVEsRUFBRTtnQkFDTjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxNQUFNLEVBQUUsMENBQTBDO2FBQ3JEO1lBRUQsZUFBZSxFQUFFO2dCQUNiOzs7Ozs7Ozs7OzttQkFXRztnQkFDSCxJQUFJLEVBQUUsNENBQTRDO2FBQ3JEO1lBRUQsS0FBSyxFQUFFO2dCQUNIOzs7Ozs7Ozs7Ozs7O21CQWFHO2dCQUNILEtBQUssRUFBRTtvQkFDSCxHQUFHO29CQUNILHlCQUF5QixJQUFBLGtDQUEwQixFQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRztvQkFDdkUsZUFBZTtpQkFDbEI7Z0JBRUQ7Ozs7Ozs7Ozs7O21CQVdHO2dCQUNILE9BQU8sRUFBRTtvQkFDTCxtQkFBbUI7b0JBQ25CLHVCQUF1QjtvQkFDdkIsaUJBQWlCO2lCQUNwQjtnQkFFRDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxTQUFTLEVBQUUsS0FBSztnQkFFaEIsT0FBTyxFQUFFO29CQUNMOzs7Ozs7Ozs7Ozs7Ozs7O3VCQWdCRztvQkFDSCxTQUFTLEVBQUUsV0FBVztpQkFDekI7Z0JBRUQ7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLE1BQU07b0JBQ04sTUFBTTtvQkFDTixNQUFNO29CQUNOLFNBQVM7b0JBQ1QsVUFBVTtvQkFDVixhQUFhO29CQUNiLFdBQVc7b0JBQ1gsUUFBUTtvQkFDUixTQUFTO29CQUNULFdBQVc7b0JBQ1gsT0FBTztvQkFDUCxRQUFRO29CQUNSLE9BQU87b0JBQ1AsUUFBUTtpQkFDWDtnQkFFRDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxJQUFJLEVBQUUsSUFBSTtnQkFFVjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxPQUFPLEVBQUUsOENBQThDO2FBQzFEO1NBQ0osQ0FBQztJQUNOLENBQUM7SUFsTEQsNEJBa0xDIn0=