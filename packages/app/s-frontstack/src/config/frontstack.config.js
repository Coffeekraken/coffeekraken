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
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            default: '[config.frontstackRecipeDefault]',
            /**
             * @name            litElement
             * @namespace       config.frontstack.recipes
             * @type            String
             * @default         [config.frontstackRecipeLitElement]
             *
             * Specify the litElement recipe
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            litElement: '[config.frontstackRecipeLitElement]',
        },
        actions: {
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
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                description: 'Frontend server using the @coffeekraken/s-frontend-server package',
                /**
                 * @name            command
                 * @namespace       config.frontstack.actions.frontendServer
                 * @type            String
                 * @default        sugar frontendServer.start
                 *
                 * Specify the frontend server action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                process: 'sugar frontendServer.start',
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
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                description: 'Build css using the amazing PostCSS package',
                /**
                 * @name            command
                 * @namespace       config.frontstack.actions.postcssBuild
                 * @type            String
                 * @default        Frontend server
                 *
                 * Specify the postcss build action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                command: 'sugar postcss.build',
                params: {},
                settings: {
                    processManager: {
                        /**
                         * @name            restart
                         * @namespace       config.frontstack.actions.postcssBuild.settings.processManager
                         * @type            String
                         * @default        true
                         *
                         * Specify the postcss build action restart behavior
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                         */
                        restart: true,
                    },
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
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                description: 'Build your images with ease. Compress, resize, webp version, etc...',
                /**
                 * @name            command
                 * @namespace       config.frontstack.actions.imagesBuild
                 * @type            String
                 * @default        sugar images.build
                 *
                 * Specify the images build action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                command: 'sugar images.build',
                params: {},
                settings: {
                    processManager: {
                        /**
                         * @name            restart
                         * @namespace       config.frontstack.actions.imagesBuild.settings.processManager
                         * @type            String
                         * @default        true
                         *
                         * Specify the images build action restart behavior
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                         */
                        restart: true,
                    },
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
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                description: 'Allow to build files easily while developing',
                /**
                 * @name            command
                 * @namespace       config.frontstack.actions.vite
                 * @type            String
                 * @default        sugar vite
                 *
                 * Specify the vite action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                command: 'sugar vite',
                params: {},
                settings: {
                    processManager: {
                        /**
                         * @name            restart
                         * @namespace       config.frontstack.actions.vite.settings.processManager
                         * @type            String
                         * @default        true
                         *
                         * Specify the vite action restart behavior
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                         */
                        restart: true,
                    },
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
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                description: 'Allow to compile javascript (js, ts, riot, react, etc...) files easily',
                /**
                 * @name            command
                 * @namespace       config.frontstack.actions.viteBuild
                 * @type            String
                 * @default        sugar vite.build
                 *
                 * Specify the vite build action command
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                command: 'sugar vite.build',
                params: {},
                settings: {
                    processManager: {
                        /**
                         * @name            restart
                         * @namespace       config.frontstack.actions.viteBuild.settings.processManager
                         * @type            String
                         * @default        true
                         *
                         * Specify the vite build action restart behavior
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                         */
                        restart: true,
                    },
                },
            },
            docBuild: {
                id: 'docBuild',
                title: 'Markdown doc build stack',
                description: 'Allow to build markdown documentation with special features files easily. Take care of src/README and src/doc/**/*.md files',
                process: 'sugar markdown.build -p readme -p doc',
                params: {},
                settings: {
                    processManager: {
                        /**
                         * @name            restart
                         * @namespace       config.frontstack.actions.docBuild.settings.processManager
                         * @type            String
                         * @default        true
                         *
                         * Specify the doc build action restart behavior
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                         */
                        restart: true,
                    },
                },
            },
            docmapBuild: {
                id: 'docmapBuild',
                title: 'Docmap build action',
                description: 'Allow to build and maintain up to date the docmap.json file',
                process: 'sugar docmap.build --noExtends',
                params: {},
                settings: {
                    processManager: {
                        /**
                         * @name            restart
                         * @namespace       config.frontstack.actions.docmapBuild.settings.processManager
                         * @type            String
                         * @default        true
                         *
                         * Specify the docmap build action restart behavior
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                         */
                        restart: true,
                    },
                },
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzdGFjay5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcm9udHN0YWNrLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUcsRUFBRSxNQUFNO0lBQ2hDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUNwQyxPQUFPO1FBQ0gsYUFBYSxFQUFFLFNBQVM7UUFFeEIsT0FBTyxFQUFFLEVBQUU7UUFFWCxPQUFPLEVBQUU7WUFDTDs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLGtDQUFrQztZQUMzQzs7Ozs7Ozs7OztlQVVHO1lBQ0gsVUFBVSxFQUFFLHFDQUFxQztTQUNwRDtRQUVELE9BQU8sRUFBRTtZQUNMLGNBQWMsRUFBRTtnQkFDWjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUsaUJBQWlCO2dCQUN4Qjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxXQUFXLEVBQ1AsbUVBQW1FO2dCQUN2RTs7Ozs7Ozs7OzttQkFVRztnQkFDSCxPQUFPLEVBQUUsNEJBQTRCO2dCQUNyQyxNQUFNLEVBQUUsRUFBRTtnQkFDVixRQUFRLEVBQUU7b0JBQ04sY0FBYyxFQUFFO3dCQUNaOzs7Ozs7Ozs7OzJCQVVHO3dCQUNILE9BQU8sRUFBRSxJQUFJO3FCQUNoQjtpQkFDSjthQUNKO1lBQ0QsWUFBWSxFQUFFO2dCQUNWOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEtBQUssRUFBRSxzQkFBc0I7Z0JBQzdCOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFdBQVcsRUFBRSw2Q0FBNkM7Z0JBQzFEOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE9BQU8sRUFBRSxxQkFBcUI7Z0JBQzlCLE1BQU0sRUFBRSxFQUFFO2dCQUNWLFFBQVEsRUFBRTtvQkFDTixjQUFjLEVBQUU7d0JBQ1o7Ozs7Ozs7Ozs7MkJBVUc7d0JBQ0gsT0FBTyxFQUFFLElBQUk7cUJBQ2hCO2lCQUNKO2FBQ0o7WUFDRCxXQUFXLEVBQUU7Z0JBQ1Q7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsS0FBSyxFQUFFLHFCQUFxQjtnQkFDNUI7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsV0FBVyxFQUNQLHFFQUFxRTtnQkFDekU7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsT0FBTyxFQUFFLG9CQUFvQjtnQkFDN0IsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsUUFBUSxFQUFFO29CQUNOLGNBQWMsRUFBRTt3QkFDWjs7Ozs7Ozs7OzsyQkFVRzt3QkFDSCxPQUFPLEVBQUUsSUFBSTtxQkFDaEI7aUJBQ0o7YUFDSjtZQUNELElBQUksRUFBRTtnQkFDRjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUsd0JBQXdCO2dCQUMvQjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxXQUFXLEVBQUUsOENBQThDO2dCQUMzRDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxPQUFPLEVBQUUsWUFBWTtnQkFDckIsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsUUFBUSxFQUFFO29CQUNOLGNBQWMsRUFBRTt3QkFDWjs7Ozs7Ozs7OzsyQkFVRzt3QkFDSCxPQUFPLEVBQUUsSUFBSTtxQkFDaEI7aUJBQ0o7YUFDSjtZQUNELFNBQVMsRUFBRTtnQkFDUDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUsa0JBQWtCO2dCQUN6Qjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxXQUFXLEVBQ1Asd0VBQXdFO2dCQUM1RTs7Ozs7Ozs7OzttQkFVRztnQkFDSCxPQUFPLEVBQUUsa0JBQWtCO2dCQUMzQixNQUFNLEVBQUUsRUFBRTtnQkFDVixRQUFRLEVBQUU7b0JBQ04sY0FBYyxFQUFFO3dCQUNaOzs7Ozs7Ozs7OzJCQVVHO3dCQUNILE9BQU8sRUFBRSxJQUFJO3FCQUNoQjtpQkFDSjthQUNKO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLEVBQUUsRUFBRSxVQUFVO2dCQUNkLEtBQUssRUFBRSwwQkFBMEI7Z0JBQ2pDLFdBQVcsRUFDUCw2SEFBNkg7Z0JBQ2pJLE9BQU8sRUFBRSx1Q0FBdUM7Z0JBQ2hELE1BQU0sRUFBRSxFQUFFO2dCQUNWLFFBQVEsRUFBRTtvQkFDTixjQUFjLEVBQUU7d0JBQ1o7Ozs7Ozs7Ozs7MkJBVUc7d0JBQ0gsT0FBTyxFQUFFLElBQUk7cUJBQ2hCO2lCQUNKO2FBQ0o7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsRUFBRSxFQUFFLGFBQWE7Z0JBQ2pCLEtBQUssRUFBRSxxQkFBcUI7Z0JBQzVCLFdBQVcsRUFDUCw2REFBNkQ7Z0JBQ2pFLE9BQU8sRUFBRSxnQ0FBZ0M7Z0JBQ3pDLE1BQU0sRUFBRSxFQUFFO2dCQUNWLFFBQVEsRUFBRTtvQkFDTixjQUFjLEVBQUU7d0JBQ1o7Ozs7Ozs7Ozs7MkJBVUc7d0JBQ0gsT0FBTyxFQUFFLElBQUk7cUJBQ2hCO2lCQUNKO2FBQ0o7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDIn0=