"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
    return {
        copy: {
            /**
             * @name            title
             * @namespace       config.kitchenActions.copy
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
             * @namespace       config.kitchenActions.copy
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
             * @namespace       config.kitchenActions.copy
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
             * @namespace       config.kitchenActions.rename
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
             * @namespace       config.kitchenActions.rename
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
             * @namespace       config.kitchenActions.rename
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
             * @namespace       config.kitchenActions.initNpm
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
             * @namespace       config.kitchenActions.initNpm
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
             * @namespace       config.kitchenActions.initNpm
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
             * @namespace       config.kitchenActions.addSugarJson
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
             * @namespace       config.kitchenActions.addSugarJson
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
             * @namespace       config.kitchenActions.addSugarJson
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
             * @namespace       config.kitchenActions.addSugar
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
             * @namespace       config.kitchenActions.addSugar
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
             * @namespace       config.kitchenActions.addSugar
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
             * @namespace       config.kitchenActions.addNvmrc
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
             * @namespace       config.kitchenActions.addNvmrc
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
             * @namespace       config.kitchenActions.addNvmrc
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
             * @namespace       config.kitchenActions.addFrontspecJson
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
             * @namespace       config.kitchenActions.addFrontspecJson
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
             * @namespace       config.kitchenActions.addFrontspecJson
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
             * @namespace       config.kitchenActions.addManifestJson
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
             * @namespace       config.kitchenActions.addManifestJson
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
             * @namespace       config.kitchenActions.addManifestJson
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
             * @namespace       config.kitchenActions.addFavicon
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
             * @namespace       config.kitchenActions.addFavicon
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
             * @namespace       config.kitchenActions.addFavicon
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
             * @namespace       config.kitchenActions.addReadme
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
             * @namespace       config.kitchenActions.addReadme
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
             * @namespace       config.kitchenActions.addReadme
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
             * @namespace       config.kitchenActions.addDefaultPages
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
             * @namespace       config.kitchenActions.addDefaultPages
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
             * @namespace       config.kitchenActions.addDefaultPages
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
             * @namespace       config.kitchenActions.addDefaultScripts
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
             * @namespace       config.kitchenActions.addDefaultScripts
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
             * @namespace       config.kitchenActions.addDefaultScripts
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
             * @namespace       config.kitchenActions.addDefaultPackageJson
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
             * @namespace       config.kitchenActions.addDefaultPackageJson
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
             * @namespace       config.kitchenActions.addDefaultPackageJson
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
             * @namespace       config.kitchenActions.addSugarPostcss
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
             * @namespace       config.kitchenActions.addSugarPostcss
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
             * @namespace       config.kitchenActions.addSugarPostcss
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
             * @namespace       config.kitchenActions.installDependencies
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
             * @namespace       config.kitchenActions.installDependencies
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
             * @namespace       config.kitchenActions.installDependencies
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
             * @namespace       config.kitchenActions.installDependencies
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
             * @namespace       config.kitchenActions.frontendServer
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
             * @namespace       config.kitchenActions.frontendServer
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
             * @namespace       config.kitchenActions.frontendServer
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
             * @namespace       config.kitchenActions.frontendServer
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
                     * @namespace       config.kitchenActions.frontendServer.settings.processManager
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
             * @namespace       config.kitchenActions.corsProxy
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
             * @namespace       config.kitchenActions.corsProxy
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
             * @namespace       config.kitchenActions.corsProxy
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
             * @namespace       config.kitchenActions.corsProxy
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
                     * @namespace       config.kitchenActions.corsProxy.settings.processManager
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
             * @namespace       config.kitchenActions.postcssBuild
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
             * @namespace       config.kitchenActions.postcssBuild
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
             * @namespace       config.kitchenActions.postcssBuild
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
             * @namespace       config.kitchenActions.postcssBuild
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
             * @namespace       config.kitchenActions.typescriptBuild
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
             * @namespace       config.kitchenActions.typescriptBuild
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
             * @namespace       config.kitchenActions.typescriptBuild
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
             * @namespace       config.kitchenActions.typescriptBuild
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
             * @namespace       config.kitchenActions.imagesBuild
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
             * @namespace       config.kitchenActions.imagesBuild
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
             * @namespace       config.kitchenActions.imagesBuild
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
             * @namespace       config.kitchenActions.imagesBuild
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
             * @namespace       config.kitchenActions.vite
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
             * @namespace       config.kitchenActions.vite
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
             * @namespace       config.kitchenActions.vite
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
             * @namespace       config.kitchenActions.vite
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
             * @namespace       config.kitchenActions.viteBuild
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
             * @namespace       config.kitchenActions.viteBuild
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
             * @namespace       config.kitchenActions.viteBuild
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
             * @namespace       config.kitchenActions.viteBuild
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
             * @namespace       config.kitchenActions.docmapBuild
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
             * @namespace       config.kitchenActions.docmapBuild
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
             * @namespace       config.kitchenActions.docmapBuild
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
             * @namespace       config.kitchenActions.docmapBuild
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
             * @namespace       config.kitchenActions.sitemapBuild
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
             * @namespace       config.kitchenActions.sitemapBuild
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
             * @namespace       config.kitchenActions.sitemapBuild
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
             * @namespace       config.kitchenActions.sitemapBuild
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
             * @namespace       config.kitchenActions.faviconBuild
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
             * @namespace       config.kitchenActions.faviconBuild
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
             * @namespace       config.kitchenActions.faviconBuild
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
             * @namespace       config.kitchenActions.faviconBuild
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
             * @namespace       config.kitchenActions.markdownBuild
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
             * @namespace       config.kitchenActions.markdownBuild
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
             * @namespace       config.kitchenActions.markdownBuild
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
             * @namespace       config.kitchenActions.markdownBuild
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
             * @namespace       config.kitchenActions.format
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
             * @namespace       config.kitchenActions.format
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
             * @namespace       config.kitchenActions.format
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
             * @namespace       config.kitchenActions.format
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
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsT0FBTztRQUNILElBQUksRUFBRTtZQUNGOzs7Ozs7Ozs7O2VBVUc7WUFDSCxLQUFLLEVBQUUscUJBQXFCO1lBQzVCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxXQUFXLEVBQ1AsZ0ZBQWdGO1lBQ3BGOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsMkJBQTJCO1lBQ3BDLE1BQU0sRUFBRSxFQUFFO1lBQ1YsUUFBUSxFQUFFLEVBQUU7U0FDZjtRQUNELE1BQU0sRUFBRTtZQUNKOzs7Ozs7Ozs7O2VBVUc7WUFDSCxLQUFLLEVBQUUsZ0JBQWdCO1lBQ3ZCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxXQUFXLEVBQUUsaURBQWlEO1lBQzlEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsa0NBQWtDO1lBQzNDLE1BQU0sRUFBRSxFQUFFO1lBQ1YsUUFBUSxFQUFFLEVBQUU7U0FDZjtRQUNELE9BQU8sRUFBRTtZQUNMOzs7Ozs7Ozs7O2VBVUc7WUFDSCxLQUFLLEVBQUUsa0JBQWtCO1lBQ3pCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxXQUFXLEVBQUUsaUNBQWlDO1lBQzlDOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLE1BQU0sRUFBRSxFQUFFO1lBQ1YsUUFBUSxFQUFFLEVBQUU7U0FDZjtRQUNELFlBQVksRUFBRTtZQUNWOzs7Ozs7Ozs7O2VBVUc7WUFDSCxLQUFLLEVBQUUsd0JBQXdCO1lBQy9COzs7Ozs7Ozs7O2VBVUc7WUFDSCxXQUFXLEVBQUUsMkNBQTJDO1lBQ3hEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUseUNBQXlDO1lBQ2xELE1BQU0sRUFBRSxFQUFFO1lBQ1YsUUFBUSxFQUFFLEVBQUU7U0FDZjtRQUNELFFBQVEsRUFBRTtZQUNOOzs7Ozs7Ozs7O2VB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