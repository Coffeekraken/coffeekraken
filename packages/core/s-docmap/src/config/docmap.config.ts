import { __commonTextFileExtensions } from '@coffeekraken/sugar/extension';
import { __packageRootDir } from '@coffeekraken/sugar/path';

export default function (api) {
    if (api.env.platform !== 'node') return;

    return {
        /**
         * @name        noExtends
         * @namespace   config.docmap
         * @type        Boolean
         * @default     false
         *
         * Specify if you want to disable the extends search process that will result in the "extends" array in the docmap.json file
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        noExtends: false,

        /**
         * @name        excludePackages
         * @namespace   config.docmap
         * @type        Boolean
         * @default     ['@website/*', '@example/*']
         *
         * Specify some package(s) name(s) (glob) to avoid extending.
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        excludePackages: ['@website/*', '@example/*', '@tests/*'],

        read: {
            /**
             * @name          input
             * @namespace     config.docmap.read
             * @type          String
             * @default         ${__packageRootDir()}/docmap.json
             *
             * Specify the path of the docmap.json source file to read
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            input: `${__packageRootDir()}/docmap.json`,

            /**
             * @name          sort
             * @namespace     config.docmap.read
             * @type          Array<String>
             * @default
             *
             * Specify which of the docmap entries has to be sorted alphabetically.
             * These array values has to be a dotPath like 'menu.documentation'
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            sort: ['menu.packages'],

            /**
             * @name          sortDeep
             * @namespace     config.docmap.read
             * @type          Array<String>
             * @default
             *
             * Specify which of the docmap entries has to be sorted alphabetically and deeply.
             * These array values has to be a dotPath like 'menu.documentation'
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            sortDeep: ['menu.custom.styleguide', 'menu.custom.specs'],
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
            get outDir() {
                return `${api.config.storage.package.rootDir}/.docmap`;
            },
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
            get glob() {
                return `${api.config.storage.package.rootDir}/.docmap/*`;
            },
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
                `src/!(css)/*{0,4}/*.+(${__commonTextFileExtensions({}).join(
                    '|',
                )})`,
                `dist/+(css)/*`,
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

            excludeByTags: {
                /**
                 * @name        namespace
                 * @namespace   config.docmap.build.excludeByTags
                 * @type        Regex[]
                 * @default      [/\.config\.)/]
                 *
                 * Specify some regex to apply on the namespace.
                 * All namespaces that does not match one of the specified regex will be excluded
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                // namespace: [/\.config\./],

                /**
                 * @name        type
                 * @namespace   config.docmap.build.excludeByTags
                 * @type        Regex
                 * @default       /^CssClass$/
                 *
                 * Specify some regex to apply on the type.
                 * All types that does not match one of the specified regex will be excluded
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                type: [/^CssClass$/],
            },

            /**
             * @name        tags
             * @namespace     config.docmap.build
             * @type        Array<String>
             * @default     ['id','name','type','menu','default','platform','description','namespace','status','example','interface','styleguide','static','since','author']
             *
             * Specify which docblock tags you want to integrate to your docmap.json items
             *
             * @since     2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            tags: [
                'id',
                'name',
                'as',
                'type',
                'param',
                'setting',
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
            get outPath() {
                return `${api.config.storage.package.rootDir}/docmap.json`;
            },
        },
    };
}
