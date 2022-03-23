(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
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
                    command: `sugar postcss.installPlugin [arguments]`,
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
                },
            },
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzdGFjay5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcm9udHN0YWNrLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUtBLG1CQUF5QixHQUFHLEVBQUUsTUFBTTtRQUNoQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtZQUFFLE9BQU87UUFDcEMsT0FBTztZQUNILGFBQWEsRUFBRSxTQUFTO1lBRXhCLE9BQU8sRUFBRSxFQUFFO1lBRVgsT0FBTyxFQUFFO2dCQUNMOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE9BQU8sRUFBRSxrQ0FBa0M7Z0JBQzNDOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE1BQU0sRUFBRSxpQ0FBaUM7Z0JBQ3pDOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFVBQVUsRUFBRSxxQ0FBcUM7Z0JBQ2pEOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE9BQU8sRUFBRSxrQ0FBa0M7YUFDOUM7WUFFRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFO29CQUNGOzs7Ozs7Ozs7O3VCQVVHO29CQUNILEtBQUssRUFBRSxxQkFBcUI7b0JBQzVCOzs7Ozs7Ozs7O3VCQVVHO29CQUNILFdBQVcsRUFDUCxnRkFBZ0Y7b0JBQ3BGOzs7Ozs7Ozs7O3VCQVVHO29CQUNILE9BQU8sRUFBRSwyQkFBMkI7b0JBQ3BDLE1BQU0sRUFBRSxFQUFFO29CQUNWLFFBQVEsRUFBRSxFQUFFO2lCQUNmO2dCQUNELE1BQU0sRUFBRTtvQkFDSjs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxLQUFLLEVBQUUsZ0JBQWdCO29CQUN2Qjs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxXQUFXLEVBQUUsaURBQWlEO29CQUM5RDs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxPQUFPLEVBQUUsa0NBQWtDO29CQUMzQyxNQUFNLEVBQUUsRUFBRTtvQkFDVixRQUFRLEVBQUUsRUFBRTtpQkFDZjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1Y7Ozs7Ozs7Ozs7dUJB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