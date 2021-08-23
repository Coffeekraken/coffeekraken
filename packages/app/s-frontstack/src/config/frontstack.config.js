import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __path from 'path';
const recipe = 'default';
export default function (env, config) {
    if (env.platform !== 'node')
        return;
    return {
        recipe,
        exclude: [],
        recipes: {
            default: {
                title: 'Default',
                description: 'Default s-frontstack recipe ',
                templateDir: __path.resolve(`${__dirname()}/../templates/default`),
                defaultStack: 'dev',
                Rangestacks: {
                    dev: {
                        description: 'Start the development stack',
                        actions: {
                            frontendServer: '[config.frontstack.actions.frontendServer]',
                            vite: '[config.frontstack.actions.vite]',
                        },
                    },
                    prod: {
                        description: 'Start the production testing stack',
                        sharedParams: {
                            env: 'production',
                        },
                        actions: {
                            frontendServer: '[config.frontstack.actions.frontendServer]',
                        },
                    },
                    build: {
                        description: 'Build your final production ready dist package',
                        actions: {
                            postcssBuild: '[config.frontstack.actions.postcssBuild]',
                            viteBuild: '[config.frontstack.actions.viteBuild]',
                            imagesBuild: '[config.frontstack.actions.imagesBuild]',
                            docBuild: '[config.frontstack.actions.docBuild]',
                            docmapBuild: '[config.frontstack.actions.docmapBuild]',
                        },
                    },
                },
            },
            litElement: {
                title: 'LitElement component',
                description: 'LitElement webcomponent recipe',
                templateDir: __path.resolve(`${__dirname()}/../templates/litElement`),
                defaultStack: 'dev',
                stacks: {
                    dev: {
                        description: 'Start the development stack',
                        actions: {
                            vite: '[config.frontstack.actions.vite]',
                        },
                    },
                    build: {
                        description: 'Build your final production ready dist package',
                        actions: {
                            viteBuild: {
                                action: '[config.frontstack.actions.viteBuild]',
                                params: {
                                    lib: true,
                                },
                            },
                            // docBuild: '[config.frontstack.actions.docBuild]',
                            // docmapBuild: '[config.frontstack.actions.docmapBuild]',
                        },
                    },
                },
            },
        },
        actions: {
            frontendServer: {
                id: 'frontendServer',
                title: 'Frontend server',
                description: 'Frontend server using the @coffeekraken/s-frontend-server package',
                process: 'sugar frontendServer.start',
                params: {},
                settings: {
                    processManager: {
                        restart: true,
                    },
                },
            },
            postcssBuild: {
                id: 'postcssBuild',
                title: 'PostCSS build action',
                description: 'Build css using the amazing PostCSS package',
                process: 'sugar postcss.build',
                params: {},
                settings: {
                    processManager: {
                        restart: true,
                    },
                },
            },
            imagesBuild: {
                id: 'imagesBuild',
                title: 'Images build action',
                description: 'Build your images with ease. Compress, resize, webp version, etc...',
                process: 'sugar images.build',
                params: {},
                settings: {
                    processManager: {
                        restart: true,
                    },
                },
            },
            vite: {
                id: 'vite',
                title: 'Vite development stack',
                description: 'Allow to build files easily while developing',
                process: 'sugar vite',
                params: {},
                settings: {
                    processManager: {
                        restart: true,
                    },
                },
            },
            viteBuild: {
                id: 'viteBuild',
                title: 'Vite build stack',
                description: 'Allow to compile javascript (js, ts, riot, react, etc...) files easily',
                process: 'sugar vite.build',
                params: {},
                settings: {
                    processManager: {
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
                        restart: true,
                    },
                },
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzdGFjay5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcm9udHN0YWNrLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFMUIsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDO0FBRXpCLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRyxFQUFFLE1BQU07SUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBQ3BDLE9BQU87UUFDSCxNQUFNO1FBRU4sT0FBTyxFQUFFLEVBQUU7UUFFWCxPQUFPLEVBQUU7WUFDTCxPQUFPLEVBQUU7Z0JBQ0wsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLFdBQVcsRUFBRSw4QkFBOEI7Z0JBQzNDLFdBQVcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxFQUFFLHVCQUF1QixDQUFDO2dCQUNsRSxZQUFZLEVBQUUsS0FBSztnQkFDbkIsV0FBVyxFQUFFO29CQUNULEdBQUcsRUFBRTt3QkFDRCxXQUFXLEVBQUUsNkJBQTZCO3dCQUMxQyxPQUFPLEVBQUU7NEJBQ0wsY0FBYyxFQUFFLDRDQUE0Qzs0QkFDNUQsSUFBSSxFQUFFLGtDQUFrQzt5QkFDM0M7cUJBQ0o7b0JBQ0QsSUFBSSxFQUFFO3dCQUNGLFdBQVcsRUFBRSxvQ0FBb0M7d0JBQ2pELFlBQVksRUFBRTs0QkFDVixHQUFHLEVBQUUsWUFBWTt5QkFDcEI7d0JBQ0QsT0FBTyxFQUFFOzRCQUNMLGNBQWMsRUFBRSw0Q0FBNEM7eUJBQy9EO3FCQUNKO29CQUNELEtBQUssRUFBRTt3QkFDSCxXQUFXLEVBQUUsZ0RBQWdEO3dCQUM3RCxPQUFPLEVBQUU7NEJBQ0wsWUFBWSxFQUFFLDBDQUEwQzs0QkFDeEQsU0FBUyxFQUFFLHVDQUF1Qzs0QkFDbEQsV0FBVyxFQUFFLHlDQUF5Qzs0QkFD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