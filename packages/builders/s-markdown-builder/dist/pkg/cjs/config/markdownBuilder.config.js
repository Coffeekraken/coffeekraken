"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const path_1 = __importDefault(require("path"));
function default_1(api) {
    if (api.env.platform !== 'node')
        return;
    const packageRoot = (0, packageRoot_1.default)((0, dirname_1.default)());
    return {
        default: {
            /**
             * @name            glob
             * @namespace       config.markdownBuilder.default
             * @type            String
             * @default         ** /+(README|LICENSE|*.md)
             *
             * Specify a glob pattern relative to your "inDir" config
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            glob: '**/+(README|LICENSE|*.md)',
            /**
             * @name            inDir
             * @namespace       config.markdownBuilder.default
             * @type            String
             * @default         [config.storage.src.rootDir]
             *
             * Specify the input directory where to search for files to build using the "glob" config
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get inDir() {
                return api.config.storage.src.rootDir;
            },
            /**
             * @name            inPath
             * @namespace       config.markdownBuilder.default
             * @type            String
             * @default         null
             *
             * Specify a file path to process.
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            inPath: null,
            /**
             * @name            inRaw
             * @namespace       config.markdownBuilder.default
             * @type            String
             * @default         null
             *
             * Specify some markdown to build in string format.
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            inRaw: null,
            /**
             * @name            outDir
             * @namespace       config.markdownBuilder.default
             * @type            String
             * @default         [config.storage.dist.rootDir]
             *
             * Specify the output directory where to save the processed files.
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get outDir() {
                return api.config.storage.dist.rootDir;
            },
            /**
             * @name            outPath
             * @namespace       config.markdownBuilder.default
             * @type            String
             * @default         null
             *
             * Specify an output file path when using the "inPath" config
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            outPath: null,
            /**
             * @name            save
             * @namespace       config.markdownBuilder.default
             * @type            Boolean
             * @default         true
             *
             * Specify if you want to save the processed files out or not
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            save: true,
            /**
             * @name            target
             * @namespace       config.markdownBuilder.default
             * @type            String
             * @values          ['markdown', 'html']
             * @default         markdown
             *
             * Specify the output target you want. Can be "markdown" or "html"
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            target: 'markdown',
            /**
             * @name            protectedTags.default
             * @namespace       config.markdownBuilder
             * @type            String[]
             * @default         ['template','code']
             *
             * Specify some tags that should be protected from the markdown transformations like "template" or "code"...
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            protectedTags: ['template', 'code'],
        },
        metas: {
            /**
             * @name            websiteUrl
             * @namespace       config.markdownBuilder
             * @type            String
             * @default         config.packageJson.homepage
             *
             * Specify the website url that will be used for things like "absoluteLinks" conversion, etc...
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get websiteUrl() {
                return api.config.packageJson.homepage;
            },
        },
        presets: {
            default: {},
            readme: {
                get inPath() {
                    return `${api.config.storage.src.docDir}/README.md`;
                },
                get outPath() {
                    return `${api.config.storage.package.rootDir}/README.md`;
                },
            },
        },
        transformers: {
            og: {
                /**
                 * @name            match
                 * @namespace       config.markdownBuilder.transformers.og
                 * @type            String
                 * @default         /^<!-- og:(.*) -->$/gm
                 *
                 * Specify the regex to match "code" string
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                match: /^<!-- og:(.*) -->$/gm,
                /**
                 * @name            preprocessor
                 * @namespace       config.markdownBuilder.transformers.og
                 * @type            String
                 *
                 * Specify a path to a file that export a function which will be used to preprocess data passed to the view.
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                preprocessor: path_1.default.resolve(packageRoot, 'dist/pkg/esm/node/transformers/og'),
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.transformers.og
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/transformers/og/og.md')
                 *
                 * Specify the "markdown" template to transform this match
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: path_1.default.resolve(packageRoot, 'src/transformers/og/og.md'),
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.transformers.og
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/transformers/og/og.html')
                 *
                 * Specify the "html" template to transform this match
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                html: path_1.default.resolve(packageRoot, 'src/transformers/og/og.html'),
            },
            code: {
                /**
                 * @name            match
                 * @namespace       config.markdownBuilder.transformers.code
                 * @type            String
                 * @default         /^```([a-zA-Z0-9]+)\n([\s\S]*?)```$/gm
                 *
                 * Specify the regex to match "code" string
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                match: /^```([a-zA-Z0-9]+)\n([\s\S]*?)```$/gm,
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.transformers.code
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/transformers/code/code.md')
                 *
                 * Specify the "markdown" template to transform this match
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: path_1.default.resolve(packageRoot, 'src/transformers/code/code.md'),
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.transformers.code
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/transformers/code/code.html')
                 *
                 * Specify the "html" template to transform this match
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                html: path_1.default.resolve(packageRoot, 'src/transformers/code/code.html'),
            },
            absoluteLinks: {
                /**
                 * @name            match
                 * @namespace       config.markdownBuilder.transformers.absoluteLinks
                 * @type            String
                 * @default         /\[(.*)\]\((\/.*)\)/gm
                 *
                 * Specify the regex to match "absolute links" string
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                match: /\[(.*)\]\((\/.*)\)/gm,
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.transformers.absoluteLinks
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/transformers/absoluteLinks/absoluteLinks.md')
                 *
                 * Specify the "markdown" template to transform this match
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: path_1.default.resolve(packageRoot, 'src/transformers/absoluteLinks/absoluteLinks.md'),
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.transformers.absoluteLinks
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/transformers/absoluteLinks/absoluteLinks.html')
                 *
                 * Specify the "html" template to transform this match
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                html: path_1.default.resolve(packageRoot, 'src/transformers/absoluteLinks/absoluteLinks.html'),
            },
        },
        helpers: {},
        partials: {
            license: {
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.partials.license
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/license/license.md')
                 *
                 * Specify the "markdown" template for this "license" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: path_1.default.resolve(packageRoot, 'src/partials/license/license.md'),
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.partials.license
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/license/license.md')
                 *
                 * Specify the "markdown" template for this "license" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                html: path_1.default.resolve(packageRoot, 'src/partials/license/license.md'),
            },
            'license-mit': {
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.partials.license-mit
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/licenseMit/licenseMit.md')
                 *
                 * Specify the "markdown" template for this "license-mit" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: path_1.default.resolve(packageRoot, 'src/partials/licenseMit/licenseMit.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.partials.license-mit
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/licenseMit/licenseMit.md')
                 *
                 * Specify the "html" template for this "license-mit" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                html: path_1.default.resolve(packageRoot, 'src/partials/licenseMit/licenseMit.md'),
            },
            'license-gpl': {
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.partials.license-gpl
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/licenseGpl/licenseGpl.md')
                 *
                 * Specify the "markdown" template for this "license-gpl" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: path_1.default.resolve(packageRoot, 'src/partials/licenseGpl/licenseGpl.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.partials.license-gpl
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/licenseGpl/licenseGpl.md')
                 *
                 * Specify the "html" template for this "license-gpl" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                html: path_1.default.resolve(packageRoot, 'src/partials/licenseGpl/licenseGpl.md'),
            },
            'license-lgpl': {
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.partials.license-lgpl
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/licenseLgpl/licenseLgpl.md')
                 *
                 * Specify the "markdown" template for this "license-lgpl" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: path_1.default.resolve(packageRoot, 'src/partials/licenseLgpl/licenseLgpl.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.partials.license-lgpl
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/licenseLgpl/licenseLgpl.md')
                 *
                 * Specify the "html" template for this "license-lgpl" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                html: path_1.default.resolve(packageRoot, 'src/partials/licenseLgpl/licenseLgpl.md'),
            },
            'license-epl-20': {
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.partials.license-epl-20
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/licenseEpl20/licenseEpl20.md')
                 *
                 * Specify the "markdown" template for this "license-epl-20" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: path_1.default.resolve(packageRoot, 'src/partials/licenseEpl20/licenseEpl20.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.partials.license-epl-20
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/licenseEpl20/licenseEpl20.md')
                 *
                 * Specify the "html" template for this "license-epl-20" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                html: path_1.default.resolve(packageRoot, 'src/partials/licenseEpl20/licenseEpl20.md'),
            },
            'license-mpl-20': {
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.partials.license-mpl-20
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/licenseMpl20/licenseMpl20.md')
                 *
                 * Specify the "markdown" template for this "license-mpl-20" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: path_1.default.resolve(packageRoot, 'src/partials/licenseMpl20/licenseMpl20.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.partials.license-mpl-20
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/licenseMpl20/licenseMpl20.md')
                 *
                 * Specify the "html" template for this "license-mpl-20" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                html: path_1.default.resolve(packageRoot, 'src/partials/licenseMpl20/licenseMpl20.md'),
            },
            'license-cddl-10': {
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.partials.license-cddl-10
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/licenseCddl10/licenseCddl10.md')
                 *
                 * Specify the "markdown" template for this "license-cddl-10" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: path_1.default.resolve(packageRoot, 'src/partials/licenseCddl10/licenseCddl10.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.partials.license-cddl-10
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/licenseCddl10/licenseCddl10.md')
                 *
                 * Specify the "html" template for this "license-cddl-10" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                html: path_1.default.resolve(packageRoot, 'src/partials/licenseCddl10/licenseCddl10.md'),
            },
            'license-apache-20': {
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.partials.license-apache-20
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/licenseApache20/licenseApache20.md')
                 *
                 * Specify the "markdown" template for this "license-apache-20" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: path_1.default.resolve(packageRoot, 'src/partials/licenseApache20/licenseApache20.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.partials.license-apache-20
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/licenseApache20/licenseApache20.md')
                 *
                 * Specify the "html" template for this "license-apache-20" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                html: path_1.default.resolve(packageRoot, 'src/partials/licenseApache20/licenseApache20.md'),
            },
            'license-bsd-2-clause': {
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.partials.license-bsd-2-clause
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/licenseBsd2Clause/licenseBsd2Clause.md')
                 *
                 * Specify the "markdown" template for this "license-bsd-2-clause" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: path_1.default.resolve(packageRoot, 'src/partials/licenseBsd2Clause/licenseBsd2Clause.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.partials.license-bsd-2-clause
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/licenseBsd2Clause/licenseBsd2Clause.md')
                 *
                 * Specify the "html" template for this "license-bsd-2-clause" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                html: path_1.default.resolve(packageRoot, 'src/partials/licenseBsd2Clause/licenseBsd2Clause.md'),
            },
            'license-bsd-3-clause': {
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.partials.license-bsd-3-clause
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/licenseBsd3Clause/licenseBsd3Clause.md')
                 *
                 * Specify the "markdown" template for this "license-bsd-3-clause" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: path_1.default.resolve(packageRoot, 'src/partials/licenseBsd3Clause/licenseBsd3Clause.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.partials.license-bsd-3-clause
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/licenseBsd3Clause/licenseBsd3Clause.md')
                 *
                 * Specify the "html" template for this "license-bsd-3-clause" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                html: path_1.default.resolve(packageRoot, 'src/partials/licenseBsd3Clause/licenseBsd3Clause.md'),
            },
            shields: {
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.partials.shields
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/shields/shields.md')
                 *
                 * Specify the "markdown" template for this "shields" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: path_1.default.resolve(packageRoot, 'src/partials/shields/shields.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.partials.shields
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/shields/shields.md')
                 *
                 * Specify the "html" template for this "shields" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                html: path_1.default.resolve(packageRoot, 'src/partials/shields/shields.md'),
                /**
                 * @name            data
                 * @namespace       config.markdownBuilder.partials.shields
                 * @type            Object
                 * @default         [config.shieldsio]
                 *
                 * Specify specify the datas to use to display the correct shields
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                get data() {
                    return api.config.shieldsio;
                },
            },
            interface: {
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.partials.interface
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/interface/interface.md')
                 *
                 * Specify the "markdown" template for the "interface" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: path_1.default.resolve(packageRoot, 'src/partials/interface/interface.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.partials.interface
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/interface/interface.html')
                 *
                 * Specify the "html" template for the "interface" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                html: path_1.default.resolve(packageRoot, 'src/partials/interface/interface.html'),
            },
            configFiles: {
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.partials.configFiles
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/configFiles/configFiles.md')
                 *
                 * Specify the "markdown" template for the "configFiles" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: path_1.default.resolve(packageRoot, 'src/partials/configFiles/configFiles.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.partials.configFiles
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/configFiles/configFiles.md')
                 *
                 * Specify the "html" template for the "configFiles" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                html: path_1.default.resolve(packageRoot, 'src/partials/configFiles/configFiles.md'),
            },
            config: {
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.partials.config
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/config/config.md')
                 *
                 * Specify the "markdown" template for the "config" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: path_1.default.resolve(packageRoot, 'src/partials/config/config.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.partials.config
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/config/config.md')
                 *
                 * Specify the "html" template for the "config" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                html: path_1.default.resolve(packageRoot, 'src/partials/config/config.html'),
            },
            recipesList: {
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.partials.recipesList
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/recipesList/recipesList.md')
                 *
                 * Specify the "markdown" template for the "recipesList" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: path_1.default.resolve(packageRoot, 'src/partials/recipesList/recipesList.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.partials.recipesList
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/recipesList/recipesList.md')
                 *
                 * Specify the "html" template for the "recipesList" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                html: path_1.default.resolve(packageRoot, 'src/partials/recipesList/recipesList.md'),
            },
            recipe: {
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.partials.recipe
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/recipe/recipe.md')
                 *
                 * Specify the "markdown" template for the "recipe" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: path_1.default.resolve(packageRoot, 'src/partials/recipe/recipe.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.partials.recipe
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/recipe/recipe.md')
                 *
                 * Specify the "html" template for the "recipe" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                html: path_1.default.resolve(packageRoot, 'src/partials/recipe/recipe.md'),
            },
            docMenu: {
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.partials.docMenu
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/docMenu/docMenu.md')
                 *
                 * Specify the "markdown" template for the "docMenu" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: path_1.default.resolve(packageRoot, 'src/partials/docMenu/docMenu.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.partials.docMenu
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/partials/docMenu/docMenu.md')
                 *
                 * Specify the "html" template for the "docMenu" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                html: path_1.default.resolve(packageRoot, 'src/partials/docMenu/docMenu.md'),
            },
        },
        layouts: {
            doc: {
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.layouts.doc
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/layouts/doc/docLayout.md')
                 *
                 * Specify the "markdown" template for the "doc" layout
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: path_1.default.resolve(packageRoot, 'src/layouts/doc/docLayout.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.layouts.doc
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/layouts/doc/docLayout.md')
                 *
                 * Specify the "html" template for the "doc" layout
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                html: path_1.default.resolve(packageRoot, 'src/layouts/doc/docLayout.md'),
                /**
                 * @name            data
                 * @namespace       config.markdownBuilder.layouts.readme
                 * @type            String
                 * @default         [config.doc.layout]
                 *
                 * Specify the data to use for the "doc" layout
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                data: '[config.doc.layout]',
            },
            readme: {
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.layouts.readme
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/layouts/readme/readmeLayout.md')
                 *
                 * Specify the "markdown" template for the "readme" layout
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: path_1.default.resolve(packageRoot, 'src/layouts/readme/readmeLayout.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.layouts.readme
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/layouts/readme/readmeLayout.md')
                 *
                 * Specify the "html" template for the "readme" layout
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                html: path_1.default.resolve(packageRoot, 'src/layouts/readme/readmeLayout.md'),
                /**
                 * @name            data
                 * @namespace       config.markdownBuilder.layouts.readme
                 * @type            String
                 * @default         [config.readme.layout]
                 *
                 * Specify the data to use for the "readme" layout
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                get data() {
                    return api.config.readme.layout;
                },
            },
            license: {
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.layouts.license
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/layouts/license/licenseLayout.md')
                 *
                 * Specify the "markdown" template for the "license" layout
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: path_1.default.resolve(packageRoot, 'src/layouts/license/licenseLayout.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.layouts.license
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/layouts/license/licenseLayout.md')
                 *
                 * Specify the "html" template for the "license" layout
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                html: path_1.default.resolve(packageRoot, 'src/layouts/license/licenseLayout.md'),
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.layouts.license
                 * @type            String
                 * @default         [config.license.layout]
                 *
                 * Specify the data to use for the "license" layout
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                get data() {
                    return api.config.license.layout;
                },
            },
        },
        sections: {
            'readme-header': {
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.sections.readme-header
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/sections/readmeHeader/readmeHeaderSection.md')
                 *
                 * Specify the "markdown" template for the "readme-header" section
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: path_1.default.resolve(packageRoot, 'src/sections/readmeHeader/readmeHeaderSection.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.sections.readme-header
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/sections/readmeHeader/readmeHeaderSection.md')
                 *
                 * Specify the "html" template for the "readme-header" section
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                html: path_1.default.resolve(packageRoot, 'src/sections/readmeHeader/readmeHeaderSection.md'),
            },
            'doc-header': {
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.sections.doc-header
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/sections/docHeader/docHeaderSection.md')
                 *
                 * Specify the "markdown" template for the "doc-header" section
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: path_1.default.resolve(packageRoot, 'src/sections/docHeader/docHeaderSection.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.sections.doc-header
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/sections/docHeader/docHeaderSection.md')
                 *
                 * Specify the "html" template for the "doc-header" section
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                html: path_1.default.resolve(packageRoot, 'src/sections/docHeader/docHeaderSection.md'),
            },
            'doc-menu': {
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.sections.doc-menu
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/sections/docMenu/docMenuSection.md')
                 *
                 * Specify the "markdown" template for the "doc-menu" section
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: path_1.default.resolve(packageRoot, 'src/sections/docMenu/docMenuSection.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.sections.doc-menu
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/sections/docMenu/docMenuSection.md')
                 *
                 * Specify the "html" template for the "doc-menu" section
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                html: path_1.default.resolve(packageRoot, 'src/sections/docMenu/docMenuSection.md'),
            },
            description: {
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.sections.description
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/sections/description/descriptionSection.md')
                 *
                 * Specify the "markdown" template for the "description" section
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: path_1.default.resolve(packageRoot, 'src/sections/description/descriptionSection.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.sections.description
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/sections/description/descriptionSection.md')
                 *
                 * Specify the "html" template for the "description" section
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                html: path_1.default.resolve(packageRoot, 'src/sections/description/descriptionSection.md'),
            },
            install: {
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.sections.install
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/sections/install/installSection.md')
                 *
                 * Specify the "markdown" template for the "install" section
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: path_1.default.resolve(packageRoot, 'src/sections/install/installSection.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.sections.install
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/sections/install/installSection.md')
                 *
                 * Specify the "html" template for the "install" section
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                html: path_1.default.resolve(packageRoot, 'src/sections/install/installSection.md'),
            },
            license: {
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.sections.license
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/sections/license/licenseSection.md')
                 *
                 * Specify the "markdown" template for the "license" section
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: path_1.default.resolve(packageRoot, 'src/sections/license/licenseSection.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.sections.license
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/sections/license/licenseSection.md')
                 *
                 * Specify the "html" template for the "license" section
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                html: path_1.default.resolve(packageRoot, 'src/sections/license/licenseSection.md'),
            },
            contact: {
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.sections.contact
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/sections/contact/contactSection.md')
                 *
                 * Specify the "markdown" template for the "contact" section
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: path_1.default.resolve(packageRoot, 'src/sections/contact/contactSection.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.sections.contact
                 * @type            String
                 * @default         __path.resolve(packageRoot,'src/sections/contact/contactSection.md')
                 *
                 * Specify the "html" template for the "contact" section
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                html: path_1.default.resolve(packageRoot, 'src/sections/contact/contactSection.md'),
            },
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0ZBQTREO0FBQzVELDRGQUFzRTtBQUN0RSxnREFBMEI7QUFFMUIsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxNQUFNLFdBQVcsR0FBRyxJQUFBLHFCQUFhLEVBQUMsSUFBQSxpQkFBUyxHQUFFLENBQUMsQ0FBQztJQUUvQyxPQUFPO1FBQ0gsT0FBTyxFQUFFO1lBQ0w7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSwyQkFBMkI7WUFFakM7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksS0FBSztnQkFDTCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7WUFDMUMsQ0FBQztZQUVEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxNQUFNLEVBQUUsSUFBSTtZQUNaOzs7Ozs7Ozs7O2VBVUc7WUFDSCxLQUFLLEVBQUUsSUFBSTtZQUNYOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLE1BQU07Z0JBQ04sT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQzNDLENBQUM7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLElBQUk7WUFDYjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLElBQUk7WUFDVjs7Ozs7Ozs7Ozs7ZUFXRztZQUNILE1BQU0sRUFBRSxVQUFVO1lBQ2xCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxhQUFhLEVBQUUsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDO1NBQ3RDO1FBRUQsS0FBSyxFQUFFO1lBQ0g7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksVUFBVTtnQkFDVixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FB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