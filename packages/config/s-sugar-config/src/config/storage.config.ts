import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __systemTmpDir from '@coffeekraken/sugar/node/path/systemTmpDir';

export default function (env) {
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
            tmpDir: __systemTmpDir(),
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
            rootDir: `${__packageRoot(process.cwd())}`,

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
            rootDir: `${__packageRoot(__dirname())}`,
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
             * @name            configDir
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.src.rootDir]/config
             *
             * Configure where is located the config source files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            configDir: `[config.storage.src.rootDir]/config`,

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
             * @name            pagesDir
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.src.rootDir]/views
             *
             * Configure where is located the pages definition source files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            pagesDir: `[config.storage.src.rootDir]/pages`,

            /**
             * @name            publicDir
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.src.rootDir]/public
             *
             * Configure where is located the public source files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            publicDir: `[config.storage.src.rootDir]/public`,

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
             * @name            pagesDir
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.dist.rootDir]/views
             *
             * Configure where is located the pages definition distribution files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            pagesDir: `[config.storage.dist.rootDir]/views`,

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
