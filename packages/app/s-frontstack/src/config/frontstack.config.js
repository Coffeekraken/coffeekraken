import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __path from 'path';
const recipe = 'default';
export default {
    recipe,
    exclude: [],
    recipes: {
        default: {
            title: 'Default',
            description: 'Default s-frontstack recipe ',
            templateDir: __path.resolve(`${__dirname()}/../templates/default`),
            defaultStack: 'dev',
            stacks: {
                dev: {
                    description: 'Start the development stack',
                    actions: {
                        frontendServer: '[config.frontstack.actions.frontendServer]',
                        vite: '[config.frontstack.actions.vite]'
                    }
                },
                prod: {
                    description: 'Start the production testing stack',
                    sharedParams: {
                        env: 'production'
                    },
                    actions: {
                        frontendServer: '[config.frontstack.actions.frontendServer]'
                    }
                },
                build: {
                    description: 'Build your final production ready dist package',
                    actions: {
                        postcssBuild: '[config.frontstack.actions.postcssBuild]',
                        viteBuild: '[config.frontstack.actions.viteBuild]',
                        imagesBuild: '[config.frontstack.actions.imagesBuild]',
                        docBuild: '[config.frontstack.actions.docBuild]',
                        docmapBuild: '[config.frontstack.actions.docmapBuild]'
                    }
                }
            }
        },
        vueComponent: {
            title: 'Vuejs component',
            description: 'Vuejs (web)component recipe',
            templateDir: __path.resolve(`${__dirname()}/../templates/vueComponent`),
            defaultStack: 'dev',
            stacks: {
                dev: {
                    description: 'Start the development stack',
                    actions: {
                        vite: '[config.frontstack.actions.vite]'
                    }
                },
                build: {
                    description: 'Build your final production ready dist package',
                    actions: {
                        viteBuild: {
                            action: '[config.frontstack.actions.viteBuild]',
                            params: {
                                lib: true
                            }
                        },
                        docBuild: '[config.frontstack.actions.docBuild]',
                        docmapBuild: '[config.frontstack.actions.docmapBuild]'
                    }
                }
            }
        }
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
                    restart: true
                }
            }
        },
        postcssBuild: {
            id: 'postcssBuild',
            title: 'PostCSS build action',
            description: 'Build css using the amazing PostCSS package',
            process: 'sugar postcss.build',
            params: {},
            settings: {
                processManager: {
                    restart: true
                }
            }
        },
        imagesBuild: {
            id: 'imagesBuild',
            title: 'Images build action',
            description: 'Build your images with ease. Compress, resize, webp version, etc...',
            process: 'sugar images.build',
            params: {},
            settings: {
                processManager: {
                    restart: true
                }
            }
        },
        vite: {
            id: 'vite',
            title: 'Vite development stack',
            description: 'Allow to build files easily while developing',
            process: 'sugar vite',
            params: {},
            settings: {
                processManager: {
                    restart: true
                }
            }
        },
        viteBuild: {
            id: 'viteBuild',
            title: 'Vite build stack',
            description: 'Allow to compile javascript (js, ts, riot, react, etc...) files easily',
            process: 'sugar vite.build',
            params: {},
            settings: {
                processManager: {
                    restart: true
                }
            }
        },
        docBuild: {
            id: 'docBuild',
            title: 'Markdown doc build stack',
            description: 'Allow to build markdown documentation with special features files easily. Take care of src/README and src/doc/**/*.md files',
            process: 'sugar markdown.build -p readme -p doc',
            params: {},
            settings: {
                processManager: {
                    restart: true
                }
            }
        },
        docmapBuild: {
            id: 'docmapBuild',
            title: 'Docmap build action',
            description: 'Allow to build and maintain up to date the docmap.json file',
            process: 'sugar docmap.build --noExtends',
            params: {},
            settings: {
                processManager: {
                    restart: true
                }
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzdGFjay5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcm9udHN0YWNrLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFMUIsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDO0FBRXpCLGVBQWU7SUFDYixNQUFNO0lBRU4sT0FBTyxFQUFFLEVBQUU7SUFFWCxPQUFPLEVBQUU7UUFDUCxPQUFPLEVBQUU7WUFDUCxLQUFLLEVBQUUsU0FBUztZQUNoQixXQUFXLEVBQUUsOEJBQThCO1lBQzNDLFdBQVcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxFQUFFLHVCQUF1QixDQUFDO1lBQ2xFLFlBQVksRUFBRSxLQUFLO1lBQ25CLE1BQU0sRUFBRTtnQkFDTixHQUFHLEVBQUU7b0JBQ0gsV0FBVyxFQUFFLDZCQUE2QjtvQkFDMUMsT0FBTyxFQUFFO3dCQUNQLGNBQWMsRUFBRSw0Q0FBNEM7d0JBQzVELElBQUksRUFBRSxrQ0FBa0M7cUJBQ3pDO2lCQUNGO2dCQUNELElBQUksRUFBRTtvQkFDSixXQUFXLEVBQUUsb0NBQW9DO29CQUNqRCxZQUFZLEVBQUU7d0JBQ1osR0FBRyxFQUFFLFlBQVk7cUJBQ2xCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxjQUFjLEVBQUUsNENBQTRDO3FCQUM3RDtpQkFDRjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsV0FBVyxFQUFFLGdEQUFnRDtvQkFDN0QsT0FBTyxFQUFFO3dCQUNQLFlBQVksRUFBRSwwQ0FBMEM7d0JBQ3hELFNBQVMsRUFBRSx1Q0FBdUM7d0JBQ2xELFdBQVcsRUFBRSx5Q0FBeUM7d0JBQ3RELFFBQVEsRUFBRSxzQ0FBc0M7d0JBQ2hELFdBQVcsRUFBRSx5Q0FBeUM7cUJBQ3ZEO2lCQUNGO2FBQ0Y7U0FDRjtRQUNELFlBQVksRUFBRTtZQUNaLEtBQUss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