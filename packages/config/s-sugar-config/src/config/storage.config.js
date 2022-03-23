var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/sugar/node/path/packageRoot", "@coffeekraken/sugar/node/fs/dirname", "@coffeekraken/sugar/node/path/systemTmpDir"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
    const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
    const systemTmpDir_1 = __importDefault(require("@coffeekraken/sugar/node/path/systemTmpDir"));
    function default_1(env) {
        // if (env.platform !== 'node') return;
        return {
            system: {
                /**
                 * @name            tmpDir
                 * @namespace       config.storage.system
                 * @type            String
                 * @default         __systemTmpDir()
                 *
                 * Configure where is located the system "temp" folder
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                tmpDir: (0, systemTmpDir_1.default)(),
            },
            package: {
                /**
                 * @name            rootDir
                 * @namespace       config.storage
                 * @type            String
                 * @default         ${__packageRoot()}
                 *
                 * Configure the root directory. Usually the package root dir
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                rootDir: `${(0, packageRoot_1.default)(process.cwd())}`,
                /**
                 * @name            localDir
                 * @namespace       config.storage.package
                 * @type            String
                 * @default         [config.storage.package.rootDir]/.local
                 *
                 * Configure where is located the ".local" folder in which are stored usually some things like cache, etc...
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                localDir: `[config.storage.package.rootDir]/.local`,
                /**
                 * @name            cacheDir
                 * @namespace       config.storage.package
                 * @type            String
                 * @default         [config.storage.package.localDir]/cache
                 *
                 * Configure where is located the "cache" folder
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                cacheDir: `[config.storage.package.localDir]/cache`,
                /**
                 * @name            tmpDir
                 * @namespace       config.storage.package
                 * @type            String
                 * @default         [config.storage.package.localDir]/cache
                 *
                 * Configure where is located the "temp" folder
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                tmpDir: `[config.storage.package.localDir]/temp`,
                /**
                 * @name            nodeModulesDir
                 * @namespace       config.storage.package
                 * @type            String
                 * @default         [config.storage.package.rootDir]/node_modules
                 *
                 * Configure where is located the "node_modules" folder
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                nodeModulesDir: `[config.storage.package.rootDir]/node_modules`,
            },
            sugar: {
                /**
                 * @name            rootDir
                 * @namespace       config.storage
                 * @type            String
                 * @default         ${__packageRoot(__dirname())}
                 *
                 * Configure where is located sugar package directory. Usually in the node_modules/@coffeekraken/sugar folder
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                rootDir: `${(0, packageRoot_1.default)((0, dirname_1.default)())}`,
            },
            src: {
                /**
                 * @name            rootDir
                 * @namespace       config.storage.src
                 * @type            String
                 * @default         [config.storage.package.rootDir]/src
                 *
                 * Configure where is located the "src" directory where are stored all the sources like js, ts, css, images, etc...
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                rootDir: `[config.storage.package.rootDir]/src`,
                /**
                 * @name            jsDir
                 * @namespace       config.storage.src
                 * @type            String
                 * @default         [config.storage.src.rootDir]/js
                 *
                 * Configure where is located the javascript/typescript source files
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                jsDir: `[config.storage.src.rootDir]/js`,
                /**
                 * @name            nodeDir
                 * @namespace       config.storage.src
                 * @type            String
                 * @default         [config.storage.src.rootDir]/node
                 *
                 * Configure where is located the javascript/typescript node source files
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                nodeDir: `[config.storage.src.rootDir]/node`,
                /**
                 * @name            cssDir
                 * @namespace       config.storage.src
                 * @type            String
                 * @default         [config.storage.src.rootDir]/css
                 *
                 * Configure where is located the css source files
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                cssDir: `[config.storage.src.rootDir]/css`,
                /**
                 * @name            docDir
                 * @namespace       config.storage.src
                 * @type            String
                 * @default         [config.storage.src.rootDir]/doc
                 *
                 * Configure where is located the documentation markdown source files
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                docDir: `[config.storage.src.rootDir]/doc`,
                /**
                 * @name            fontsDir
                 * @namespace       config.storage.src
                 * @type            String
                 * @default         [config.storage.src.rootDir]/fonts
                 *
                 * Configure where is located the fonts source files
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                fontsDir: `[config.storage.src.rootDir]/fonts`,
                /**
                 * @name            iconsDir
                 * @namespace       config.storage.src
                 * @type            String
                 * @default         [config.storage.src.rootDir]/icons
                 *
                 * Configure where is located the icons source files
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                iconsDir: `[config.storage.src.rootDir]/icons`,
                /**
                 * @name            imgDir
                 * @namespace       config.storage.src
                 * @type            String
                 * @default         [config.storage.src.rootDir]/img
                 *
                 * Configure where is located the images source files
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                imgDir: `[config.storage.src.rootDir]/img`,
                /**
                 * @name            viewsDir
                 * @namespace       config.storage.src
                 * @type            String
                 * @default         [config.storage.src.rootDir]/views
                 *
                 * Configure where is located the views (blade, twig, etc...) source files
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                viewsDir: `[config.storage.src.rootDir]/views`,
            },
            dist: {
                /**
                 * @name            rootDir
                 * @namespace       config.storage.dist
                 * @type            String
                 * @default         [config.storage.package.rootDir]/dist
                 *
                 * Configure where is located the "dist" folder in which are stored usually the "distribution" files like production css, js, images, etc...
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                rootDir: `[config.storage.package.rootDir]/dist`,
                /**
                 * @name            jsDir
                 * @namespace       config.storage.dist
                 * @type            String
                 * @default         [config.storage.dist.rootDir]/js
                 *
                 * Configure where is located the javascript/typescript distribution files
                 *
                 * @since           2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                jsDir: `[config.storage.dist.rootDir]/js`,
                /**
                 * @name            nodeDir
                 * @namespace       config.storage.dist
                 * @type            String
                 * @default         [config.storage.dist.rootDir]/node
                 *
                 * Configure where is located the javascript/typescript node distribution files
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                nodeDir: `[config.storage.dist.rootDir]/node`,
                /**
                 * @name            cssDir
                 * @namespace       config.storage.dist
                 * @type            String
                 * @default         [config.storage.dist.rootDir]/css
                 *
                 * Configure where is located the css distribution files
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                cssDir: `[config.storage.dist.rootDir]/css`,
                /**
                 * @name            docDir
                 * @namespace       config.storage.dist
                 * @type            String
                 * @default         [config.storage.dist.rootDir]/doc
                 *
                 * Configure where is located the doc markdown distribution files
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                docDir: `[config.storage.dist.rootDir]/doc`,
                /**
                 * @name            fontsDir
                 * @namespace       config.storage.dist
                 * @type            String
                 * @default         [config.storage.dist.rootDir]/fonts
                 *
                 * Configure where is located the fonts distribution files
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                fontsDir: `[config.storage.dist.rootDir]/fonts`,
                /**
                 * @name            iconsDir
                 * @namespace       config.storage.dist
                 * @type            String
                 * @default         [config.storage.dist.rootDir]/icons
                 *
                 * Configure where is located the icons distribution files
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                iconsDir: `[config.storage.dist.rootDir]/icons`,
                /**
                 * @name            imgDir
                 * @namespace       config.storage.dist
                 * @type            String
                 * @default         [config.storage.dist.rootDir]/img
                 *
                 * Configure where is located the images distribution files
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                imgDir: `[config.storage.dist.rootDir]/img`,
                /**
                 * @name            viewsDir
                 * @namespace       config.storage.dist
                 * @type            String
                 * @default         [config.storage.dist.rootDir]/views
                 *
                 * Configure where is located the views (blade, twig, etc...) distribution files
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                viewsDir: `[config.storage.dist.rootDir]/views`,
            },
            /**
             * @name            exclude
             * @namespace       config.storage
             * @type            Array<String>
             *
             * Specify which file(s) or directory(ies) you want to exclude from the major part of the functions
             * like resolveGlob, SSugarJson.search, etc...
             * This accept globs.
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            exclude: [
                '**/bin/**',
                '**/.DS_Store',
                '**/__WIP__/**',
                '**/__wip__/**',
                '**/__TESTS/**',
                '**/__tests__/**',
                '**/__tests__.wip/**',
                '**/.*/**',
                '**/node_modules/**',
            ],
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdG9yYWdlLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUNBLDRGQUFzRTtJQUN0RSxrRkFBNEQ7SUFDNUQsOEZBQXdFO0lBRXhFLG1CQUF5QixHQUFHO1FBQ3hCLHVDQUF1QztRQUV2QyxPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE1BQU0sRUFBRSxJQUFBLHNCQUFjLEdBQUU7YUFDM0I7WUFDRCxPQUFPLEVBQUU7Z0JBQ0w7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsT0FBTyxFQUFFLEdBQUcsSUFBQSxxQkFBYSxFQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFO2dCQUUxQzs7Ozs7Ozs7OzttQkFVRztnQkFDSCxRQUFRLEVBQUUseUNBQXlDO2dCQUVuRDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxRQUFRLEVBQUUseUNBQXlDO2dCQUVuRDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxNQUFNLEVBQUUsd0NBQXdDO2dCQUVoRDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxjQUFjLEVBQUUsK0NBQStDO2FBQ2xFO1lBRUQsS0FBSyxFQUFFO2dCQUNIOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE9BQU8sRUFBRSxHQUFHLElBQUEscUJBQWEsRUFBQyxJQUFBLGlCQUFTLEdBQUUsQ0FBQyxFQUFFO2FBQzNDO1lBRUQsR0FBRyxFQUFFO2dCQUNEOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE9BQU8sRUFBRSxzQ0FBc0M7Z0JBRS9DOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEtBQUssRUFBRSxpQ0FBaUM7Z0JBRXhDOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE9BQU8sRUFBRSxtQ0FBbUM7Z0JBRTVDOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE1BQU0sRUFBRSxrQ0FBa0M7Z0JBRTFDOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE1BQU0sRUFBRSxrQ0FBa0M7Z0JBRTFDOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFFBQVEsRUFBRSxvQ0FBb0M7Z0JBRTlDOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFFBQVEsRUFBRSxvQ0FBb0M7Z0JBRTlDOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE1BQU0sRUFBRSxrQ0FBa0M7Z0JBRTFDOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFFBQVEsRUFBRSxvQ0FBb0M7YUFDakQ7WUFFRCxJQUFJLEVBQUU7Z0JBQ0Y7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsT0FBTyxFQUFFLHVDQUF1QztnQkFFaEQ7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsS0FBSyxFQUFFLGtDQUFrQztnQkFFekM7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsT0FBTyxFQUFFLG9DQUFvQztnQkFFN0M7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsTUFBTSxFQUFFLG1DQUFtQztnQkFFM0M7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsTUFBTSxFQUFFLG1DQUFtQztnQkFFM0M7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsUUFBUSxFQUFFLHFDQUFxQztnQkFFL0M7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsUUFBUSxFQUFFLHFDQUFxQztnQkFFL0M7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsTUFBTSxFQUFFLG1DQUFtQztnQkFFM0M7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsUUFBUSxFQUFFLHFDQUFxQzthQUNsRDtZQUVEOzs7Ozs7Ozs7OztlQVdHO1lBQ0gsT0FBTyxFQUFFO2dCQUNMLFdBQVc7Z0JBQ1gsY0FBYztnQkFDZCxlQUFlO2dCQUNmLGVBQWU7Z0JBQ2YsZUFBZTtnQkFDZixpQkFBaUI7Z0JBQ2pCLHFCQUFxQjtnQkFDckIsVUFBVTtnQkFDVixvQkFBb0I7YUFDdkI7U0FDSixDQUFDO0lBQ04sQ0FBQztJQTFXRCw0QkEwV0MifQ==