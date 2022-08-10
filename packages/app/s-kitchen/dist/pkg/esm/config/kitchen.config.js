export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        defaultRecipe: 'generic',
        exclude: [],
        recipes: {
            /**
             * @name            generic
             * @namespace       config.kitchen.recipes
             * @type            String
             * @default         [config.kitchenRecipeGeneric]
             *
             * Specify the default recipe
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get generic() {
                return api.config.kitchenRecipeGeneric;
            },
            /**
             * @name            nextJs
             * @namespace       config.kitchen.recipes
             * @type            String
             * @default         [config.kitchenRecipeNextJs]
             *
             * Specify the next.js recipe
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get nextJs() {
                return api.config.kitchenRecipeNextJs;
            },
        },
        actions: {
            copy: {
                /**
                 * @name            title
                 * @namespace       config.kitchen.actions.copy
                 * @type            String
                 * @default        Frontend server
                 *
                 * Specify the frontend server action title
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: 'Copy file/directory',
                /**
                 * @name            description
                 * @namespace       config.kitchen.actions.copy
                 * @type            String
                 * @default        ...
                 *
                 * Specify the frontend server action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Copy a file or a directory from the source to the destination passed in params',
                /**
                 * @name            command
                 * @namespace       config.kitchen.actions.copy
                 * @type            String
                 * @default        sugar
                 *
                 * Specify the frontend server action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: `sugar fs.copy [arguments]`,
                params: {},
                settings: {},
            },
            rename: {
                /**
                 * @name            title
                 * @namespace       config.kitchen.actions.rename
                 * @type            String
                 * @default        Frontend server
                 *
                 * Rename a project (folder, package.json, etc...)
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: 'Rename project',
                /**
                 * @name            description
                 * @namespace       config.kitchen.actions.rename
                 * @type            String
                 * @default        ...
                 *
                 * Specify the kitchen rename action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Rename a project (folder, package.json, etc...)',
                /**
                 * @name            command
                 * @namespace       config.kitchen.actions.rename
                 * @type            String
                 * @default        sugar
                 *
                 * Specify the kitchen rename action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: `sugar package.rename [arguments]`,
                params: {},
                settings: {},
            },
            initNpm: {
                /**
                 * @name            title
                 * @namespace       config.kitchen.actions.initNpm
                 * @type            String
                 * @default        Init npm package
                 *
                 * Init the npm package
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: 'Init npm package',
                /**
                 * @name            description
                 * @namespace       config.kitchen.actions.initNpm
                 * @type            String
                 * @default        ...
                 *
                 * Specify the kitchen initNpm action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Init npm package in the project',
                /**
                 * @name            command
                 * @namespace       config.kitchen.actions.initNpm
                 * @type            String
                 * @default        sugar
                 *
                 * Specify the kitchen initNpm action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: `npm init es6 -y`,
                params: {},
                settings: {},
            },
            addSugarJson: {
                /**
                 * @name            title
                 * @namespace       config.kitchen.actions.addSugarJson
                 * @type            String
                 * @default        Adding sugar.json file
                 *
                 * Add the sugar.json file
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: 'Adding sugar.json file',
                /**
                 * @name            description
                 * @namespace       config.kitchen.actions.addSugarJson
                 * @type            String
                 * @default        ...
                 *
                 * Specify the kitchen addSugarJson action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Adding the sugar.json file to the project',
                /**
                 * @name            command
                 * @namespace       config.kitchen.actions.addSugarJson
                 * @type            String
                 * @default        sugar
                 *
                 * Specify the kitchen addSugarJson action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: `sugar kitchen.add sugarJson [arguments]`,
                params: {},
                settings: {},
            },
            addSugar: {
                /**
                 * @name            title
                 * @namespace       config.kitchen.actions.addSugar
                 * @type            String
                 * @default        Adding sugar.json file
                 *
                 * Add the sugar.json file
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: 'Adding sugar',
                /**
                 * @name            description
                 * @namespace       config.kitchen.actions.addSugar
                 * @type            String
                 * @default        ...
                 *
                 * Specify the kitchen addSugar action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Adding the sugar toolkit and the s-sugar feature in your project',
                /**
                 * @name            command
                 * @namespace       config.kitchen.actions.addSugar
                 * @type            String
                 * @default        sugar
                 *
                 * Specify the kitchen addSugar action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: `sugar kitchen.add sugar [arguments]`,
                params: {},
                settings: {},
            },
            addNvmrc: {
                /**
                 * @name            title
                 * @namespace       config.kitchen.actions.addNvmrc
                 * @type            String
                 * @default        Adding sugar.json file
                 *
                 * Add the .nvmrc file
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: 'Adding .nvmrc file',
                /**
                 * @name            description
                 * @namespace       config.kitchen.actions.addNvmrc
                 * @type            String
                 * @default        ...
                 *
                 * Specify the kitchen addNvmrc action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Adding the .nvmrc file to the project',
                /**
                 * @name            command
                 * @namespace       config.kitchen.actions.addNvmrc
                 * @type            String
                 * @default        sugar
                 *
                 * Specify the kitchen addNvmrc action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: `sugar kitchen.add nvmrc [arguments]`,
                params: {},
                settings: {},
            },
            addFrontspecJson: {
                /**
                 * @name            title
                 * @namespace       config.kitchen.actions.addFrontspecJson
                 * @type            String
                 * @default        Adding sugar.json file
                 *
                 * Add the sugar.json file
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: 'Adding frontspec.json file',
                /**
                 * @name            description
                 * @namespace       config.kitchen.actions.addFrontspecJson
                 * @type            String
                 * @default        ...
                 *
                 * Specify the kitchen addFrontspecJson action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Adding the frontspec.json file to the project',
                /**
                 * @name            command
                 * @namespace       config.kitchen.actions.addFrontspecJson
                 * @type            String
                 * @default        sugar
                 *
                 * Specify the kitchen addFrontspecJson action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: `sugar kitchen.add frontspec [arguments]`,
                params: {},
                settings: {},
            },
            addManifestJson: {
                /**
                 * @name            title
                 * @namespace       config.kitchen.actions.addManifestJson
                 * @type            String
                 * @default        Adding manifest.json file
                 *
                 * Add the manifest.json file
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: 'Adding manifest.json file',
                /**
                 * @name            description
                 * @namespace       config.kitchen.actions.addManifestJson
                 * @type            String
                 * @default        ...
                 *
                 * Specify the kitchen addManifestJson action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Adding the manifest.json file to the project',
                /**
                 * @name            command
                 * @namespace       config.kitchen.actions.addManifestJson
                 * @type            String
                 * @default        sugar
                 *
                 * Specify the kitchen addManifestJson action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: `sugar kitchen.add manifest [arguments]`,
                params: {},
                settings: {},
            },
            addFavicon: {
                /**
                 * @name            title
                 * @namespace       config.kitchen.actions.addFavicon
                 * @type            String
                 * @default        Adding manifest.json file
                 *
                 * Add the manifest.json file
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: 'Adding source favicon file',
                /**
                 * @name            description
                 * @namespace       config.kitchen.actions.addFavicon
                 * @type            String
                 * @default        ...
                 *
                 * Specify the kitchen addFavicon action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Adding the favicon source file to the project',
                /**
                 * @name            command
                 * @namespace       config.kitchen.actions.addFavicon
                 * @type            String
                 * @default        sugar
                 *
                 * Specify the kitchen addFavicon action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: `sugar kitchen.add favicon [arguments]`,
                params: {},
                settings: {},
            },
            addReadme: {
                /**
                 * @name            title
                 * @namespace       config.kitchen.actions.addReadme
                 * @type            String
                 * @default        Adding manifest.json file
                 *
                 * Add the README.md file into the src/doc folder.
                 * This is a base file that can be builded using the `sugar markdown.build` command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: 'Adding source README.md file',
                /**
                 * @name            description
                 * @namespace       config.kitchen.actions.addReadme
                 * @type            String
                 * @default        ...
                 *
                 * Specify the kitchen addReadme action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Adding the README.md source file to the project',
                /**
                 * @name            command
                 * @namespace       config.kitchen.actions.addReadme
                 * @type            String
                 * @default        sugar
                 *
                 * Specify the kitchen addReadme action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: `sugar kitchen.add readme [arguments]`,
                params: {},
                settings: {},
            },
            addDefaultPages: {
                /**
                 * @name            title
                 * @namespace       config.kitchen.actions.addDefaultPages
                 * @type            String
                 * @default        Adding manifest.json file
                 *
                 * Add the manifest.json file
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: 'Adding default pages/views file',
                /**
                 * @name            description
                 * @namespace       config.kitchen.actions.addDefaultPages
                 * @type            String
                 * @default        ...
                 *
                 * Specify the kitchen addDefaultPages action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Adding some default pages/views to the project',
                /**
                 * @name            command
                 * @namespace       config.kitchen.actions.addDefaultPages
                 * @type            String
                 * @default        sugar
                 *
                 * Specify the kitchen addDefaultPages action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: `sugar kitchen.add defaultPages [arguments]`,
                params: {},
                settings: {},
            },
            addDefaultScripts: {
                /**
                 * @name            title
                 * @namespace       config.kitchen.actions.addDefaultScripts
                 * @type            String
                 * @default        Adding manifest.json file
                 *
                 * Add the script files
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: 'Adding default script files',
                /**
                 * @name            description
                 * @namespace       config.kitchen.actions.addDefaultScripts
                 * @type            String
                 * @default        ...
                 *
                 * Specify the kitchen addDefaultScripts action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Adding some default scripts to the project',
                /**
                 * @name            command
                 * @namespace       config.kitchen.actions.addDefaultScripts
                 * @type            String
                 * @default        sugar
                 *
                 * Specify the kitchen addDefaultScripts action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: `sugar kitchen.add defaultScripts [arguments]`,
                params: {},
                settings: {},
            },
            addDefaultPackageJson: {
                /**
                 * @name            title
                 * @namespace       config.kitchen.actions.addDefaultPackageJson
                 * @type            String
                 * @default        Adding manifest.json file
                 *
                 * Add/merge default package.json defined in config.package.defaultPackageJson
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: 'Adding default package.json file',
                /**
                 * @name            description
                 * @namespace       config.kitchen.actions.addDefaultPackageJson
                 * @type            String
                 * @default        ...
                 *
                 * Specify the kitchen addDefaultPackageJson action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Adding default package.json to the project',
                /**
                 * @name            command
                 * @namespace       config.kitchen.actions.addDefaultPackageJson
                 * @type            String
                 * @default        sugar
                 *
                 * Specify the kitchen addDefaultPackageJson action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: `sugar kitchen.add defaultPackageJson [arguments]`,
                params: {},
                settings: {},
            },
            addSugarPostcss: {
                /**
                 * @name            title
                 * @namespace       config.kitchen.actions.addSugarPostcss
                 * @type            String
                 * @default        Adding manifest.json file
                 *
                 * Add the manifest.json file
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: 'Adding sugar postcss plugin',
                /**
                 * @name            description
                 * @namespace       config.kitchen.actions.addSugarPostcss
                 * @type            String
                 * @default        ...
                 *
                 * Specify the kitchen addSugarPostcss action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Adding the sugar postcss plugin to the project',
                /**
                 * @name            command
                 * @namespace       config.kitchen.actions.addSugarPostcss
                 * @type            String
                 * @default        sugar
                 *
                 * Specify the kitchen addSugarPostcss action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: `sugar kitchen.add postcss [arguments]`,
                params: {},
                settings: {},
            },
            installDependencies: {
                /**
                 * @name            title
                 * @namespace       config.kitchen.actions.installDependencies
                 * @type            String
                 * @default        Install dependencies
                 *
                 * Install dependencies like node_modules and composer if exists
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: 'Install dependencies',
                /**
                 * @name            description
                 * @namespace       config.kitchen.actions.installDependencies
                 * @type            String
                 * @default        ...
                 *
                 * Specify the kitchen addManifestJson action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Install dependencies like node_modules and composer if exists',
                /**
                 * @name            command
                 * @namespace       config.kitchen.actions.installDependencies
                 * @type            String
                 * @default        sugar
                 *
                 * Specify the kitchen addManifestJson action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: `sugar package.install [arguments]`,
                /**
                 * @name            interface
                 * @namespace       config.kitchen.actions.installDependencies
                 * @type            String
                 * @default        @coffeekraken/s-package/node/interface/SPackageInstallParamsInterface
                 *
                 * Specify the installDependencies install action interface
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                interface: '@coffeekraken/s-package/node/interface/SPackageInstallParamsInterface',
                params: {},
                settings: {
                    silent: true,
                },
            },
            frontendServer: {
                /**
                 * @name            title
                 * @namespace       config.kitchen.actions.frontendServer
                 * @type            String
                 * @default        Frontend server
                 *
                 * Specify the frontend server action title
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: 'Frontend server',
                /**
                 * @name            description
                 * @namespace       config.kitchen.actions.frontendServer
                 * @type            String
                 * @default        ...
                 *
                 * Specify the frontend server action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Frontend server using the @coffeekraken/s-frontend-server package',
                /**
                 * @name            command
                 * @namespace       config.kitchen.actions.frontendServer
                 * @type            String
                 * @default        sugar frontendServer.start [arguments]
                 *
                 * Specify the frontend server action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: 'sugar frontendServer.start [arguments]',
                /**
                 * @name            interface
                 * @namespace       config.kitchen.actions.frontendServer
                 * @type            String
                 * @default        @coffeekraken/s-frontend-server/node/interface/SFrontendServerStartParamsInterface
                 *
                 * Specify the frontendServerer start action interface
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                interface: '@coffeekraken/s-frontend-server/node/interface/SFrontendServerStartParamsInterface',
                params: {},
                settings: {
                    processManager: {
                        /**
                         * @name            restart
                         * @namespace       config.kitchen.actions.frontendServer.settings.processManager
                         * @type            String
                         * @default        true
                         *
                         * Specify the frontend server action restart behavior
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        restart: true,
                    },
                },
            },
            corsProxy: {
                /**
                 * @name            title
                 * @namespace       config.kitchen.actions.corsProxy
                 * @type            String
                 * @default        Frontend server
                 *
                 * Specify the cors proxy server action title
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: 'Cors Proxy',
                /**
                 * @name            description
                 * @namespace       config.kitchen.actions.corsProxy
                 * @type            String
                 * @default        ...
                 *
                 * Specify the cors proxy server action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Frontend cors proxy server using the @coffeekraken/s-frontend-server package',
                /**
                 * @name            command
                 * @namespace       config.kitchen.actions.corsProxy
                 * @type            String
                 * @default        sugar corsProxy.start [arguments]
                 *
                 * Specify the frontend server action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: 'sugar frontendServer.corsProxy [arguments]',
                /**
                 * @name            interface
                 * @namespace       config.kitchen.actions.corsProxy
                 * @type            String
                 * @default        @coffeekraken/s-frontend-server/node/interface/SFrontendServerCorsProxyParamsInterface
                 *
                 * Specify the corsProxy install action interface
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                interface: '@coffeekraken/s-frontend-server/node/interface/SFrontendServerCorsProxyParamsInterface',
                params: {},
                settings: {
                    processManager: {
                        /**
                         * @name            restart
                         * @namespace       config.kitchen.actions.corsProxy.settings.processManager
                         * @type            String
                         * @default        true
                         *
                         * Specify the frontend server action restart behavior
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        restart: true,
                    },
                },
            },
            postcssBuild: {
                /**
                 * @name            title
                 * @namespace       config.kitchen.actions.postcssBuild
                 * @type            String
                 * @default        Frontend server
                 *
                 * Specify the postcss build action title
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: 'PostCSS build action',
                /**
                 * @name            description
                 * @namespace       config.kitchen.actions.postcssBuild
                 * @type            String
                 * @default        ...
                 *
                 * Specify the postcss build action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Build css using the amazing PostCSS package',
                /**
                 * @name            command
                 * @namespace       config.kitchen.actions.postcssBuild
                 * @type            String
                 * @default        sugar postcss.build [arguments]
                 *
                 * Specify the postcss build action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: 'sugar postcss.build --prod [arguments]',
                /**
                 * @name            interface
                 * @namespace       config.kitchen.actions.postcssBuild
                 * @type            String
                 * @default        @coffeekraken/s-postcss-builder/node/interface/SPostcssBuilderBuildParamsInterface
                 *
                 * Specify the postcssBuild build action interface
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                interface: '@coffeekraken/s-postcss-builder/node/interface/SPostcssBuilderBuildParamsInterface',
                params: {},
                settings: {
                    processManager: {},
                },
            },
            typescriptBuild: {
                /**
                 * @name            title
                 * @namespace       config.kitchen.actions.typescriptBuild
                 * @type            String
                 * @default        Frontend server
                 *
                 * Specify the typescriptBuilder build action title
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: 'Typescript builder build action',
                /**
                 * @name            description
                 * @namespace       config.kitchen.actions.typescriptBuild
                 * @type            String
                 * @default        ...
                 *
                 * Specify the typescriptBuilder build action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Build typescript using the s-typescript-builder package',
                /**
                 * @name            command
                 * @namespace       config.kitchen.actions.typescriptBuild
                 * @type            String
                 * @default        sugar typescriptBuilder.build [arguments]
                 *
                 * Specify the typescriptBuilder build action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: 'sugar typescript.build [arguments]',
                /**
                 * @name            interface
                 * @namespace       config.kitchen.actions.typescriptBuild
                 * @type            String
                 * @default        @coffeekraken/s-typescript-builder/node/interface/STypescriptBuilderBuildParamsInterface
                 *
                 * Specify the typescriptBuilder build action interface
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                interface: '@coffeekraken/s-typescript-builder/node/interface/STypescriptBuilderBuildParamsInterface',
                params: {
                    watch: true,
                },
                settings: {
                    processManager: {},
                },
            },
            imagesBuild: {
                /**
                 * @name            title
                 * @namespace       config.kitchen.actions.imagesBuild
                 * @type            String
                 * @default        Frontend server
                 *
                 * Specify the images build action title
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: 'Images build action',
                /**
                 * @name            description
                 * @namespace       config.kitchen.actions.imagesBuild
                 * @type            String
                 * @default        ...
                 *
                 * Specify the images build action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Build your images with ease. Compress, resize, webp version, etc...',
                /**
                 * @name            command
                 * @namespace       config.kitchen.actions.imagesBuild
                 * @type            String
                 * @default        sugar images.build [arguments]
                 *
                 * Specify the images build action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: 'sugar images.build [arguments]',
                /**
                 * @name            interface
                 * @namespace       config.kitchen.actions.imagesBuild
                 * @type            String
                 * @default        @coffeekraken/s-images-builder/node/interface/SImagesBuilderBuildParamsInterface
                 *
                 * Specify the imagesBuild build action interface
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                interface: '@coffeekraken/s-images-builder/node/interface/SImagesBuilderBuildParamsInterface',
                params: {},
                settings: {
                    processManager: {},
                },
            },
            vite: {
                /**
                 * @name            title
                 * @namespace       config.kitchen.actions.vite
                 * @type            String
                 * @default        Vite development stack
                 *
                 * Specify the vite action title
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: 'Vite development stack',
                /**
                 * @name            description
                 * @namespace       config.kitchen.actions.vite
                 * @type            String
                 * @default        ...
                 *
                 * Specify the vite action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Allow to build files easily while developing',
                /**
                 * @name            command
                 * @namespace       config.kitchen.actions.vite
                 * @type            String
                 * @default        sugar vite [arguments]
                 *
                 * Specify the vite action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: 'sugar vite [arguments]',
                /**
                 * @name            interface
                 * @namespace       config.kitchen.actions.vite
                 * @type            String
                 * @default        @coffeekraken/s-vite/node/interface/SViteStartParamsInterface
                 *
                 * Specify the vite start action interface
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                interface: '@coffeekraken/s-vite/node/interface/SViteStartParamsInterface',
                params: {},
                settings: {
                    processManager: {},
                },
            },
            viteBuild: {
                /**
                 * @name            title
                 * @namespace       config.kitchen.actions.viteBuild
                 * @type            String
                 * @default        Vite build stasck
                 *
                 * Specify the vite build action title
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: 'Vite build stack',
                /**
                 * @name            description
                 * @namespace       config.kitchen.actions.viteBuild
                 * @type            String
                 * @default        ...
                 *
                 * Specify the vite build action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Allow to compile javascript (js, ts, riot, react, etc...) files easily',
                /**
                 * @name            command
                 * @namespace       config.kitchen.actions.viteBuild
                 * @type            String
                 * @default        sugar vite.build [arguments]
                 *
                 * Specify the vite build action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: 'sugar vite.build --prod [arguments]',
                /**
                 * @name            interface
                 * @namespace       config.kitchen.actions.viteBuild
                 * @type            String
                 * @default        @coffeekraken/s-vite/node/interface/SViteBuildParamsInterface
                 *
                 * Specify the vite build action interface
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                interface: '@coffeekraken/s-vite/node/interface/SViteBuildParamsInterface',
                params: {},
                settings: {
                    processManager: {},
                },
            },
            docmapBuild: {
                /**
                 * @name            title
                 * @namespace       config.kitchen.actions.docmapBuild
                 * @type            String
                 * @default        ...
                 *
                 * Specify the doc build action title
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: 'Docmap build action',
                /**
                 * @name            description
                 * @namespace       config.kitchen.actions.docmapBuild
                 * @type            String
                 * @default        ...
                 *
                 * Specify the doc build action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Allow to build and maintain up to date the docmap.json file',
                /**
                 * @name            command
                 * @namespace       config.kitchen.actions.docmapBuild
                 * @type            String
                 * @default        sugar docmap.build [arguments]
                 *
                 * Specify the doc build action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: 'sugar docmap.build [arguments]',
                /**
                 * @name            interface
                 * @namespace       config.kitchen.actions.docmapBuild
                 * @type            String
                 * @default        @coffeekraken/s-docmap/node/interface/SDocmapBuildParamsInterface
                 *
                 * Specify the docmap build action interface
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                interface: '@coffeekraken/s-docmap/node/interface/SDocmapBuildParamsInterface',
                params: {},
                settings: {
                    processManager: {},
                },
            },
            sitemapBuild: {
                /**
                 * @name            title
                 * @namespace       config.kitchen.actions.sitemapBuild
                 * @type            String
                 * @default        ...
                 *
                 * Specify the doc build action title
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: 'Sitemap build action',
                /**
                 * @name            description
                 * @namespace       config.kitchen.actions.sitemapBuild
                 * @type            String
                 * @default        ...
                 *
                 * Specify the doc build action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Allow to build and maintain up to date the sitemap.xml file',
                /**
                 * @name            command
                 * @namespace       config.kitchen.actions.sitemapBuild
                 * @type            String
                 * @default        sugar sitemap.build [arguments]
                 *
                 * Specify the doc build action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: 'sugar sitemap.build [arguments]',
                /**
                 * @name            interface
                 * @namespace       config.kitchen.actions.sitemapBuild
                 * @type            String
                 * @default        @coffeekraken/s-sitemap-builder/node/interface/SSitemapBuilderBuildParamsInterface
                 *
                 * Specify the sitemap build action interface
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                interface: '@coffeekraken/s-sitemap-builder/node/interface/SSitemapBuilderBuildParamsInterface',
                params: {},
                settings: {
                    processManager: {},
                },
            },
            faviconBuild: {
                /**
                 * @name            title
                 * @namespace       config.kitchen.actions.faviconBuild
                 * @type            String
                 * @default        ...
                 *
                 * Specify the doc build action title
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: 'Docmap build action',
                /**
                 * @name            description
                 * @namespace       config.kitchen.actions.faviconBuild
                 * @type            String
                 * @default        ...
                 *
                 * Specify the favicon build action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Allow to build and maintain up to date your favicon files and the manifest.json',
                /**
                 * @name            command
                 * @namespace       config.kitchen.actions.faviconBuild
                 * @type            String
                 * @default        sugar favicon.build [arguments]
                 *
                 * Specify the doc build action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: 'sugar favicon.build [arguments]',
                /**
                 * @name            interface
                 * @namespace       config.kitchen.actions.faviconBuild
                 * @type            String
                 * @default        @coffeekraken/s-favicon-builder/node/interface/SFaviconBuilderBuildParamsInterface
                 *
                 * Specify the favicon build action interface
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                interface: '@coffeekraken/s-favicon-builder/node/interface/SFaviconBuilderBuildParamsInterface',
                params: {},
                settings: {
                    processManager: {},
                },
            },
            markdownBuild: {
                /**
                 * @name            title
                 * @namespace       config.kitchen.actions.markdownBuild
                 * @type            String
                 * @default        ...
                 *
                 * Specify the markdown build action title
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: 'Docmap build action',
                /**
                 * @name            description
                 * @namespace       config.kitchen.actions.markdownBuild
                 * @type            String
                 * @default        ...
                 *
                 * Specify the markdown build action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Allow to build your markdown files',
                /**
                 * @name            command
                 * @namespace       config.kitchen.actions.markdownBuild
                 * @type            String
                 * @default        sugar favicon.build [arguments]
                 *
                 * Specify the doc build action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: 'sugar markdown.build -p default,readme [arguments]',
                /**
                 * @name            interface
                 * @namespace       config.kitchen.actions.markdownBuild
                 * @type            String
                 * @default        @coffeekraken/s-favicon-builder/node/interface/SFaviconBuilderBuildParamsInterface
                 *
                 * Specify the favicon build action interface
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                interface: '@coffeekraken/s-markdown-builder/node/interface/SMarkdownBuilderBuildParamsInterface',
                params: {},
                settings: {
                    processManager: {},
                },
            },
            format: {
                /**
                 * @name            title
                 * @namespace       config.kitchen.actions.format
                 * @type            String
                 * @default        SCodeFormatter format action
                 *
                 * Specify the format action title
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: 'SCodeFormatter format action',
                /**
                 * @name            description
                 * @namespace       config.kitchen.actions.format
                 * @type            String
                 * @default        ...
                 *
                 * Specify the format build action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Format your code using the s-code-formatter package',
                /**
                 * @name            command
                 * @namespace       config.kitchen.actions.format
                 * @type            String
                 * @default        sugar formatter.format [arguments]
                 *
                 * Specify the format action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: 'sugar formatter.format [arguments]',
                /**
                 * @name            interface
                 * @namespace       config.kitchen.actions.format
                 * @type            String
                 * @default        @coffeekraken/s-typescript-builder/node/interface/STypescriptBuilderBuildParamsInterface
                 *
                 * Specify the format build action interface
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                interface: '@coffeekraken/s-code-formatter/node/interface/SCodeFormatterFormatParamsInterface',
                params: {
                    watch: true,
                },
                settings: {
                    processManager: {},
                },
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBQ3hDLE9BQU87UUFDSCxhQUFhLEVBQUUsU0FBUztRQUV4QixPQUFPLEVBQUUsRUFBRTtRQUVYLE9BQU8sRUFBRTtZQUNMOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLE9BQU87Z0JBQ1AsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDO1lBQzNDLENBQUM7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxNQUFNO2dCQUNOLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztZQUMxQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLEVBQUU7WUFDTCxJQUFJLEVBQUU7Z0JBQ0Y7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsS0FBSyxFQUFFLHFCQUFxQjtnQkFDNUI7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsV0FBVyxFQUNQLGdGQUFnRjtnQkFDcEY7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsT0FBTyxFQUFFLDJCQUEyQjtnQkFDcEMsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsUUFBUSxFQUFFLEVBQUU7YUFDZjtZQUNELE1BQU0sRUFBRTtnQkFDSjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUsZ0JBQWdCO2dCQUN2Qjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxXQUFXLEVBQUUsaURBQWlEO2dCQUM5RDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxPQUFPLEVBQUUsa0NBQWtDO2dCQUMzQyxNQUFNLEVBQUUsRUFBRTtnQkFDVixRQUFRLEVBQUUsRUFBRTthQUNmO1lBQ0QsT0FBTyxFQUFFO2dCQUNMOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEtBQUssRUFBRSxrQkFBa0I7Z0JB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