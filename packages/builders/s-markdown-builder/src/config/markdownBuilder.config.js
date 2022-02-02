import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __path from 'path';
export default function (env, config) {
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
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            protectedTags: ['template', 'code'],
        },
        presets: {},
        transformers: {
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                markdown: __path.resolve(__dirname(), '../transformers/code/code.md'),
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.transformers.code
                 * @type            String
                 * @default         __path.resolve(__dirname(),'../transformers/code/code.html')
                 *
                 * Specify the "html" template to transform this match
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                html: __path.resolve(__dirname(), '../transformers/code/code.html'),
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                markdown: __path.resolve(__dirname(), '../partials/license/license.md'),
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.partials.license
                 * @type            String
                 * @default         __path.resolve(__dirname(),'../partials/license/license.md')
                 *
                 * Specify the "markdown" template for this "license" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                html: __path.resolve(__dirname(), '../partials/license/license.md'),
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                markdown: __path.resolve(__dirname(), '../partials/licenseMit/licenseMit.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.partials.license-mit
                 * @type            String
                 * @default         __path.resolve(__dirname(),'../partials/licenseMit/licenseMit.md')
                 *
                 * Specify the "html" template for this "license-mit" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                html: __path.resolve(__dirname(), '../partials/licenseMit/licenseMit.md'),
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                markdown: __path.resolve(__dirname(), '../partials/licenseGpl/licenseGpl.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.partials.license-gpl
                 * @type            String
                 * @default         __path.resolve(__dirname(),'../partials/licenseGpl/licenseGpl.md')
                 *
                 * Specify the "html" template for this "license-gpl" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                html: __path.resolve(__dirname(), '../partials/licenseGpl/licenseGpl.md'),
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                markdown: __path.resolve(__dirname(), '../partials/licenseLgpl/licenseLgpl.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.partials.license-lgpl
                 * @type            String
                 * @default         __path.resolve(__dirname(),'../partials/licenseLgpl/licenseLgpl.md')
                 *
                 * Specify the "html" template for this "license-lgpl" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                html: __path.resolve(__dirname(), '../partials/licenseLgpl/licenseLgpl.md'),
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                markdown: __path.resolve(__dirname(), '../partials/licenseEpl20/licenseEpl20.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.partials.license-epl-20
                 * @type            String
                 * @default         __path.resolve(__dirname(),'../partials/licenseEpl20/licenseEpl20.md')
                 *
                 * Specify the "html" template for this "license-epl-20" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                html: __path.resolve(__dirname(), '../partials/licenseEpl20/licenseEpl20.md'),
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                markdown: __path.resolve(__dirname(), '../partials/licenseMpl20/licenseMpl20.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.partials.license-mpl-20
                 * @type            String
                 * @default         __path.resolve(__dirname(),'../partials/licenseMpl20/licenseMpl20.md')
                 *
                 * Specify the "html" template for this "license-mpl-20" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                html: __path.resolve(__dirname(), '../partials/licenseMpl20/licenseMpl20.md'),
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                markdown: __path.resolve(__dirname(), '../partials/licenseCddl10/licenseCddl10.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.partials.license-cddl-10
                 * @type            String
                 * @default         __path.resolve(__dirname(),'../partials/licenseCddl10/licenseCddl10.md')
                 *
                 * Specify the "html" template for this "license-cddl-10" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                html: __path.resolve(__dirname(), '../partials/licenseCddl10/licenseCddl10.md'),
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                markdown: __path.resolve(__dirname(), '../partials/licenseApache20/licenseApache20.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.partials.license-apache-20
                 * @type            String
                 * @default         __path.resolve(__dirname(),'../partials/licenseApache20/licenseApache20.md')
                 *
                 * Specify the "html" template for this "license-apache-20" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                html: __path.resolve(__dirname(), '../partials/licenseApache20/licenseApache20.md'),
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                markdown: __path.resolve(__dirname(), '../partials/licenseBsd2Clause/licenseBsd2Clause.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.partials.license-bsd-2-clause
                 * @type            String
                 * @default         __path.resolve(__dirname(),'../partials/licenseBsd2Clause/licenseBsd2Clause.md')
                 *
                 * Specify the "html" template for this "license-bsd-2-clause" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                html: __path.resolve(__dirname(), '../partials/licenseBsd2Clause/licenseBsd2Clause.md'),
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                markdown: __path.resolve(__dirname(), '../partials/licenseBsd3Clause/licenseBsd3Clause.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.partials.license-bsd-3-clause
                 * @type            String
                 * @default         __path.resolve(__dirname(),'../partials/licenseBsd3Clause/licenseBsd3Clause.md')
                 *
                 * Specify the "html" template for this "license-bsd-3-clause" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                html: __path.resolve(__dirname(), '../partials/licenseBsd3Clause/licenseBsd3Clause.md'),
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                markdown: __path.resolve(__dirname(), '../partials/shields/shields.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.partials.shields
                 * @type            String
                 * @default         __path.resolve(__dirname(),'../partials/shields/shields.md')
                 *
                 * Specify the "html" template for this "shields" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                html: __path.resolve(__dirname(), '../partials/shields/shields.md'),
                /**
                 * @name            data
                 * @namespace       config.markdownBuilder.partials.shields
                 * @type            Object
                 * @default         [config.shieldsio]
                 *
                 * Specify specify the datas to use to display the correct shields
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                markdown: __path.resolve(__dirname(), '../partials/interface/interface.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.partials.interface
                 * @type            String
                 * @default         __path.resolve(__dirname(),'../partials/interface/interface.html')
                 *
                 * Specify the "html" template for the "interface" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                html: __path.resolve(__dirname(), '../partials/interface/interface.html'),
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                markdown: __path.resolve(__dirname(), '../partials/configFiles/configFiles.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.partials.configFiles
                 * @type            String
                 * @default         __path.resolve(__dirname(),'../partials/configFiles/configFiles.md')
                 *
                 * Specify the "html" template for the "configFiles" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                html: __path.resolve(__dirname(), '../partials/configFiles/configFiles.md'),
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                markdown: __path.resolve(__dirname(), '../partials/config/config.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.partials.config
                 * @type            String
                 * @default         __path.resolve(__dirname(),'../partials/config/config.md')
                 *
                 * Specify the "html" template for the "config" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                html: __path.resolve(__dirname(), '../partials/config/config.html'),
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                markdown: __path.resolve(__dirname(), '../partials/docMenu/docMenu.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.partials.docMenu
                 * @type            String
                 * @default         __path.resolve(__dirname(),'../partials/docMenu/docMenu.md')
                 *
                 * Specify the "html" template for the "docMenu" partial
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                html: __path.resolve(__dirname(), '../partials/docMenu/docMenu.md'),
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                markdown: __path.resolve(__dirname(), '../layouts/doc/docLayout.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.layouts.doc
                 * @type            String
                 * @default         __path.resolve(__dirname(),'../layouts/doc/docLayout.md')
                 *
                 * Specify the "html" template for the "doc" layout
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                html: __path.resolve(__dirname(), '../layouts/doc/docLayout.md'),
                /**
                 * @name            data
                 * @namespace       config.markdownBuilder.layouts.readme
                 * @type            String
                 * @default         [config.doc.layout]
                 *
                 * Specify the data to use for the "doc" layout
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                markdown: __path.resolve(__dirname(), '../layouts/readme/readmeLayout.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.layouts.readme
                 * @type            String
                 * @default         __path.resolve(__dirname(),'../layouts/readme/readmeLayout.md')
                 *
                 * Specify the "html" template for the "readme" layout
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                html: __path.resolve(__dirname(), '../layouts/readme/readmeLayout.md'),
                /**
                 * @name            data
                 * @namespace       config.markdownBuilder.layouts.readme
                 * @type            String
                 * @default         [config.readme.layout]
                 *
                 * Specify the data to use for the "readme" layout
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                markdown: __path.resolve(__dirname(), '../layouts/license/licenseLayout.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.layouts.license
                 * @type            String
                 * @default         __path.resolve(__dirname(),'../layouts/license/licenseLayout.md')
                 *
                 * Specify the "html" template for the "license" layout
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                html: __path.resolve(__dirname(), '../layouts/license/licenseLayout.md'),
                /**
                 * @name            markdown
                 * @namespace       config.markdownBuilder.layouts.license
                 * @type            String
                 * @default         [config.license.layout]
                 *
                 * Specify the data to use for the "license" layout
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                markdown: __path.resolve(__dirname(), '../sections/readmeHeader/readmeHeaderSection.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.sections.readme-header
                 * @type            String
                 * @default         __path.resolve(__dirname(),'../sections/readmeHeader/readmeHeaderSection.md')
                 *
                 * Specify the "html" template for the "readme-header" section
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                html: __path.resolve(__dirname(), '../sections/readmeHeader/readmeHeaderSection.md'),
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                markdown: __path.resolve(__dirname(), '../sections/docHeader/docHeaderSection.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.sections.doc-header
                 * @type            String
                 * @default         __path.resolve(__dirname(),'../sections/docHeader/docHeaderSection.md')
                 *
                 * Specify the "html" template for the "doc-header" section
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                html: __path.resolve(__dirname(), '../sections/docHeader/docHeaderSection.md'),
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                markdown: __path.resolve(__dirname(), '../sections/docMenu/docMenuSection.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.sections.doc-menu
                 * @type            String
                 * @default         __path.resolve(__dirname(),'../sections/docMenu/docMenuSection.md')
                 *
                 * Specify the "html" template for the "doc-menu" section
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                html: __path.resolve(__dirname(), '../sections/docMenu/docMenuSection.md'),
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                markdown: __path.resolve(__dirname(), '../sections/description/descriptionSection.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.sections.description
                 * @type            String
                 * @default         __path.resolve(__dirname(),'../sections/description/descriptionSection.md')
                 *
                 * Specify the "html" template for the "description" section
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                html: __path.resolve(__dirname(), '../sections/description/descriptionSection.md'),
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                markdown: __path.resolve(__dirname(), '../sections/install/installSection.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.sections.install
                 * @type            String
                 * @default         __path.resolve(__dirname(),'../sections/install/installSection.md')
                 *
                 * Specify the "html" template for the "install" section
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                html: __path.resolve(__dirname(), '../sections/install/installSection.md'),
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                markdown: __path.resolve(__dirname(), '../sections/license/licenseSection.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.sections.license
                 * @type            String
                 * @default         __path.resolve(__dirname(),'../sections/license/licenseSection.md')
                 *
                 * Specify the "html" template for the "license" section
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                html: __path.resolve(__dirname(), '../sections/license/licenseSection.md'),
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                markdown: __path.resolve(__dirname(), '../sections/contact/contactSection.md'),
                /**
                 * @name            html
                 * @namespace       config.markdownBuilder.sections.contact
                 * @type            String
                 * @default         __path.resolve(__dirname(),'../sections/contact/contactSection.md')
                 *
                 * Specify the "html" template for the "contact" section
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                html: __path.resolve(__dirname(), '../sections/contact/contactSection.md'),
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd25CdWlsZGVyLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcmtkb3duQnVpbGRlci5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFDNUQsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBRTFCLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRyxFQUFFLE1BQU07SUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXBDLE9BQU87UUFDSCxPQUFPLEVBQUU7WUFDTDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLDJCQUEyQjtZQUNqQzs7Ozs7Ozs7OztlQVVHO1lBQ0gsS0FBSyxFQUFFLDhCQUE4QjtZQUNyQzs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUFFLElBQUk7WUFDWjs7Ozs7Ozs7OztlQVVHO1lBQ0gsS0FBSyxFQUFFLElBQUk7WUFDWDs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUFFLCtCQUErQjtZQUN2Qzs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLElBQUk7WUFDYjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLElBQUk7WUFDVjs7Ozs7Ozs7Ozs7ZUFXRztZQUNILE1BQU0sRUFBRSxVQUFVO1lBQ2xCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxhQUFhLEVBQUUsQ0FBQyxVQUFVLEVBQUMsTUFBTSxDQUFDO1NBQ3JDO1FBQ0QsT0FBTyxFQUFFLEVBQUU7UUFDWCxZQUFZLEVBQUU7WUFDVixJQUFJLEVBQUU7Z0JBQ0Y7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsS0FBSyxFQUFFLHNDQUFzQztnQkFDN0M7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsUUFBUSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQ3BCLFNBQVMsRUFBRSxFQUNYLDhCQUE4QixDQUNqQztnQkFDRDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxJ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