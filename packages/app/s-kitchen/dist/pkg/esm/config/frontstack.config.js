export default function (env, config) {
    if (env.platform !== 'node')
        return;
    return {
        defaultRecipe: 'default',
        exclude: [],
        recipes: {
            /**
             * @name            generic
             * @namespace       config.frontstack.recipes
             * @type            String
             * @default         [config.frontstackRecipeGeneric]
             *
             * Specify the default recipe
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            generic: '[config.frontstackRecipeGeneric]',
            /**
             * @name            nextJs
             * @namespace       config.frontstack.recipes
             * @type            String
             * @default         [config.frontstackRecipeNextJs]
             *
             * Specify the next.js recipe
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            nextJs: '[config.frontstackRecipeNextJs]',
            /**
             * @name            litElement
             * @namespace       config.frontstack.recipes
             * @type            String
             * @default         [config.frontstackRecipeLitElement]
             *
             * Specify the litElement recipe
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            litElement: '[config.frontstackRecipeLitElement]',
            /**
             * @name            feature
             * @namespace       config.frontstack.recipes
             * @type            String
             * @default         [config.frontstackRecipeFeature]
             *
             * Specify the feature recipe
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            feature: '[config.frontstackRecipeFeature]',
        },
        actions: {
            copy: {
                /**
                 * @name            title
                 * @namespace       config.frontstack.actions.copy
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
                 * @namespace       config.frontstack.actions.copy
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
                 * @namespace       config.frontstack.actions.copy
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
                 * @namespace       config.frontstack.actions.rename
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
                 * @namespace       config.frontstack.actions.rename
                 * @type            String
                 * @default        ...
                 *
                 * Specify the frontstack rename action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Rename a project (folder, package.json, etc...)',
                /**
                 * @name            command
                 * @namespace       config.frontstack.actions.rename
                 * @type            String
                 * @default        sugar
                 *
                 * Specify the frontstack rename action command
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
                 * @namespace       config.frontstack.actions.initNpm
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
                 * @namespace       config.frontstack.actions.initNpm
                 * @type            String
                 * @default        ...
                 *
                 * Specify the frontstack initNpm action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Init npm package in the project',
                /**
                 * @name            command
                 * @namespace       config.frontstack.actions.initNpm
                 * @type            String
                 * @default        sugar
                 *
                 * Specify the frontstack initNpm action command
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
                 * @namespace       config.frontstack.actions.addSugarJson
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
                 * @namespace       config.frontstack.actions.addSugarJson
                 * @type            String
                 * @default        ...
                 *
                 * Specify the frontstack addSugarJson action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Adding the sugar.json file to the project',
                /**
                 * @name            command
                 * @namespace       config.frontstack.actions.addSugarJson
                 * @type            String
                 * @default        sugar
                 *
                 * Specify the frontstack addSugarJson action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: `sugar add.sugarJson [arguments]`,
                params: {},
                settings: {},
            },
            addFrontspecJson: {
                /**
                 * @name            title
                 * @namespace       config.frontstack.actions.addFrontspecJson
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
                 * @namespace       config.frontstack.actions.addFrontspecJson
                 * @type            String
                 * @default        ...
                 *
                 * Specify the frontstack addFrontspecJson action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Adding the frontspec.json file to the project',
                /**
                 * @name            command
                 * @namespace       config.frontstack.actions.addFrontspecJson
                 * @type            String
                 * @default        sugar
                 *
                 * Specify the frontstack addFrontspecJson action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: `sugar frontspec.add [arguments]`,
                params: {},
                settings: {},
            },
            addManifestJson: {
                /**
                 * @name            title
                 * @namespace       config.frontstack.actions.addManifestJson
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
                 * @namespace       config.frontstack.actions.addManifestJson
                 * @type            String
                 * @default        ...
                 *
                 * Specify the frontstack addManifestJson action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Adding the manifest.json file to the project',
                /**
                 * @name            command
                 * @namespace       config.frontstack.actions.addManifestJson
                 * @type            String
                 * @default        sugar
                 *
                 * Specify the frontstack addManifestJson action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: `sugar add.manifestJson [arguments]`,
                params: {},
                settings: {},
            },
            applyDefaultPackageJson: {
                /**
                 * @name            title
                 * @namespace       config.frontstack.actions.applyDefaultPackageJson
                 * @type            String
                 * @default        Adding manifest.json file
                 *
                 * Apply the config.package.defaultPackageJson object on the package.json file
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: 'Apply default package.json',
                /**
                 * @name            description
                 * @namespace       config.frontstack.actions.applyDefaultPackageJson
                 * @type            String
                 * @default        ...
                 *
                 * Apply the config.package.defaultPackageJson object on the package.json file
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Apply the config.package.defaultPackageJson object on the package.json file',
                /**
                 * @name            command
                 * @namespace       config.frontstack.actions.applyDefaultPackageJson
                 * @type            String
                 * @default        sugar
                 *
                 * Apply the config.package.defaultPackageJson object on the package.json file
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: `sugar add.applyDefaultPackageJson [arguments]`,
                params: {},
                settings: {},
            },
            addFavicon: {
                /**
                 * @name            title
                 * @namespace       config.frontstack.actions.addFavicon
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
                 * @namespace       config.frontstack.actions.addFavicon
                 * @type            String
                 * @default        ...
                 *
                 * Specify the frontstack addFavicon action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Adding the favicon source file to the project',
                /**
                 * @name            command
                 * @namespace       config.frontstack.actions.addFavicon
                 * @type            String
                 * @default        sugar
                 *
                 * Specify the frontstack addFavicon action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: `sugar favicon.add [arguments]`,
                params: {},
                settings: {},
            },
            addDefaultPages: {
                /**
                 * @name            title
                 * @namespace       config.frontstack.actions.addDefaultPages
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
                 * @namespace       config.frontstack.actions.addDefaultPages
                 * @type            String
                 * @default        ...
                 *
                 * Specify the frontstack addDefaultPages action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Adding some default pages/views to the project',
                /**
                 * @name            command
                 * @namespace       config.frontstack.actions.addDefaultPages
                 * @type            String
                 * @default        sugar
                 *
                 * Specify the frontstack addDefaultPages action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: `sugar frontendServer.addDefaultPages -y [arguments]`,
                params: {},
                settings: {},
            },
            addSugarPostcss: {
                /**
                 * @name            title
                 * @namespace       config.frontstack.actions.addSugarPostcss
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
                 * @namespace       config.frontstack.actions.addSugarPostcss
                 * @type            String
                 * @default        ...
                 *
                 * Specify the frontstack addSugarPostcss action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Adding the sugar postcss plugin to the project',
                /**
                 * @name            command
                 * @namespace       config.frontstack.actions.addSugarPostcss
                 * @type            String
                 * @default        sugar
                 *
                 * Specify the frontstack addSugarPostcss action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: `sugar postcss.add [arguments]`,
                params: {},
                settings: {},
            },
            installDependencies: {
                /**
                 * @name            title
                 * @namespace       config.frontstack.actions.installDependencies
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
                 * @namespace       config.frontstack.actions.installDependencies
                 * @type            String
                 * @default        ...
                 *
                 * Specify the frontstack addManifestJson action description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Install dependencies like node_modules and composer if exists',
                /**
                 * @name            command
                 * @namespace       config.frontstack.actions.installDependencies
                 * @type            String
                 * @default        sugar
                 *
                 * Specify the frontstack addManifestJson action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: `sugar package.install [arguments]`,
                params: {},
                settings: {},
            },
            frontendServer: {
                /**
                 * @name            title
                 * @namespace       config.frontstack.actions.frontendServer
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
                 * @namespace       config.frontstack.actions.frontendServer
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
                 * @namespace       config.frontstack.actions.frontendServer
                 * @type            String
                 * @default        sugar frontendServer.start [arguments]
                 *
                 * Specify the frontend server action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: 'sugar frontendServer.start [arguments]',
                params: {},
                settings: {
                    processManager: {
                        /**
                         * @name            restart
                         * @namespace       config.frontstack.actions.frontendServer.settings.processManager
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
                 * @namespace       config.frontstack.actions.corsProxy
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
                 * @namespace       config.frontstack.actions.corsProxy
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
                 * @namespace       config.frontstack.actions.corsProxy
                 * @type            String
                 * @default        sugar corsProxy.start [arguments]
                 *
                 * Specify the frontend server action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: 'sugar frontendServer.corsProxy [arguments]',
                params: {},
                settings: {
                    processManager: {
                        /**
                         * @name            restart
                         * @namespace       config.frontstack.actions.corsProxy.settings.processManager
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
                 * @namespace       config.frontstack.actions.postcssBuild
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
                 * @namespace       config.frontstack.actions.postcssBuild
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
                 * @namespace       config.frontstack.actions.postcssBuild
                 * @type            String
                 * @default        sugar postcss.build [arguments]
                 *
                 * Specify the postcss build action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: 'sugar postcss.build --prod [arguments]',
                params: {},
                settings: {
                    processManager: {},
                },
            },
            typescriptBuild: {
                /**
                 * @name            title
                 * @namespace       config.frontstack.actions.typescriptBuild
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
                 * @namespace       config.frontstack.actions.typescriptBuild
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
                 * @namespace       config.frontstack.actions.typescriptBuild
                 * @type            String
                 * @default        sugar typescriptBuilder.build [arguments]
                 *
                 * Specify the typescriptBuilder build action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: 'sugar typescript.build [arguments]',
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
                 * @namespace       config.frontstack.actions.imagesBuild
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
                 * @namespace       config.frontstack.actions.imagesBuild
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
                 * @namespace       config.frontstack.actions.imagesBuild
                 * @type            String
                 * @default        sugar images.build [arguments]
                 *
                 * Specify the images build action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: 'sugar images.build [arguments]',
                params: {},
                settings: {
                    processManager: {},
                },
            },
            vite: {
                /**
                 * @name            title
                 * @namespace       config.frontstack.actions.vite
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
                 * @namespace       config.frontstack.actions.vite
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
                 * @namespace       config.frontstack.actions.vite
                 * @type            String
                 * @default        sugar vite [arguments]
                 *
                 * Specify the vite action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: 'sugar vite [arguments]',
                params: {},
                settings: {
                    processManager: {},
                },
            },
            viteBuild: {
                /**
                 * @name            title
                 * @namespace       config.frontstack.actions.viteBuild
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
                 * @namespace       config.frontstack.actions.viteBuild
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
                 * @namespace       config.frontstack.actions.viteBuild
                 * @type            String
                 * @default        sugar vite.build [arguments]
                 *
                 * Specify the vite build action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: 'sugar vite.build --prod [arguments]',
                params: {},
                settings: {
                    processManager: {},
                },
            },
            docmapBuild: {
                /**
                 * @name            title
                 * @namespace       config.frontstack.actions.docmapBuild
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
                 * @namespace       config.frontstack.actions.docmapBuild
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
                 * @namespace       config.frontstack.actions.docmapBuild
                 * @type            String
                 * @default        sugar docmap.build [arguments]
                 *
                 * Specify the doc build action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: 'sugar docmap.build [arguments]',
                params: {},
                settings: {
                    processManager: {},
                },
            },
            sitemapBuild: {
                /**
                 * @name            title
                 * @namespace       config.frontstack.actions.sitemapBuild
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
                 * @namespace       config.frontstack.actions.docmapBuild
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
                 * @namespace       config.frontstack.actions.docmapBuild
                 * @type            String
                 * @default        sugar sitemap.build [arguments]
                 *
                 * Specify the doc build action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: 'sugar sitemap.build [arguments]',
                params: {},
                settings: {
                    processManager: {},
                },
            },
            faviconBuild: {
                /**
                 * @name            title
                 * @namespace       config.frontstack.actions.faviconBuild
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
                 * @namespace       config.frontstack.actions.faviconBuild
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
                 * @namespace       config.frontstack.actions.docmapBuild
                 * @type            String
                 * @default        sugar favicon.build [arguments]
                 *
                 * Specify the doc build action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: 'sugar favicon.build [arguments]',
                params: {},
                settings: {
                    processManager: {},
                },
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRyxFQUFFLE1BQU07SUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBQ3BDLE9BQU87UUFDSCxhQUFhLEVBQUUsU0FBUztRQUV4QixPQUFPLEVBQUUsRUFBRTtRQUVYLE9BQU8sRUFBRTtZQUNMOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsa0NBQWtDO1lBQzNDOzs7Ozs7Ozs7O2VBVUc7WUFDSCxNQUFNLEVBQUUsaUNBQWlDO1lBQ3pDOzs7Ozs7Ozs7O2VBVUc7WUFDSCxVQUFVLEVBQUUscUNBQXFDO1lBQ2pEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsa0NBQWtDO1NBQzlDO1FBRUQsT0FBTyxFQUFFO1lBQ0wsSUFBSSxFQUFFO2dCQUNGOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEtBQUssRUFBRSxxQkFBcUI7Z0JBQzVCOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFdBQVcsRUFDUCxnRkFBZ0Y7Z0JBQ3BGOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE9BQU8sRUFBRSwyQkFBMkI7Z0JBQ3BDLE1BQU0sRUFBRSxFQUFFO2dCQUNWLFFBQVEsRUFBRSxFQUFFO2FBQ2Y7WUFDRCxNQUFNLEVBQUU7Z0JBQ0o7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsS0FBSyxFQUFFLGdCQUFnQjtnQkFDdkI7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsV0FBVyxFQUFFLGlEQUFpRDtnQkFDOUQ7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsT0FBTyxFQUFFLGtDQUFrQztnQkFDM0MsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsUUFBUSxFQUFFLEVBQUU7YUFDZjtZQUNELE9BQU8sRUFBRTtnQkFDTDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUsa0JBQWtCO2dCQUN6Qjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxXQUFXLEVBQUUsaUNBQWlDO2dCQUM5Qzs7Ozs7Ozs7OzttQkFVRztnQkFDSCxPQUFPLEVBQUUsaUJBQWlCO2dCQUMxQixNQUFNLEVBQUUsRUFBRTtnQkFDVixRQUFRLEVBQUUsRUFBRTthQUNmO1lBQ0QsWUFBWSxFQUFFO2dCQUNWOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEtBQUssRUFBRSx3QkFBd0I7Z0JBQy9COzs7Ozs7Ozs7O21CQVVHO2dCQUNILFdBQVcsRUFBRSwyQ0FBMkM7Z0JBQ3hEOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE9BQU8sRUFBRSxpQ0FBaUM7Z0JBQzFDLE1BQU0sRUFBRSxFQUFFO2dCQUNWLFFBQVEsRUFBRSxFQUFFO2FBQ2Y7WUFDRCxnQkFBZ0IsRUFBRTtnQkFDZDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUsNEJBQTRCO2dCQUNuQzs7Ozs7Ozs7OzttQkFVRztnQkFDSCxXQUFXLEVBQUUsK0NBQStDO2dCQUM1RDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxPQUFPLEVBQUUsaUNBQWlDO2dCQUMxQyxNQUFNLEVBQUUsRUFBRTtnQkFDVixRQUFRLEVBQUUsRUFBRTthQUNmO1lBQ0QsZUFBZSxFQUFFO2dCQUNiOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEtBQUssRUFBRSwyQkFBMkI7Z0JBQ2xDOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFdBQVcsRUFBRSw4Q0FBOEM7Z0JBQzNEOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE9BQU8sRUFBRSxvQ0FBb0M7Z0JBQzdDLE1BQU0sRUFBRSxFQUFFO2dCQUNWLFFBQVEsRUFBRSxFQUFFO2FBQ2Y7WUFDRCx1QkFBdUIsRUFBRTtnQkFDckI7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsS0FBSyxFQUFFLDRCQUE0QjtnQkFDbkM7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsV0FBVyxFQUNQLDZFQUE2RTtnQkFDakY7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsT0FBTyxFQUFFLCtDQUErQztnQkFDeEQsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsUUFBUSxFQUFFLEVBQUU7YUFDZjtZQUNELFVBQVUsRUFBRTtnQkFDUjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUsNEJBQTRCO2dCQUNuQzs7Ozs7Ozs7OzttQkFVRztnQkFDSCxXQUFXLEVBQUUsK0NBQStDO2dCQUM1RDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxPQUFPLEVBQUUsK0JBQStCO2dCQUN4QyxNQUFNLEVBQUUsRUFBRTtnQkFDVixRQUFRLEVBQUUsRUFBRTthQUNmO1lBQ0QsZUFBZSxFQUFFO2dCQUNiOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEtBQUssRUFBRSxpQ0FBaUM7Z0JBQ3hDOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFdBQVcsRUFBRSxnREFBZ0Q7Z0JBQzdEOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE9BQU8sRUFBRSxxREFBcUQ7Z0JBQzlELE1BQU0sRUFBRSxFQUFFO2dCQUNWLFFBQVEsRUFBRSxFQUFFO2FBQ2Y7WUFDRCxlQUFlLEVBQUU7Z0JBQ2I7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsS0FBSyxFQUFFLDZCQUE2QjtnQkFDcEM7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsV0FBVyxFQUFFLGdEQUFnRDtnQkFDN0Q7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsT0FBTyxFQUFFLCtCQUErQjtnQkFDeEMsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsUUFBUSxFQUFFLEVBQUU7YUFDZjtZQUNELG1CQUFtQixFQUFFO2dCQUNqQjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUsc0JBQXNCO2dCQUM3Qjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxXQUFXLEVBQ1AsK0RBQStEO2dCQUNuRTs7Ozs7Ozs7OzttQkFVRztnQkFDSCxPQUFPLEVBQUUsbUNBQW1DO2dCQUM1QyxNQUFNLEVBQUUsRUFBRTtnQkFDVixRQUFRLEVBQUUsRUFBRTthQUNmO1lBQ0QsY0FBYyxFQUFFO2dCQUNaOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEtBQUssRUFBRSxpQkFBaUI7Z0JBQ3hCOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFdBQVcsRUFDUCxtRUFBbUU7Z0JBQ3ZFOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE9BQU8sRUFBRSx3Q0FBd0M7Z0JBQ2pELE1BQU0sRUFBRSxFQUFFO2dCQUNWLFFBQVEsRUFBRTtvQkFDTixjQUFjLEVBQUU7d0JBQ1o7Ozs7Ozs7Ozs7MkJBVUc7d0JBQ0gsT0FBTyxFQUFFLElBQUk7cUJBQ2hCO2lCQUNKO2FBQ0o7WUFDRCxTQUFTLEVBQUU7Z0JBQ1A7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsS0FBSyxFQUFFLFlBQVk7Z0JBQ25COzs7Ozs7Ozs7O21CQVVHO2dCQUNILFdBQVcsRUFDUCw4RUFBOEU7Z0JBQ2xGOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE9BQU8sRUFBRSw0Q0FBNEM7Z0JBQ3JELE1BQU0sRUFBRSxFQUFFO2dCQUNWLFFBQVEsRUFBRTtvQkFDTixjQUFjLEVBQUU7d0JBQ1o7Ozs7Ozs7Ozs7MkJBVUc7d0JBQ0gsT0FBTyxFQUFFLElBQUk7cUJBQ2hCO2lCQUNKO2FBQ0o7WUFDRCxZQUFZLEVBQUU7Z0JBQ1Y7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsS0FBSyxFQUFFLHNCQUFzQjtnQkFDN0I7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsV0FBVyxFQUFFLDZDQUE2QztnQkFDMUQ7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsT0FBTyxFQUFFLHdDQUF3QztnQkFDakQsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsUUFBUSxFQUFFO29CQUNOLGNBQWMsRUFBRSxFQUFFO2lCQUNyQjthQUNKO1lBQ0QsZUFBZSxFQUFFO2dCQUNiOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEtBQUssRUFBRSxpQ0FBaUM7Z0JBQ3hDOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFdBQVcsRUFDUCx5REFBeUQ7Z0JBQzdEOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE9BQU8sRUFBRSxvQ0FBb0M7Z0JBQzdDLE1BQU0sRUFBRTtvQkFDSixLQUFLLEVBQUUsSUFBSTtpQkFDZDtnQkFDRCxRQUFRLEVBQUU7b0JBQ04sY0FBYyxFQUFFLEVBQUU7aUJBQ3JCO2FBQ0o7WUFDRCxXQUFXLEVBQUU7Z0JBQ1Q7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsS0FBSyxFQUFFLHFCQUFxQjtnQkFDNUI7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsV0FBVyxFQUNQLHFFQUFxRTtnQkFDekU7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsT0FBTyxFQUFFLGdDQUFnQztnQkFDekMsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsUUFBUSxFQUFFO29CQUNOLGNBQWMsRUFBRSxFQUFFO2lCQUNyQjthQUNKO1lBQ0QsSUFBSSxFQUFFO2dCQUNGOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEtBQUssRUFBRSx3QkFBd0I7Z0JBQy9COzs7Ozs7Ozs7O21CQVVHO2dCQUNILFdBQVcsRUFBRSw4Q0FBOEM7Z0JBQzNEOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE9BQU8sRUFBRSx3QkFBd0I7Z0JBQ2pDLE1BQU0sRUFBRSxFQUFFO2dCQUNWLFFBQVEsRUFBRTtvQkFDTixjQUFjLEVBQUUsRUFBRTtpQkFDckI7YUFDSjtZQUNELFNBQVMsRUFBRTtnQkFDUDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUsa0JBQWtCO2dCQUN6Qjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxXQUFXLEVBQ1Asd0VBQXdFO2dCQUM1RTs7Ozs7Ozs7OzttQkFVRztnQkFDSCxPQUFPLEVBQUUscUNBQXFDO2dCQUM5QyxNQUFNLEVBQUUsRUFBRTtnQkFDVixRQUFRLEVBQUU7b0JBQ04sY0FBYyxFQUFFLEVBQUU7aUJBQ3JCO2FBQ0o7WUFDRCxXQUFXLEVBQUU7Z0JBQ1Q7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsS0FBSyxFQUFFLHFCQUFxQjtnQkFDNUI7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsV0FBVyxFQUNQLDZEQUE2RDtnQkFDakU7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsT0FBTyxFQUFFLGdDQUFnQztnQkFDekMsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsUUFBUSxFQUFFO29CQUNOLGNBQWMsRUFBRSxFQUFFO2lCQUNyQjthQUNKO1lBQ0QsWUFBWSxFQUFFO2dCQUNWOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEtBQUssRUFBRSxzQkFBc0I7Z0JBQzdCOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFdBQVcsRUFDUCw2REFBNkQ7Z0JBQ2pFOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE9BQU8sRUFBRSxpQ0FBaUM7Z0JBQzFDLE1BQU0sRUFBRSxFQUFFO2dCQUNWLFFBQVEsRUFBRTtvQkFDTixjQUFjLEVBQUUsRUFBRTtpQkFDckI7YUFDSjtZQUNELFlBQVksRUFBRTtnQkFDVjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUscUJBQXFCO2dCQUM1Qjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxXQUFXLEVBQ1AsaUZBQWlGO2dCQUNyRjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxPQUFPLEVBQUUsaUNBQWlDO2dCQUMxQyxNQUFNLEVBQUUsRUFBRTtnQkFDVixRQUFRLEVBQUU7b0JBQ04sY0FBYyxFQUFFLEVBQUU7aUJBQ3JCO2FBQ0o7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDIn0=