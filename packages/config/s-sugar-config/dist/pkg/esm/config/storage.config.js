import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __systemTmpDir from '@coffeekraken/sugar/node/path/systemTmpDir';
export default function (api) {
    if (api.env.platform !== 'node')
        return;
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
            get localDir() {
                return `${this.rootDir}/.local`;
            },
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
            get cacheDir() {
                return `${this.localDir}/cache`;
            },
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
            get tmpDir() {
                return `${this.localDir}/tmp`;
            },
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
            get nodeModulesDir() {
                return `${this.rootDir}/node_modules`;
            },
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
            get rootDir() {
                return `${api.this.package.rootDir}/src`;
            },
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
            get jsDir() {
                return `${this.rootDir}/js`;
            },
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
            get nodeDir() {
                return `${this.rootDir}/node`;
            },
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
            get cssDir() {
                return `${this.rootDir}/css`;
            },
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
            get configDir() {
                return `${this.rootDir}/config`;
            },
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
            get docDir() {
                return `${this.rootDir}/doc`;
            },
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
            get fontsDir() {
                return `${this.rootDir}/fonts`;
            },
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
            get iconsDir() {
                return `${this.rootDir}/icons`;
            },
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
            get imgDir() {
                return `${this.rootDir}/img`;
            },
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
            get pagesDir() {
                return `${this.rootDir}/pages`;
            },
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
            get publicDir() {
                return `${this.rootDir}/public`;
            },
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
            get viewsDir() {
                return `${this.rootDir}/views`;
            },
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
            get rootDir() {
                return `${api.this.package.rootDir}/dist`;
            },
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
            get jsDir() {
                return `${this.rootDir}/js`;
            },
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
            get nodeDir() {
                return `${this.rootDir}/node`;
            },
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
            get cssDir() {
                return `${this.rootDir}/css`;
            },
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
            get docDir() {
                return `${this.rootDir}/doc`;
            },
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
            get fontsDir() {
                return `${this.rootDir}/fonts`;
            },
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
            get iconsDir() {
                return `${this.rootDir}/icons`;
            },
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
            get imgDir() {
                return `${this.rootDir}/img`;
            },
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
            get pagesDir() {
                return `${this.rootDir}/pages`;
            },
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
            get viewsDir() {
                return `${this.rootDir}/views`;
            },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sY0FBYyxNQUFNLDRDQUE0QyxDQUFDO0FBRXhFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSCxNQUFNLEVBQUU7WUFDSjs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUFFLGNBQWMsRUFBRTtTQUMzQjtRQUNELE9BQU8sRUFBRTtZQUNMOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUU7WUFFMUM7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksUUFBUTtnQkFDUixPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sU0FBUyxDQUFDO1lBQ3BDLENBQUM7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxRQUFRO2dCQUNSLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxRQUFRLENBQUM7WUFDcEMsQ0FBQztZQUVEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLE1BQU07Z0JBQ04sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLE1BQU0sQ0FBQztZQUNsQyxDQUFDO1lBRUQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksY0FBYztnQkFDZCxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sZUFBZSxDQUFDO1lBQzFDLENBQUM7U0FDSjtRQUVELEtBQUssRUFBRTtZQUNIOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsR0FBRyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRTtTQUMzQztRQUVELEdBQUcs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