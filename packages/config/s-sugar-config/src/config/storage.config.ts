import { __dirname } from '@coffeekraken/sugar/fs';
import { __packageRootDir, __systemTmpDir } from '@coffeekraken/sugar/path';

export interface IStorageSystemConfig {
    tmpDir: string;
}

export interface IStoragePackageConfig {
    rootDir: string;
    localDir: string;
    localDirRel: string;
    cacheDirRel: string;
    cacheDir: string;
    tmpDirRel: string;
    tmpDir: string;
    nodeModulesDirRel: string;
    nodeModulesDir: string;
}

export interface IStorageSrcConfig {
    rootDirRel: string;
    rootDir: string;
    jsDirRel: string;
    jsDir: string;
    nodeDirRel: string;
    nodeDir: string;
    cssDirRel: string;
    cssDir: string;
    configDirRel: string;
    configDir: string;
    docDirRel: string;
    docDir: string;
    fontsDirRel: string;
    fontsDir: string;
    iconsDirRel: string;
    iconsDir: string;
    i18nDirRel: string;
    i18nDir: string;
    imgDirRel: string;
    imgDir: string;
    pagesDirRel: string;
    pagesDir: string;
    nodesDirRel: string;
    nodesDir: string;
    publicDirRel: string;
    publicDir: string;
    viewsDirRel: string;
    viewsDir: string;
}

export interface IStorageDistConfig {
    rootDirRel: string;
    rootDir: string;
    jsDirRel: string;
    jsDir: string;
    nodeDirRel: string;
    nodeDir: string;
    cssDirRel: string;
    cssDir: string;
    configDirRel: string;
    configDir: string;
    docDirRel: string;
    docDir: string;
    fontsDirRel: string;
    fontsDir: string;
    iconsDirRel: string;
    iconsDir: string;
    i18nDirRel: string;
    i18nDir: string;
    imgDirRel: string;
    imgDir: string;
    pagesDirRel: string;
    pagesDir: string;
    nodesDirRel: string;
    nodesDir: string;
    publicDirRel: string;
    publicDir: string;
    viewsDirRel: string;
    viewsDir: string;
}

export interface IStorageConfig {
    dirNames: {
        local: '.local';
        cache: string;
        tmp: string;
        nodeModules: string;
        src: string;
        dist: string;
        js: string;
        node: string;
        css: string;
        config: string;
        doc: string;
        fonts: string;
        icons: string;
        i18n: string;
        img: string;
        pages: string;
        nodes: string;
        public: string;
        views: string;
    };
    system: IStorageSystemConfig;
    package: IStoragePackageConfig;
    sugar: {
        rootDir: string;
    };
    src: IStorageSrcConfig;
    dist: IStorageDistConfig;
    exclude: string[];
}

export default function (api): IStorageConfig {
    if (api.env.platform !== 'node') {
        return;
    }

    const config: IStorageConfig = {
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
