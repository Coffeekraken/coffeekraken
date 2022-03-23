var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/sugar/node/fs/dirname", "path"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
    const path_1 = __importDefault(require("path"));
    function default_1(env, config) {
        if (env.platform !== 'node')
            return;
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
                inDir: '[config.storage.src.rootDir]',
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
                outDir: '[config.storage.dist.rootDir]',
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
            presets: {},
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
                    preprocessor: path_1.default.resolve((0, dirname_1.default)(), '../transformers/og/og'),
                    /**
                     * @name            markdown
                     * @namespace       config.markdownBuilder.transformers.og
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../transformers/og/og.md')
                     *
                     * Specify the "markdown" template to transform this match
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    markdown: path_1.default.resolve((0, dirname_1.default)(), '../transformers/og/og.md'),
                    /**
                     * @name            markdown
                     * @namespace       config.markdownBuilder.transformers.og
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../transformers/og/og.html')
                     *
                     * Specify the "html" template to transform this match
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    html: path_1.default.resolve((0, dirname_1.default)(), '../transformers/og/og.html'),
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
                     * @default         __path.resolve(__dirname(),'../transformers/code/code.md')
                     *
                     * Specify the "markdown" template to transform this match
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    markdown: path_1.default.resolve((0, dirname_1.default)(), '../transformers/code/code.md'),
                    /**
                     * @name            markdown
                     * @namespace       config.markdownBuilder.transformers.code
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../transformers/code/code.html')
                     *
                     * Specify the "html" template to transform this match
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    html: path_1.default.resolve((0, dirname_1.default)(), '../transformers/code/code.html'),
                },
            },
            helpers: {},
            partials: {
                license: {
                    /**
                     * @name            markdown
                     * @namespace       config.markdownBuilder.partials.license
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/license/license.md')
                     *
                     * Specify the "markdown" template for this "license" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    markdown: path_1.default.resolve((0, dirname_1.default)(), '../partials/license/license.md'),
                    /**
                     * @name            markdown
                     * @namespace       config.markdownBuilder.partials.license
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/license/license.md')
                     *
                     * Specify the "markdown" template for this "license" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    html: path_1.default.resolve((0, dirname_1.default)(), '../partials/license/license.md'),
                },
                'license-mit': {
                    /**
                     * @name            markdown
                     * @namespace       config.markdownBuilder.partials.license-mit
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/licenseMit/licenseMit.md')
                     *
                     * Specify the "markdown" template for this "license-mit" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    markdown: path_1.default.resolve((0, dirname_1.default)(), '../partials/licenseMit/licenseMit.md'),
                    /**
                     * @name            html
                     * @namespace       config.markdownBuilder.partials.license-mit
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/licenseMit/licenseMit.md')
                     *
                     * Specify the "html" template for this "license-mit" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    html: path_1.default.resolve((0, dirname_1.default)(), '../partials/licenseMit/licenseMit.md'),
                },
                'license-gpl': {
                    /**
                     * @name            markdown
                     * @namespace       config.markdownBuilder.partials.license-gpl
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/licenseGpl/licenseGpl.md')
                     *
                     * Specify the "markdown" template for this "license-gpl" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    markdown: path_1.default.resolve((0, dirname_1.default)(), '../partials/licenseGpl/licenseGpl.md'),
                    /**
                     * @name            html
                     * @namespace       config.markdownBuilder.partials.license-gpl
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/licenseGpl/licenseGpl.md')
                     *
                     * Specify the "html" template for this "license-gpl" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    html: path_1.default.resolve((0, dirname_1.default)(), '../partials/licenseGpl/licenseGpl.md'),
                },
                'license-lgpl': {
                    /**
                     * @name            markdown
                     * @namespace       config.markdownBuilder.partials.license-lgpl
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/licenseLgpl/licenseLgpl.md')
                     *
                     * Specify the "markdown" template for this "license-lgpl" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    markdown: path_1.default.resolve((0, dirname_1.default)(), '../partials/licenseLgpl/licenseLgpl.md'),
                    /**
                     * @name            html
                     * @namespace       config.markdownBuilder.partials.license-lgpl
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/licenseLgpl/licenseLgpl.md')
                     *
                     * Specify the "html" template for this "license-lgpl" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    html: path_1.default.resolve((0, dirname_1.default)(), '../partials/licenseLgpl/licenseLgpl.md'),
                },
                'license-epl-20': {
                    /**
                     * @name            markdown
                     * @namespace       config.markdownBuilder.partials.license-epl-20
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/licenseEpl20/licenseEpl20.md')
                     *
                     * Specify the "markdown" template for this "license-epl-20" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    markdown: path_1.default.resolve((0, dirname_1.default)(), '../partials/licenseEpl20/licenseEpl20.md'),
                    /**
                     * @name            html
                     * @namespace       config.markdownBuilder.partials.license-epl-20
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/licenseEpl20/licenseEpl20.md')
                     *
                     * Specify the "html" template for this "license-epl-20" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    html: path_1.default.resolve((0, dirname_1.default)(), '../partials/licenseEpl20/licenseEpl20.md'),
                },
                'license-mpl-20': {
                    /**
                     * @name            markdown
                     * @namespace       config.markdownBuilder.partials.license-mpl-20
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/licenseMpl20/licenseMpl20.md')
                     *
                     * Specify the "markdown" template for this "license-mpl-20" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    markdown: path_1.default.resolve((0, dirname_1.default)(), '../partials/licenseMpl20/licenseMpl20.md'),
                    /**
                     * @name            html
                     * @namespace       config.markdownBuilder.partials.license-mpl-20
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/licenseMpl20/licenseMpl20.md')
                     *
                     * Specify the "html" template for this "license-mpl-20" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    html: path_1.default.resolve((0, dirname_1.default)(), '../partials/licenseMpl20/licenseMpl20.md'),
                },
                'license-cddl-10': {
                    /**
                     * @name            markdown
                     * @namespace       config.markdownBuilder.partials.license-cddl-10
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/licenseCddl10/licenseCddl10.md')
                     *
                     * Specify the "markdown" template for this "license-cddl-10" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    markdown: path_1.default.resolve((0, dirname_1.default)(), '../partials/licenseCddl10/licenseCddl10.md'),
                    /**
                     * @name            html
                     * @namespace       config.markdownBuilder.partials.license-cddl-10
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/licenseCddl10/licenseCddl10.md')
                     *
                     * Specify the "html" template for this "license-cddl-10" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    html: path_1.default.resolve((0, dirname_1.default)(), '../partials/licenseCddl10/licenseCddl10.md'),
                },
                'license-apache-20': {
                    /**
                     * @name            markdown
                     * @namespace       config.markdownBuilder.partials.license-apache-20
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/licenseApache20/licenseApache20.md')
                     *
                     * Specify the "markdown" template for this "license-apache-20" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    markdown: path_1.default.resolve((0, dirname_1.default)(), '../partials/licenseApache20/licenseApache20.md'),
                    /**
                     * @name            html
                     * @namespace       config.markdownBuilder.partials.license-apache-20
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/licenseApache20/licenseApache20.md')
                     *
                     * Specify the "html" template for this "license-apache-20" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    html: path_1.default.resolve((0, dirname_1.default)(), '../partials/licenseApache20/licenseApache20.md'),
                },
                'license-bsd-2-clause': {
                    /**
                     * @name            markdown
                     * @namespace       config.markdownBuilder.partials.license-bsd-2-clause
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/licenseBsd2Clause/licenseBsd2Clause.md')
                     *
                     * Specify the "markdown" template for this "license-bsd-2-clause" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    markdown: path_1.default.resolve((0, dirname_1.default)(), '../partials/licenseBsd2Clause/licenseBsd2Clause.md'),
                    /**
                     * @name            html
                     * @namespace       config.markdownBuilder.partials.license-bsd-2-clause
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/licenseBsd2Clause/licenseBsd2Clause.md')
                     *
                     * Specify the "html" template for this "license-bsd-2-clause" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    html: path_1.default.resolve((0, dirname_1.default)(), '../partials/licenseBsd2Clause/licenseBsd2Clause.md'),
                },
                'license-bsd-3-clause': {
                    /**
                     * @name            markdown
                     * @namespace       config.markdownBuilder.partials.license-bsd-3-clause
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/licenseBsd3Clause/licenseBsd3Clause.md')
                     *
                     * Specify the "markdown" template for this "license-bsd-3-clause" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    markdown: path_1.default.resolve((0, dirname_1.default)(), '../partials/licenseBsd3Clause/licenseBsd3Clause.md'),
                    /**
                     * @name            html
                     * @namespace       config.markdownBuilder.partials.license-bsd-3-clause
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/licenseBsd3Clause/licenseBsd3Clause.md')
                     *
                     * Specify the "html" template for this "license-bsd-3-clause" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    html: path_1.default.resolve((0, dirname_1.default)(), '../partials/licenseBsd3Clause/licenseBsd3Clause.md'),
                },
                shields: {
                    /**
                     * @name            markdown
                     * @namespace       config.markdownBuilder.partials.shields
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/shields/shields.md')
                     *
                     * Specify the "markdown" template for this "shields" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    markdown: path_1.default.resolve((0, dirname_1.default)(), '../partials/shields/shields.md'),
                    /**
                     * @name            html
                     * @namespace       config.markdownBuilder.partials.shields
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/shields/shields.md')
                     *
                     * Specify the "html" template for this "shields" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    html: path_1.default.resolve((0, dirname_1.default)(), '../partials/shields/shields.md'),
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
                    data: '[config.shieldsio]',
                },
                interface: {
                    /**
                     * @name            markdown
                     * @namespace       config.markdownBuilder.partials.interface
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/interface/interface.md')
                     *
                     * Specify the "markdown" template for the "interface" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    markdown: path_1.default.resolve((0, dirname_1.default)(), '../partials/interface/interface.md'),
                    /**
                     * @name            html
                     * @namespace       config.markdownBuilder.partials.interface
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/interface/interface.html')
                     *
                     * Specify the "html" template for the "interface" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    html: path_1.default.resolve((0, dirname_1.default)(), '../partials/interface/interface.html'),
                },
                configFiles: {
                    /**
                     * @name            markdown
                     * @namespace       config.markdownBuilder.partials.configFiles
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/configFiles/configFiles.md')
                     *
                     * Specify the "markdown" template for the "configFiles" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    markdown: path_1.default.resolve((0, dirname_1.default)(), '../partials/configFiles/configFiles.md'),
                    /**
                     * @name            html
                     * @namespace       config.markdownBuilder.partials.configFiles
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/configFiles/configFiles.md')
                     *
                     * Specify the "html" template for the "configFiles" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    html: path_1.default.resolve((0, dirname_1.default)(), '../partials/configFiles/configFiles.md'),
                },
                config: {
                    /**
                     * @name            markdown
                     * @namespace       config.markdownBuilder.partials.config
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/config/config.md')
                     *
                     * Specify the "markdown" template for the "config" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    markdown: path_1.default.resolve((0, dirname_1.default)(), '../partials/config/config.md'),
                    /**
                     * @name            html
                     * @namespace       config.markdownBuilder.partials.config
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/config/config.md')
                     *
                     * Specify the "html" template for the "config" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    html: path_1.default.resolve((0, dirname_1.default)(), '../partials/config/config.html'),
                },
                recipesList: {
                    /**
                     * @name            markdown
                     * @namespace       config.markdownBuilder.partials.recipesList
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/recipesList/recipesList.md')
                     *
                     * Specify the "markdown" template for the "recipesList" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    markdown: path_1.default.resolve((0, dirname_1.default)(), '../partials/recipesList/recipesList.md'),
                    /**
                     * @name            html
                     * @namespace       config.markdownBuilder.partials.recipesList
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/recipesList/recipesList.md')
                     *
                     * Specify the "html" template for the "recipesList" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    html: path_1.default.resolve((0, dirname_1.default)(), '../partials/recipesList/recipesList.md'),
                },
                recipe: {
                    /**
                     * @name            markdown
                     * @namespace       config.markdownBuilder.partials.recipe
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/recipe/recipe.md')
                     *
                     * Specify the "markdown" template for the "recipe" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    markdown: path_1.default.resolve((0, dirname_1.default)(), '../partials/recipe/recipe.md'),
                    /**
                     * @name            html
                     * @namespace       config.markdownBuilder.partials.recipe
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/recipe/recipe.md')
                     *
                     * Specify the "html" template for the "recipe" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    html: path_1.default.resolve((0, dirname_1.default)(), '../partials/recipe/recipe.md'),
                },
                docMenu: {
                    /**
                     * @name            markdown
                     * @namespace       config.markdownBuilder.partials.docMenu
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/docMenu/docMenu.md')
                     *
                     * Specify the "markdown" template for the "docMenu" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    markdown: path_1.default.resolve((0, dirname_1.default)(), '../partials/docMenu/docMenu.md'),
                    /**
                     * @name            html
                     * @namespace       config.markdownBuilder.partials.docMenu
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../partials/docMenu/docMenu.md')
                     *
                     * Specify the "html" template for the "docMenu" partial
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    html: path_1.default.resolve((0, dirname_1.default)(), '../partials/docMenu/docMenu.md'),
                },
            },
            layouts: {
                doc: {
                    /**
                     * @name            markdown
                     * @namespace       config.markdownBuilder.layouts.doc
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../layouts/doc/docLayout.md')
                     *
                     * Specify the "markdown" template for the "doc" layout
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    markdown: path_1.default.resolve((0, dirname_1.default)(), '../layouts/doc/docLayout.md'),
                    /**
                     * @name            html
                     * @namespace       config.markdownBuilder.layouts.doc
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../layouts/doc/docLayout.md')
                     *
                     * Specify the "html" template for the "doc" layout
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    html: path_1.default.resolve((0, dirname_1.default)(), '../layouts/doc/docLayout.md'),
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
                     * @default         __path.resolve(__dirname(),'../layouts/readme/readmeLayout.md')
                     *
                     * Specify the "markdown" template for the "readme" layout
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    markdown: path_1.default.resolve((0, dirname_1.default)(), '../layouts/readme/readmeLayout.md'),
                    /**
                     * @name            html
                     * @namespace       config.markdownBuilder.layouts.readme
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../layouts/readme/readmeLayout.md')
                     *
                     * Specify the "html" template for the "readme" layout
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    html: path_1.default.resolve((0, dirname_1.default)(), '../layouts/readme/readmeLayout.md'),
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
                    data: '[config.readme.layout]',
                },
                license: {
                    /**
                     * @name            markdown
                     * @namespace       config.markdownBuilder.layouts.license
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../layouts/license/licenseLayout.md')
                     *
                     * Specify the "markdown" template for the "license" layout
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    markdown: path_1.default.resolve((0, dirname_1.default)(), '../layouts/license/licenseLayout.md'),
                    /**
                     * @name            html
                     * @namespace       config.markdownBuilder.layouts.license
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../layouts/license/licenseLayout.md')
                     *
                     * Specify the "html" template for the "license" layout
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    html: path_1.default.resolve((0, dirname_1.default)(), '../layouts/license/licenseLayout.md'),
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
                    data: '[config.license.layout]',
                },
            },
            sections: {
                'readme-header': {
                    /**
                     * @name            markdown
                     * @namespace       config.markdownBuilder.sections.readme-header
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../sections/readmeHeader/readmeHeaderSection.md')
                     *
                     * Specify the "markdown" template for the "readme-header" section
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    markdown: path_1.default.resolve((0, dirname_1.default)(), '../sections/readmeHeader/readmeHeaderSection.md'),
                    /**
                     * @name            html
                     * @namespace       config.markdownBuilder.sections.readme-header
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../sections/readmeHeader/readmeHeaderSection.md')
                     *
                     * Specify the "html" template for the "readme-header" section
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    html: path_1.default.resolve((0, dirname_1.default)(), '../sections/readmeHeader/readmeHeaderSection.md'),
                },
                'doc-header': {
                    /**
                     * @name            markdown
                     * @namespace       config.markdownBuilder.sections.doc-header
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../sections/docHeader/docHeaderSection.md')
                     *
                     * Specify the "markdown" template for the "doc-header" section
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    markdown: path_1.default.resolve((0, dirname_1.default)(), '../sections/docHeader/docHeaderSection.md'),
                    /**
                     * @name            html
                     * @namespace       config.markdownBuilder.sections.doc-header
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../sections/docHeader/docHeaderSection.md')
                     *
                     * Specify the "html" template for the "doc-header" section
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    html: path_1.default.resolve((0, dirname_1.default)(), '../sections/docHeader/docHeaderSection.md'),
                },
                'doc-menu': {
                    /**
                     * @name            markdown
                     * @namespace       config.markdownBuilder.sections.doc-menu
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../sections/docMenu/docMenuSection.md')
                     *
                     * Specify the "markdown" template for the "doc-menu" section
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    markdown: path_1.default.resolve((0, dirname_1.default)(), '../sections/docMenu/docMenuSection.md'),
                    /**
                     * @name            html
                     * @namespace       config.markdownBuilder.sections.doc-menu
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../sections/docMenu/docMenuSection.md')
                     *
                     * Specify the "html" template for the "doc-menu" section
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    html: path_1.default.resolve((0, dirname_1.default)(), '../sections/docMenu/docMenuSection.md'),
                },
                description: {
                    /**
                     * @name            markdown
                     * @namespace       config.markdownBuilder.sections.description
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../sections/description/descriptionSection.md')
                     *
                     * Specify the "markdown" template for the "description" section
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    markdown: path_1.default.resolve((0, dirname_1.default)(), '../sections/description/descriptionSection.md'),
                    /**
                     * @name            html
                     * @namespace       config.markdownBuilder.sections.description
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../sections/description/descriptionSection.md')
                     *
                     * Specify the "html" template for the "description" section
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    html: path_1.default.resolve((0, dirname_1.default)(), '../sections/description/descriptionSection.md'),
                },
                install: {
                    /**
                     * @name            markdown
                     * @namespace       config.markdownBuilder.sections.install
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../sections/install/installSection.md')
                     *
                     * Specify the "markdown" template for the "install" section
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    markdown: path_1.default.resolve((0, dirname_1.default)(), '../sections/install/installSection.md'),
                    /**
                     * @name            html
                     * @namespace       config.markdownBuilder.sections.install
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../sections/install/installSection.md')
                     *
                     * Specify the "html" template for the "install" section
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    html: path_1.default.resolve((0, dirname_1.default)(), '../sections/install/installSection.md'),
                },
                license: {
                    /**
                     * @name            markdown
                     * @namespace       config.markdownBuilder.sections.license
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../sections/license/licenseSection.md')
                     *
                     * Specify the "markdown" template for the "license" section
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    markdown: path_1.default.resolve((0, dirname_1.default)(), '../sections/license/licenseSection.md'),
                    /**
                     * @name            html
                     * @namespace       config.markdownBuilder.sections.license
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../sections/license/licenseSection.md')
                     *
                     * Specify the "html" template for the "license" section
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    html: path_1.default.resolve((0, dirname_1.default)(), '../sections/license/licenseSection.md'),
                },
                contact: {
                    /**
                     * @name            markdown
                     * @namespace       config.markdownBuilder.sections.contact
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../sections/contact/contactSection.md')
                     *
                     * Specify the "markdown" template for the "contact" section
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    markdown: path_1.default.resolve((0, dirname_1.default)(), '../sections/contact/contactSection.md'),
                    /**
                     * @name            html
                     * @namespace       config.markdownBuilder.sections.contact
                     * @type            String
                     * @default         __path.resolve(__dirname(),'../sections/contact/contactSection.md')
                     *
                     * Specify the "html" template for the "contact" section
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    html: path_1.default.resolve((0, dirname_1.default)(), '../sections/contact/contactSection.md'),
                },
            },
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd25CdWlsZGVyLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcmtkb3duQnVpbGRlci5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFBQSxrRkFBNEQ7SUFDNUQsZ0RBQTBCO0lBRTFCLG1CQUF5QixHQUFHLEVBQUUsTUFBTTtRQUNoQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtZQUFFLE9BQU87UUFFcEMsT0FBTztZQUNILE9BQU8sRUFBRTtnQkFDTDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxJQUFJLEVBQUUsMkJBQTJCO2dCQUNqQzs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUsOEJBQThCO2dCQUNyQzs7Ozs7Ozs7OzttQkFVRztnQkFDSCxNQUFNLEVBQUUsSUFBSTtnQkFDWjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUsSUFBSTtnQkFDWDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxNQUFNLEVBQUUsK0JBQStCO2dCQUN2Qzs7Ozs7Ozs7OzttQkFVRztnQkFDSCxPQUFPLEVBQUUsSUFBSTtnQkFDYjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxJQUFJLEVBQUUsSUFBSTtnQkFDVjs7Ozs7Ozs7Ozs7bUJBV0c7Z0JBQ0gsTUFBTSxFQUFFLFVBQVU7Z0JBQ2xCOzs7Ozs7Ozs7O21CQVVHO2dCQUNILGFBQWEsRUFBRSxDQUFDLFVBQVUsRUFBQyxNQUFNLENBQUM7YUFDckM7WUFDRCxPQUFPLEVBQUUsRUFBRTtZQUNYLFlBQVksRUFBRTtnQkFDVixFQUFFLEVBQUU7b0JBQ0E7Ozs7Ozs7Ozs7dUJBVUc7b0JBQ0gsS0FBSyxFQUFFLHNCQUFzQjtvQkFDN0I7Ozs7Ozs7Ozt1QkFTRztvQkFDSCxZQUFZLEVBQUUsY0FBTSxDQUFDLE9BQU8sQ0FBQyxJQUFBLGlCQUFTLEdBQUUsRUFBRSx1QkFBdUIsQ0FBQztvQkFDbEU7Ozs7Ozs7Ozs7dUJBVUc7b0JBQ0gsUUFBUSxF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