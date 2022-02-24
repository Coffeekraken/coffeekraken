export default function (env, config) {
    if (env.platform !== 'node')
        return;
    return {
        defaultRecipe: 'default',
        exclude: [],
        recipes: {
            /**
             * @name            default
             * @namespace       config.frontstack.recipes
             * @type            String
             * @default         [config.frontstackRecipeDefault]
             *
             * Specify the default recipe
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            default: '[config.frontstackRecipeDefault]',
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
                command: '%sugar frontendServer.start [arguments]',
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
                 * @default        %sugar postcss.build [arguments]
                 *
                 * Specify the postcss build action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                command: '%sugar postcss.build [arguments]',
                params: {},
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
                command: '%sugar images.build [arguments]',
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
                command: '%sugar vite [arguments]',
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
                command: '%sugar vite.build [arguments]',
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
                command: '%sugar docmap.build [arguments]',
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
                command: '%sugar sitemap.build [arguments]',
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
                command: '%sugar favicon.build [arguments]',
                params: {},
                settings: {
                    processManager: {},
                },
            }
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzdGFjay5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcm9udHN0YWNrLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUcsRUFBRSxNQUFNO0lBQ2hDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUNwQyxPQUFPO1FBQ0gsYUFBYSxFQUFFLFNBQVM7UUFFeEIsT0FBTyxFQUFFLEVBQUU7UUFFWCxPQUFPLEVBQUU7WUFDTDs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLGtDQUFrQztZQUMzQzs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUFFLGlDQUFpQztZQUN6Qzs7Ozs7Ozs7OztlQVVHO1lBQ0gsVUFBVSxFQUFFLHFDQUFxQztZQUNqRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLGtDQUFrQztTQUM5QztRQUVELE9BQU8sRUFBRTtZQUNMLElBQUksRUFBRTtnQkFDRjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUscUJBQXFCO2dCQUM1Qjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxXQUFXLEVBQ1AsZ0ZBQWdGO2dCQUNwRjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxPQUFPLEVBQUUsMkJBQTJCO2dCQUNwQyxNQUFNLEVBQUUsRUFBRTtnQkFDVixRQUFRLEVBQUUsRUFBRTthQUNmO1lBQ0QsTUFBTSxFQUFFO2dCQUNKOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEtBQUssRUFBRSxnQkFBZ0I7Z0JBQ3ZCOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFdBQVcsRUFDUCxpREFBaUQ7Z0JBQ3JEOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE9BQU8sRUFBRSxrQ0FBa0M7Z0JBQzNDLE1BQU0sRUFBRSxFQUFFO2dCQUNWLFFBQVEsRUFBRSxFQUFFO2FBQ2Y7WUFDRCxZQUFZLEVBQUU7Z0JBQ1Y7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsS0FBSyxF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