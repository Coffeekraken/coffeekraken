"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(env, config) {
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUcsRUFBRSxNQUFNO0lBQ2hDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUNwQyxPQUFPO1FBQ0gsYUFBYSxFQUFFLFNBQVM7UUFFeEIsT0FBTyxFQUFFLEVBQUU7UUFFWCxPQUFPLEVBQUU7WUFDTDs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLGtDQUFrQztZQUMzQzs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUFFLGlDQUFpQztZQUN6Qzs7Ozs7Ozs7OztlQVVHO1lBQ0gsVUFBVSxFQUFFLHFDQUFxQztZQUNqRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLGtDQUFrQztTQUM5QztRQUVELE9BQU8sRUFBRTtZQUNMLElBQUksRUFBRTtnQkFDRjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUscUJBQXFCO2dCQUM1Qjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxXQUFXLEVBQ1AsZ0ZBQWdGO2dCQUNwRjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxPQUFPLEVBQUUsMkJBQTJCO2dCQUNwQyxNQUFNLEVBQUUsRUFBRTtnQkFDVixRQUFRLEVBQUUsRUFBRTthQUNmO1lBQ0QsTUFBTSxFQUFFO2dCQUNKOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEtBQUssRUFBRSxnQkFBZ0I7Z0JBQ3ZCOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFdBQVcsRUFBRSxpREFBaUQ7Z0JBQzlEOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE9BQU8sRUFBRSxrQ0FBa0M7Z0JBQzNDLE1BQU0sRUFBRSxFQUFFO2dCQUNWLFFBQVEsRUFBRSxFQUFFO2FBQ2Y7WUFDRCxPQUFPLEVBQUU7Z0JBQ0w7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsS0FBSyxFQUFFLGtCQUFrQjtnQkFDekI7Ozs7Ozs7Ozs7bUJBVUc7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