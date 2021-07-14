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
                        docmapBuild: '[config.frontstack.actions.docmapBuild]'
                    }
                }
            }
        },
        riotComponent: {
            title: 'RiotJs component',
            description: 'RiotJs webcomponent recipe',
            templateDir: __path.resolve(`${__dirname()}/../templates/riotComponent`),
            defaultStack: 'dev',
            stacks: {
                dev: {
                    description: 'Start the development stack',
                    actions: {
                        frontendServer: '[config.frontstack.actions.frontendServer]',
                        vite: '[config.frontstack.actions.vite]'
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
            settings: {
                processManager: {
                    restart: true
                }
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzdGFjay5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcm9udHN0YWNrLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFMUIsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDO0FBRXpCLGVBQWU7SUFDYixNQUFNO0lBRU4sT0FBTyxFQUFFLEVBQUU7SUFFWCxPQUFPLEVBQUU7UUFDUCxPQUFPLEVBQUU7WUFDUCxLQUFLLEVBQUUsU0FBUztZQUNoQixXQUFXLEVBQUUsOEJBQThCO1lBQzNDLFdBQVcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxFQUFFLHVCQUF1QixDQUFDO1lBQ2xFLFlBQVksRUFBRSxLQUFLO1lBQ25CLE1BQU0sRUFBRTtnQkFDTixHQUFHLEVBQUU7b0JBQ0gsV0FBVyxFQUFFLDZCQUE2QjtvQkFDMUMsT0FBTyxFQUFFO3dCQUNQLGNBQWMsRUFBRSw0Q0FBNEM7d0JBQzVELElBQUksRUFBRSxrQ0FBa0M7cUJBQ3pDO2lCQUNGO2dCQUNELElBQUksRUFBRTtvQkFDSixXQUFXLEVBQUUsb0NBQW9DO29CQUNqRCxZQUFZLEVBQUU7d0JBQ1osR0FBRyxFQUFFLFlBQVk7cUJBQ2xCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxjQUFjLEVBQUUsNENBQTRDO3FCQUM3RDtpQkFDRjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsV0FBVyxFQUFFLGdEQUFnRDtvQkFDN0QsT0FBTyxFQUFFO3dCQUNQLFlBQVksRUFBRSwwQ0FBMEM7d0JBQ3hELFNBQVMsRUFBRSx1Q0FBdUM7d0JBQ2xELFdBQVcsRUFBRSx5Q0FBeUM7d0JBQ3RELFdBQVcsRUFBRSx5Q0FBeUM7cUJBQ3ZEO2lCQUNGO2FBQ0Y7U0FDRjtRQUNELGFBQWEsRUFBRTtZQUNiLEtBQUssRUFBRSxrQkFBa0I7WUFDekIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxXQUFXLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsRUFBRSw2QkFBNkIsQ0FBQztZQUN4RSxZQUFZLEVBQUUsS0FBSztZQUNuQixNQUFNLEVBQUU7Z0JBQ04sR0FBRyxFQUFFO29CQUNILFdBQVcsRUFBRSw2QkFBNkI7b0JBQzFDLE9BQU8sRUFBRTt3QkFDUCxjQUFjLEVBQUUsNENBQTRDO3dCQUM1RCxJQUFJLEVBQUUsa0NBQWtDO3FCQUN6QztpQkFDRjthQUNGO1NBQ0Y7S0FDRjtJQUVELE9BQU8sRUFBRTtRQUNQLGNBQWMsRUFBRTtZQUNkLEVBQUUsRUFBRSxnQkFBZ0I7WUFDcEIsS0FBSyxFQUFFLGlCQUFpQjtZQUN4QixXQUFXLEVBQ1QsbUVBQW1FO1lBQ3JFLE9BQU8sRUFBRSw0QkFBNEI7WUFDckMsUUFBUSxFQUFFO2dCQUNSLGNBQWMsRUFBRTtvQkFDZCxPQUFPLEVBQUUsSUFBSTtpQkFDZDthQUNGO1NBQ0Y7UUFDRCxZQUFZLEVBQUU7WUFDWixFQUFFLEVBQUUsY0FBYztZQUNsQixLQUFLLEVBQUUsc0JBQXNCO1lBQzdCLFdBQVcsRUFBRSw2Q0FBNkM7WUFDMUQsT0FBTyxFQUFFLHFCQUFxQjtZQUM5QixRQUFRLEVBQUU7Z0JBQ1IsY0FBYyxFQUFFO29CQUNkLE9BQU8sRUFBRSxJQUFJO2lCQUNkO2FBQ0Y7U0FDRjtRQUNELFdBQVcsRUFBRTtZQUNYLEVBQUUsRUFBRSxhQUFhO1lBQ2pCLEtBQUssRUFBRSxxQkFBcUI7WUFDNUIsV0FBVyxFQUFFLHFFQUFxRTtZQUNsRixPQUFPLEVBQUUsb0JBQW9CO1lBQzdCLFFBQVEsRUFBRTtnQkFDUixjQUFjLEVBQUU7b0JBQ2QsT0FBTyxFQUFFLElBQUk7aUJBQ2Q7YUFDRjtTQUNGO1FBQ0QsSUFBSSxFQUFFO1lBQ0osRUFBRSxFQUFFLE1BQU07WUFDVixLQUFLLEVBQUUsd0JBQXdCO1lBQy9CLFdBQVcsRUFBRSw4Q0FBOEM7WUFDM0QsT0FBTyxFQUFFLFlBQVk7WUFDckIsUUFBUSxFQUFFO2dCQUNSLGNBQWMsRUFBRTtvQkFDZCxPQUFPLEVBQUUsSUFBSTtpQkFDZDthQUNGO1NBQ0Y7UUFDRCxTQUFTLEVBQUU7WUFDVCxFQUFFLEVBQUUsV0FBVztZQUNmLEtBQUssRUFBRSxrQkFBa0I7WUFDekIsV0FBVyxFQUFFLHdFQUF3RTtZQUNyRixPQUFPLEVBQUUsa0JBQWtCO1lBQzNCLFFBQVEsRUFBRTtnQkFDUixjQUFjLEVBQUU7b0JBQ2QsT0FBTyxFQUFFLElBQUk7aUJBQ2Q7YUFDRjtTQUNGO1FBQ0QsV0FBVyxFQUFFO1lBQ1gsRUFBRSxFQUFFLGFBQWE7WUFDakIsS0FBSyxFQUFFLHFCQUFxQjtZQUM1QixXQUFXLEVBQ1QsNkRBQTZEO1lBQy9ELE9BQU8sRUFBRSxnQ0FBZ0M7WUFDekMsUUFBUSxFQUFFO2dCQUNSLGNBQWMsRUFBRTtvQkFDZCxPQUFPLEVBQUUsSUFBSTtpQkFDZDthQUNGO1NBQ0Y7S0FDRjtDQUNGLENBQUMifQ==