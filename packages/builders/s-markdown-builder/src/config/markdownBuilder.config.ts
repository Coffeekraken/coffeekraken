import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __path from 'path';

export default function (env, config) {
    if (env.platform !== 'node') return;

    const packageRoot = __packageRoot(__dirname());

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
                preprocessor: __path.resolve(
                    packageRoot,
                    'dist/pkg/esm/node/transformers/og',
                ),
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
                markdown: __path.resolve(
                    packageRoot,
                    'src/transformers/og/og.md',
                ),
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
                html: __path.resolve(
                    packageRoot,
                    'src/transformers/og/og.html',
                ),
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
                markdown: __path.resolve(
                    packageRoot,
                    'src/transformers/code/code.md',
                ),
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
                html: __path.resolve(
                    packageRoot,
                    'src/transformers/code/code.html',
                ),
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
                markdown: __path.resolve(
                    packageRoot,
                    'src/partials/license/license.md',
                ),
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
                html: __path.resolve(
                    packageRoot,
                    'src/partials/license/license.md',
                ),
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
                markdown: __path.resolve(
                    packageRoot,
                    'src/partials/licenseMit/licenseMit.md',
                ),
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
                html: __path.resolve(
                    packageRoot,
                    'src/partials/licenseMit/licenseMit.md',
                ),
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
                markdown: __path.resolve(
                    packageRoot,
                    'src/partials/licenseGpl/licenseGpl.md',
                ),
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
                html: __path.resolve(
                    packageRoot,
                    'src/partials/licenseGpl/licenseGpl.md',
                ),
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
                markdown: __path.resolve(
                    packageRoot,
                    'src/partials/licenseLgpl/licenseLgpl.md',
                ),
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
                html: __path.resolve(
                    packageRoot,
                    'src/partials/licenseLgpl/licenseLgpl.md',
                ),
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
                markdown: __path.resolve(
                    packageRoot,
                    'src/partials/licenseEpl20/licenseEpl20.md',
                ),
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
                html: __path.resolve(
                    packageRoot,
                    'src/partials/licenseEpl20/licenseEpl20.md',
                ),
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
                markdown: __path.resolve(
                    packageRoot,
                    'src/partials/licenseMpl20/licenseMpl20.md',
                ),
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
                html: __path.resolve(
                    packageRoot,
                    'src/partials/licenseMpl20/licenseMpl20.md',
                ),
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
                markdown: __path.resolve(
                    packageRoot,
                    'src/partials/licenseCddl10/licenseCddl10.md',
                ),
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
                html: __path.resolve(
                    packageRoot,
                    'src/partials/licenseCddl10/licenseCddl10.md',
                ),
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
                markdown: __path.resolve(
                    packageRoot,
                    'src/partials/licenseApache20/licenseApache20.md',
                ),
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
                html: __path.resolve(
                    packageRoot,
                    'src/partials/licenseApache20/licenseApache20.md',
                ),
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
                markdown: __path.resolve(
                    packageRoot,
                    'src/partials/licenseBsd2Clause/licenseBsd2Clause.md',
                ),
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
                html: __path.resolve(
                    packageRoot,
                    'src/partials/licenseBsd2Clause/licenseBsd2Clause.md',
                ),
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
                markdown: __path.resolve(
                    packageRoot,
                    'src/partials/licenseBsd3Clause/licenseBsd3Clause.md',
                ),
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
                html: __path.resolve(
                    packageRoot,
                    'src/partials/licenseBsd3Clause/licenseBsd3Clause.md',
                ),
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
                markdown: __path.resolve(
                    packageRoot,
                    'src/partials/shields/shields.md',
                ),
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
                html: __path.resolve(
                    packageRoot,
                    'src/partials/shields/shields.md',
                ),
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
                 * @default         __path.resolve(packageRoot,'src/partials/interface/interface.md')
                 *
                 * Specify the "markdown" template for the "interface" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: __path.resolve(
                    packageRoot,
                    'src/partials/interface/interface.md',
                ),
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
                html: __path.resolve(
                    packageRoot,
                    'src/partials/interface/interface.html',
                ),
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
                markdown: __path.resolve(
                    packageRoot,
                    'src/partials/configFiles/configFiles.md',
                ),
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
                html: __path.resolve(
                    packageRoot,
                    'src/partials/configFiles/configFiles.md',
                ),
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
                markdown: __path.resolve(
                    packageRoot,
                    'src/partials/config/config.md',
                ),
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
                html: __path.resolve(
                    packageRoot,
                    'src/partials/config/config.html',
                ),
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
                markdown: __path.resolve(
                    packageRoot,
                    'src/partials/recipesList/recipesList.md',
                ),
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
                html: __path.resolve(
                    packageRoot,
                    'src/partials/recipesList/recipesList.md',
                ),
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
                markdown: __path.resolve(
                    packageRoot,
                    'src/partials/recipe/recipe.md',
                ),
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
                html: __path.resolve(
                    packageRoot,
                    'src/partials/recipe/recipe.md',
                ),
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
                markdown: __path.resolve(
                    packageRoot,
                    'src/partials/docMenu/docMenu.md',
                ),
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
                html: __path.resolve(
                    packageRoot,
                    'src/partials/docMenu/docMenu.md',
                ),
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
                markdown: __path.resolve(
                    packageRoot,
                    'src/layouts/doc/docLayout.md',
                ),
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
                html: __path.resolve(
                    packageRoot,
                    'src/layouts/doc/docLayout.md',
                ),
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
                markdown: __path.resolve(
                    packageRoot,
                    'src/layouts/readme/readmeLayout.md',
                ),
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
                html: __path.resolve(
                    packageRoot,
                    'src/layouts/readme/readmeLayout.md',
                ),
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
                 * @default         __path.resolve(packageRoot,'src/layouts/license/licenseLayout.md')
                 *
                 * Specify the "markdown" template for the "license" layout
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: __path.resolve(
                    packageRoot,
                    'src/layouts/license/licenseLayout.md',
                ),
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
                html: __path.resolve(
                    packageRoot,
                    'src/layouts/license/licenseLayout.md',
                ),
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
                 * @default         __path.resolve(packageRoot,'src/sections/readmeHeader/readmeHeaderSection.md')
                 *
                 * Specify the "markdown" template for the "readme-header" section
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                markdown: __path.resolve(
                    packageRoot,
                    'src/sections/readmeHeader/readmeHeaderSection.md',
                ),
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
                html: __path.resolve(
                    packageRoot,
                    'src/sections/readmeHeader/readmeHeaderSection.md',
                ),
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
                markdown: __path.resolve(
                    packageRoot,
                    'src/sections/docHeader/docHeaderSection.md',
                ),
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
                html: __path.resolve(
                    packageRoot,
                    'src/sections/docHeader/docHeaderSection.md',
                ),
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
                markdown: __path.resolve(
                    packageRoot,
                    'src/sections/docMenu/docMenuSection.md',
                ),
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
                html: __path.resolve(
                    packageRoot,
                    'src/sections/docMenu/docMenuSection.md',
                ),
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
                markdown: __path.resolve(
                    packageRoot,
                    'src/sections/description/descriptionSection.md',
                ),
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
                html: __path.resolve(
                    packageRoot,
                    'src/sections/description/descriptionSection.md',
                ),
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
                markdown: __path.resolve(
                    packageRoot,
                    'src/sections/install/installSection.md',
                ),
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
                html: __path.resolve(
                    packageRoot,
                    'src/sections/install/installSection.md',
                ),
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
                markdown: __path.resolve(
                    packageRoot,
                    'src/sections/license/licenseSection.md',
                ),
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
                html: __path.resolve(
                    packageRoot,
                    'src/sections/license/licenseSection.md',
                ),
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
                markdown: __path.resolve(
                    packageRoot,
                    'src/sections/contact/contactSection.md',
                ),
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
                html: __path.resolve(
                    packageRoot,
                    'src/sections/contact/contactSection.md',
                ),
            },
        },
    };
}
