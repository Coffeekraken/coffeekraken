export default function (api) {
    if (api.env.platform !== 'node') {
        return;
    }

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
            description:
                'Copy a file or a directory from the source to the destination passed in params',
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
            description:
                'Adding the sugar toolkit and the s-sugar feature in your project',
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
            description:
                'Install dependencies like node_modules and composer if exists',
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
            interface:
                '@coffeekraken/s-package/node/interface/SPackageInstallParamsInterface',
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
            description:
                'Frontend server using the @coffeekraken/s-frontend-server package',
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
            interface:
                '@coffeekraken/s-frontend-server/node/interface/SFrontendServerStartParamsInterface',
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
            description:
                'Frontend cors proxy server using the @coffeekraken/s-frontend-server package',
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
            interface:
                '@coffeekraken/s-frontend-server/node/interface/SFrontendServerCorsProxyParamsInterface',
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
            command: 'sugar postcss.build [arguments]',
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
            interface:
                '@coffeekraken/s-postcss-builder/node/interface/SPostcssBuilderBuildParamsInterface',
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
            description:
                'Build typescript using the s-typescript-builder package',
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
            interface:
                '@coffeekraken/s-typescript-builder/node/interface/STypescriptBuilderBuildParamsInterface',
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
            description:
                'Build your images with ease. Compress, resize, webp version, etc...',
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
            interface:
                '@coffeekraken/s-images-builder/node/interface/SImagesBuilderBuildParamsInterface',
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
            interface:
                '@coffeekraken/s-vite/node/interface/SViteStartParamsInterface',
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
            description:
                'Allow to compile javascript (js, ts, riot, react, etc...) files easily',
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
            command: 'sugar vite.build [arguments]',
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
            interface:
                '@coffeekraken/s-vite/node/interface/SViteBuildParamsInterface',
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
            description:
                'Allow to build and maintain up to date the docmap.json file',
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
            interface:
                '@coffeekraken/s-docmap/node/interface/SDocmapBuildParamsInterface',
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
            description:
                'Allow to build and maintain up to date the sitemap.xml file',
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
            interface:
                '@coffeekraken/s-sitemap-builder/node/interface/SSitemapBuilderBuildParamsInterface',
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
            description:
                'Allow to build and maintain up to date your favicon files and the manifest.json',
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
            interface:
                '@coffeekraken/s-favicon-builder/node/interface/SFaviconBuilderBuildParamsInterface',
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
            interface:
                '@coffeekraken/s-markdown-builder/node/interface/SMarkdownBuilderBuildParamsInterface',
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
            interface:
                '@coffeekraken/s-code-formatter/node/interface/SCodeFormatterFormatParamsInterface',
            params: {
                watch: true,
            },
            settings: {
                processManager: {},
            },
        },
    };
}
