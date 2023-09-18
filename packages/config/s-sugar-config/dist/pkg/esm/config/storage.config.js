import { __dirname } from '@coffeekraken/sugar/fs';
import { __packageRootDir, __systemTmpDir } from '@coffeekraken/sugar/path';
export default function (api) {
    if (api.env.platform !== 'node') {
        return;
    }
    const config = {
        dirNames: {
            local: '.local',
            cache: 'cache',
            tmp: 'tmp',
            nodeModules: 'node_modules',
            src: 'src',
            dist: 'dist',
            js: 'js',
            node: 'node',
            css: 'css',
            config: 'config',
            doc: 'doc',
            fonts: 'fonts',
            icons: 'icons',
            i18n: 'i18n',
            img: 'img',
            pages: 'pages',
            nodes: 'nodes',
            public: 'public',
            views: 'views',
        },
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
             * @default         ${__packageRootDir()}
             *
             * Configure the root directory. Usually the package root dir
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            rootDir: `${__packageRootDir(process.cwd())}`,
            /**
             * @name            localDirRel
             * @namespace       config.storage.package
             * @type            String
             * @default         .local
             *
             * Configure where is located the ".local" folder in which are stored usually some things like cache, etc...
             * relative to the package root directory
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get localDirRel() {
                return config.dirNames.local;
            },
            /**
             * @name            localDir
             * @namespace       config.storage.package
             * @type            String
             * @default         [config.storage.package.rootDir]/[config.storage.package.localDirRel]
             *
             * Configure where is located the ".local" folder in which are stored usually some things like cache, etc...
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get localDir() {
                return `${this.rootDir}/${this.localDirRel}`;
            },
            /**
             * @name            cacheDirRel
             * @namespace       config.storage.package
             * @type            String
             * @default         [config.storage.package.localDirRel]/[config.storage.dirNames.cache]
             *
             * Configure where is located the "cache" folder relative to the package root directory
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get cacheDirRel() {
                return `${this.localDirRel}/${config.dirNames.cache}`;
            },
            /**
             * @name            cacheDir
             * @namespace       config.storage.package
             * @type            String
             * @default         [config.storage.package.localDir]/[config.storage.package.dirNames.cache]
             *
             * Configure where is located the "cache" folder
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get cacheDir() {
                return `${this.localDir}/${config.dirNames.cache}`;
            },
            /**
             * @name            tmpDirRel
             * @namespace       config.storage.package
             * @type            String
             * @default         [config.storage.package.localDirRel]/[config.storage.dirNames.tmp]
             *
             * Configure where is located the "tmp" folder relative to the package root directory
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get tmpDirRel() {
                return `${this.localDirRel}/${config.dirNames.tmp}`;
            },
            /**
             * @name            tmpDir
             * @namespace       config.storage.package
             * @type            String
             * @default         [config.storage.package.localDir]/[config.storage.dirNames.tmp]
             *
             * Configure where is located the "tmp" folder
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get tmpDir() {
                return `${this.localDir}/${config.dirNames.tmp}`;
            },
            /**
             * @name            nodeModulesDirRel
             * @namespace       config.storage.package
             * @type            String
             * @default         [config.storage.dirNames.nodeModules]
             *
             * Configure where is located the "node_modules" folder relative to the package root directory
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get nodeModulesDirRel() {
                return config.dirNames.nodeModules;
            },
            /**
             * @name            nodeModulesDir
             * @namespace       config.storage.package
             * @type            String
             * @default         [config.storage.package.rootDir]/[config.storage.package.nodeModulesDirRel]
             *
             * Configure where is located the "node_modules" folder
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get nodeModulesDir() {
                return `${this.rootDir}/${this.nodeModulesDirRel}`;
            },
        },
        sugar: {
            /**
             * @name            rootDir
             * @namespace       config.storage
             * @type            String
             * @default         ${__packageRootDir(__dirname())}
             *
             * Configure where is located sugar package directory. Usually in the node_modules/@coffeekraken/sugar folder
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            rootDir: `${__packageRootDir(__dirname())}`,
        },
        src: {
            /**
             * @name            rootDirRel
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.dirNames.src]
             *
             * Configure where is located the "src" directory where are stored all the sources like js, ts, css, images, etc...
             * relative to the package root directory
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get rootDirRel() {
                return `${config.dirNames.src}`;
            },
            /**
             * @name            rootDir
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.package.rootDir]/[config.storage.src.rootDirRel]
             *
             * Configure where is located the "src" directory where are stored all the sources like js, ts, css, images, etc...
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get rootDir() {
                return `${api.this.package.rootDir}/${this.rootDirRel}`;
            },
            /**
             * @name            jsDirRel
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.src.rootDirRel]/[config.storage.dirNames.js]
             *
             * Configure where is located the javascript/typescript source files relative to the package root directory
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get jsDirRel() {
                return `${this.rootDirRel}/${config.dirNames.js}`;
            },
            /**
             * @name            jsDir
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.package.rootDir]/[config.storage.src.jsDirRel]
             *
             * Configure where is located the javascript/typescript source files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get jsDir() {
                return `${api.this.package.rootDir}/${this.jsDirRel}`;
            },
            /**
             * @name            nodeDirRel
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.src.rootDirRel]/[config.storage.dirNames.node]
             *
             * Configure where is located the javascript/typescript node source files relative to the package root directory
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get nodeDirRel() {
                return `${this.rootDirRel}/${config.dirNames.node}`;
            },
            /**
             * @name            nodeDir
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.package.rootDir]/[config.storage.src.nodeDirRel]
             *
             * Configure where is located the javascript/typescript node source files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get nodeDir() {
                return `${api.this.package.rootDir}/${this.nodeDirRel}`;
            },
            /**
             * @name            cssDirRel
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.src.rootDirRel]/[config.storage.dirNames.css]
             *
             * Configure where is located the css source files relative to the package root directory
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get cssDirRel() {
                return `${this.rootDirRel}/${config.dirNames.css}`;
            },
            /**
             * @name            cssDir
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.package.rootDir]/[config.storage.src.cssDirRel]
             *
             * Configure where is located the css source files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get cssDir() {
                return `${api.this.package.rootDir}/${this.cssDirRel}`;
            },
            /**
             * @name            configDirRel
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.src.rootDirRel]/[config.storage.dirNames.config]
             *
             * Configure where is located the config source files relative to the package root directory
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get configDirRel() {
                return `${this.rootDirRel}/${config.dirNames.config}`;
            },
            /**
             * @name            configDir
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.package.rootDir]/[config.storage.src.configDirRel]
             *
             * Configure where is located the config source files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get configDir() {
                return `${api.this.package.rootDir}/${this.configDirRel}`;
            },
            /**
             * @name            docDirRel
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.src.rootDirRel]/[config.storage.dirNames.doc]
             *
             * Configure where is located the documentation source files relative to the package root directory
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get docDirRel() {
                return `${this.rootDirRel}/${config.dirNames.doc}`;
            },
            /**
             * @name            docDir
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.package.rootDir]/[config.storage.src.docDirRel]
             *
             * Configure where is located the documentation markdown source files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get docDir() {
                return `${api.this.package.rootDir}/${this.docDirRel}`;
            },
            /**
             * @name            fontsDirRel
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.src.rootDirRel]/[config.storage.dirNames.fonts]
             *
             * Configure where is located the fonts source files relative to the package root directory
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get fontsDirRel() {
                return `${this.rootDirRel}/${config.dirNames.fonts}`;
            },
            /**
             * @name            fontsDir
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.package.rootDir]/[config.storage.src.fontsDirRel]
             *
             * Configure where is located the fonts source files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get fontsDir() {
                return `${api.this.package.rootDir}/${this.fontsDirRel}`;
            },
            /**
             * @name            iconsDirRel
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.src.rootDirRel]/[config.storage.dirNames.icons]
             *
             * Configure where is located the icons source files relative to the package root directory
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get iconsDirRel() {
                return `${this.rootDirRel}/${config.dirNames.icons}`;
            },
            /**
             * @name            iconsDir
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.package.rootDir]/[config.storage.src.iconsDirRel]
             *
             * Configure where is located the icons source files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get iconsDir() {
                return `${api.this.package.rootDir}/${this.iconsDirRel}`;
            },
            /**
             * @name            i18nDirRel
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.src.rootDirRel]/[config.storage.dirNames.i18n]
             *
             * Configure where is located the i18n source files relative to the package root directory
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get i18nDirRel() {
                return `${this.rootDirRel}/${config.dirNames.i18n}`;
            },
            /**
             * @name            i18nDir
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.package.rootDir]/[config.storage.src.i18nDirRel]
             *
             * Configure where is located the i18n source files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get i18nDir() {
                return `${api.this.package.rootDir}/${this.i18nDirRel}`;
            },
            /**
             * @name            imgDirRel
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.src.rootDirRel]/[config.storage.dirNames.img]
             *
             * Configure where is located the images source files relative to the package root directory
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get imgDirRel() {
                return `${this.rootDirRel}/${config.dirNames.img}`;
            },
            /**
             * @name            imgDir
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.package.rootDir]/[config.storage.src.imgDirRel]
             *
             * Configure where is located the images source files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get imgDir() {
                return `${api.this.package.rootDir}/${this.imgDirRel}`;
            },
            /**
             * @name            pagesDirRel
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.src.rootDirRel]/[config.storage.dirNames.pages]
             *
             * Configure where is located the pages definition files relative to the package root directory
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get pagesDirRel() {
                return `${this.rootDirRel}/${config.dirNames.pages}`;
            },
            /**
             * @name            pagesDir
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.package.rootDir]/[config.storage.src.pagesDirRel]
             *
             * Configure where is located the pages definition source files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get pagesDir() {
                return `${api.this.package.rootDir}/${this.pagesDirRel}`;
            },
            /**
             * @name            nodesDirRel
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.src.rootDirRel]/[config.storage.dirNames.nodes]
             *
             * Configure where is located the nodes definition files relative to the package root directory
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get nodesDirRel() {
                return `${this.rootDirRel}/${config.dirNames.nodes}`;
            },
            /**
             * @name            nodesDir
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.package.rootDir]/[config.storage.src.nodesDirRel]
             *
             * Configure where is located the nodes definition source files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get nodesDir() {
                return `${api.this.package.rootDir}/${this.nodesDirRel}`;
            },
            /**
             * @name            publicDirRel
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.src.rootDirRel]/[config.storage.dirNames.public]
             *
             * Configure where is located the public directory relative to the package root directory
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get publicDirRel() {
                return `${this.rootDirRel}/${config.dirNames.public}`;
            },
            /**
             * @name            publicDir
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.package.rootDir]/[config.storage.src.publicDirRel]
             *
             * Configure where is located the public source files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get publicDir() {
                return `${api.this.package.rootDir}/${this.publicDirRel}`;
            },
            /**
             * @name            viewsDirRel
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.src.rootDirRel]/[config.storage.dirNames.views]
             *
             * Configure where is located the views source files relative to the package root directory
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get viewsDirRel() {
                return `${this.rootDirRel}/${config.dirNames.views}`;
            },
            /**
             * @name            viewsDir
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.package.rootDir]/[config.storage.src.viewsDirRel]
             *
             * Configure where is located the views (blade, twig, etc...) source files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get viewsDir() {
                return `${api.this.package.rootDir}/${this.viewsDirRel}`;
            },
        },
        dist: {
            /**
             * @name            rootDirRel
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.dirNames.dist]
             *
             * Configure where is located the "dist" folder in which are stored usually the "distribution" files like production css, js, images, etc...
             * relative to the package root directory
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get rootDirRel() {
                return config.dirNames.dist;
            },
            /**
             * @name            rootDir
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.package.rootDir]/[config.storage.dirNames.dist]
             *
             * Configure where is located the "dist" folder in which are stored usually the "distribution" files like production css, js, images, etc...
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get rootDir() {
                return `${api.this.package.rootDir}/${config.dirNames.dist}`;
            },
            /**
             * @name            jsDirRel
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.dist.rootDirRel]/[config.storage.dirNames.js]
             *
             * Configure where is located the javascript/typescript distribution files relative to the package root directory
             *
             * @since           2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get jsDirRel() {
                return `${this.rootDirRel}/${config.dirNames.js}`;
            },
            /**
             * @name            jsDir
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.package.rootDir]/[config.storage.dist.jsDirRel]
             *
             * Configure where is located the javascript/typescript distribution files
             *
             * @since           2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get jsDir() {
                return `${api.this.package.rootDir}/${this.jsDirRel}`;
            },
            /**
             * @name            nodeDirRel
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.dist.rootDirRel]/[config.storage.dirNames.node]
             *
             * Configure where is located the javascript/typescript node distribution files relative to the package root directory
             *
             * @since           2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get nodeDirRel() {
                return `${this.rootDirRel}/${config.dirNames.node}`;
            },
            /**
             * @name            nodeDir
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.package.rootDir]/[config.storage.dist.nodeDirRel]
             *
             * Configure where is located the javascript/typescript node distribution files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get nodeDir() {
                return `${api.this.package.rootDir}/${this.nodeDirRel}`;
            },
            /**
             * @name            cssDirRel
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.dist.rootDirRel]/[config.storage.dirNames.css]
             *
             * Configure where is located the css distribution files relative to the package root directory
             *
             * @since           2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get cssDirRel() {
                return `${this.rootDirRel}/${config.dirNames.css}`;
            },
            /**
             * @name            cssDir
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.package.rootDir]/[config.storage.dist.cssDirRel]
             *
             * Configure where is located the css distribution files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get cssDir() {
                return `${api.this.package.rootDir}/${this.cssDirRel}`;
            },
            /**
             * @name            configDirRel
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.dist.rootDirRel]/[config.storage.dirNames.config]
             *
             * Configure where is located the config source files relative to the package root directory
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get configDirRel() {
                return `${this.rootDirRel}/${config.dirNames.config}`;
            },
            /**
             * @name            configDir
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.package.rootDir]/[config.storage.dist.configDirRel]
             *
             * Configure where is located the config source files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get configDir() {
                return `${api.this.package.rootDir}/${this.configDirRel}`;
            },
            /**
             * @name            docDirRel
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.dist.rootDirRel]/[config.storage.dirNames.doc]
             *
             * Configure where is located the documentation distribution files relative to the package root directory
             *
             * @since           2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get docDirRel() {
                return `${this.rootDirRel}/${config.dirNames.doc}`;
            },
            /**
             * @name            docDir
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.package.rootDir]/[config.storage.dist.docDirRel]
             *
             * Configure where is located the doc markdown distribution files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get docDir() {
                return `${api.this.package.rootDir}/${this.docDirRel}`;
            },
            /**
             * @name            fontsDirRel
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.dist.rootDirRel]/[config.storage.dirNames.fonts]
             *
             * Configure where is located the fonts distribution files relative to the package root directory
             *
             * @since           2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get fontsDirRel() {
                return `${this.rootDirRel}/${config.dirNames.fonts}`;
            },
            /**
             * @name            fontsDir
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.package.rootDir]/[config.storage.dist.fontsDirRel]
             *
             * Configure where is located the fonts distribution files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get fontsDir() {
                return `${api.this.package.rootDir}/${this.fontsDirRel}`;
            },
            /**
             * @name            iconsDirRel
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.dist.rootDirRel]/[config.storage.dirNames.icons]
             *
             * Configure where is located the icons distribution files relative to the package root directory
             *
             * @since           2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get iconsDirRel() {
                return `${this.rootDirRel}/${config.dirNames.icons}`;
            },
            /**
             * @name            iconsDir
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.package.rootDir]/[config.storage.dist.iconsDirRel]
             *
             * Configure where is located the icons distribution files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get iconsDir() {
                return `${api.this.package.rootDir}/${this.iconsDirRel}`;
            },
            /**
             * @name            i18nDirRel
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.dist.rootDirRel]/[config.storage.dirNames.i18n]
             *
             * Configure where is located the i18n distribution files relative to the package root directory
             *
             * @since           2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get i18nDirRel() {
                return `${this.rootDirRel}/${config.dirNames.i18n}`;
            },
            /**
             * @name            i18nDir
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.package.rootDir]/[config.storage.dist.i18nDirRel]
             *
             * Configure where is located the i18n distribution files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get i18nDir() {
                return `${api.this.package.rootDir}/${this.i18nDirRel}`;
            },
            /**
             * @name            imgDirRel
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.dist.rootDirRel]/[config.storage.dirNames.img]
             *
             * Configure where is located the images distribution files relative to the package root directory
             *
             * @since           2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get imgDirRel() {
                return `${this.rootDirRel}/${config.dirNames.img}`;
            },
            /**
             * @name            imgDir
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.package.rootDir]/[config.storage.dist.imgDirRel]
             *
             * Configure where is located the images distribution files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get imgDir() {
                return `${api.this.package.rootDir}/${this.imgDirRel}`;
            },
            /**
             * @name            pagesDirRel
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.dist.rootDirRel]/[config.storage.dirNames.pages]
             *
             * Configure where is located the pages definition files relative to the package root directory
             *
             * @since           2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get pagesDirRel() {
                return `${this.rootDirRel}/${config.dirNames.pages}`;
            },
            /**
             * @name            pagesDir
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.package.rootDir]/[config.storage.dist.pagesDirRel]
             *
             * Configure where is located the pages definition distribution files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get pagesDir() {
                return `${api.this.package.rootDir}/${this.pagesDirRel}`;
            },
            /**
             * @name            nodesDirRel
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.dist.rootDirRel]/[config.storage.dirNames.nodes]
             *
             * Configure where is located the nodes definition files relative to the package root directory
             *
             * @since           2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get nodesDirRel() {
                return `${this.rootDirRel}/${config.dirNames.nodes}`;
            },
            /**
             * @name            nodesDir
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.package.rootDir]/[config.storage.dist.nodesDirRel]
             *
             * Configure where is located the nodes definition source files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get nodesDir() {
                return `${api.this.package.rootDir}/${this.nodesDirRel}`;
            },
            /**
             * @name            publicDirRel
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.dist.rootDirRel]/[config.storage.dirNames.public]
             *
             * Configure where is located the public directory relative to the package root directory
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get publicDirRel() {
                return `${this.rootDirRel}/${config.dirNames.public}`;
            },
            /**
             * @name            publicDir
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.package.rootDir]/[config.storage.dist.publicDirRel]
             *
             * Configure where is located the public source files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get publicDir() {
                return `${api.this.package.rootDir}/${this.publicDirRel}`;
            },
            /**
             * @name            viewsDirRel
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.dist.rootDirRel]/[config.storage.dirNames.views]
             *
             * Configure where is located the views distribution files relative to the package root directory
             *
             * @since           2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get viewsDirRel() {
                return `${this.rootDirRel}/${config.dirNames.views}`;
            },
            /**
             * @name            viewsDir
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.package.rootDir]/[config.storage.dist.viewsDirRel]
             *
             * Configure where is located the views (blade, twig, etc...) distribution files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get viewsDir() {
                return `${api.this.package.rootDiry}/${this.viewsDirRel}`;
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
    return config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFnSDVFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTtRQUM3QixPQUFPO0tBQ1Y7SUFFRCxNQUFNLE1BQU0sR0FBbUI7UUFDM0IsUUFBUSxFQUFFO1lBQ04sS0FBSyxFQUFFLFFBQVE7WUFDZixLQUFLLEVBQUUsT0FBTztZQUNkLEdBQUcsRUFBRSxLQUFLO1lBQ1YsV0FBVyxFQUFFLGNBQWM7WUFDM0IsR0FBRyxFQUFFLEtBQUs7WUFDVixJQUFJLEVBQUUsTUFBTTtZQUNaLEVBQUUsRUFBRSxJQUFJO1lBQ1IsSUFBSSxFQUFFLE1BQU07WUFDWixHQUFHLEVBQUUsS0FBSztZQUNWLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLEdBQUcsRUFBRSxLQUFLO1lBQ1YsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLElBQUksRUFBRSxNQUFNO1lBQ1osR0FBRyxFQUFFLEtBQUs7WUFDVixLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsTUFBTSxFQUFFLFFBQVE7WUFDaEIsS0FBSyxFQUFFLE9BQU87U0FDakI7UUFFRCxNQUFNLEVBQUU7WUFDSjs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUFFLGNBQWMsRUFBRTtTQUMzQjtRQUNELE9BQU8sRUFBRTtZQUNMOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRTtZQUU3Qzs7Ozs7Ozs7Ozs7ZUFXRztZ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