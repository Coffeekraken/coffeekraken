import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import __fs from 'fs';
import __path from 'path';
let recipe = 'default';
if (__fs.existsSync(`${__packageRootDir()}/sugar.json`)) {
    const sugarJson = require(`${__packageRootDir()}/sugar.json`);
    if (sugarJson.recipe)
        recipe = sugarJson.recipe;
}
export default {
    recipe,
    exclude: [],
    recipes: {
        default: {
            title: 'Default',
            description: 'Default s-frontstack recipe ',
            templateDir: __path.resolve(`${__dirname}/../templates/default`),
            defaultStack: 'dev',
            stacks: {
                dev: {
                    description: 'Start the development stack',
                    actions: {
                        frontendServer: '[config.frontstack.actions.frontendServer]',
                        vite: '[config.frontstack.actions.vite]'
                    }
                },
                build: {
                    description: 'Build your final production ready dist package',
                    actions: {
                        postcssBuild: '[config.frontstack.actions.postcssBuild]',
                        viteBuild: '[config.frontstack.actions.viteBuild]',
                        docmapBuild: '[config.frontstack.actions.docmapBuild]'
                    }
                }
            }
        },
        riotComponent: {
            title: 'RiotJs component',
            description: 'RiotJs webcomponent recipe',
            templateDir: __path.resolve(`${__dirname}/../templates/riotComponent`),
            defaultStack: 'dev',
            stacks: {
                dev: {
                    description: 'Start the development stack',
                    actions: {
                        frontendServer: '[config.frontstack.actions.frontendServer]',
                        vite: '[config.frontstack.actions.vite]'
                        // docmap: '[config.frontstack.actions.docmap]'
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
            process: 'sugard frontendServer.start',
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
            process: 'sugard postcss.build',
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
            process: 'sugard vite',
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
            process: 'sugard vite.build',
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
            process: 'sugard docmap.build --noExtends',
            settings: {
                processManager: {
                    restart: true
                }
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzdGFjay5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcm9udHN0YWNrLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLGdCQUFnQixNQUFNLDhDQUE4QyxDQUFDO0FBQzVFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFMUIsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDO0FBQ3ZCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLGdCQUFnQixFQUFFLGFBQWEsQ0FBQyxFQUFFO0lBQ3ZELE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLGdCQUFnQixFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQzlELElBQUksU0FBUyxDQUFDLE1BQU07UUFBRSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztDQUNqRDtBQUVELGVBQWU7SUFDYixNQUFNO0lBRU4sT0FBTyxFQUFFLEVBQUU7SUFFWCxPQUFPLEVBQUU7UUFDUCxPQUFPLEVBQUU7WUFDUCxLQUFLLEVBQUUsU0FBUztZQUNoQixXQUFXLEVBQUUsOEJBQThCO1lBQzNDLFdBQVcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyx1QkFBdUIsQ0FBQztZQUNoRSxZQUFZLEVBQUUsS0FBSztZQUNuQixNQUFNLEVBQUU7Z0JBQ04sR0FBRyxFQUFFO29CQUNILFdBQVcsRUFBRSw2QkFBNkI7b0JBQzFDLE9BQU8sRUFBRTt3QkFDUCxjQUFjLEVBQUUsNENBQTRDO3dCQUM1RCxJQUFJLEVBQUUsa0NBQWtDO3FCQUN6QztpQkFDRjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsV0FBVyxFQUFFLGdEQUFnRDtvQkFDN0QsT0FBTyxFQUFFO3dCQUNQLFlBQVksRUFBRSwwQ0FBMEM7d0JBQ3hELFNBQVMsRUFBRSx1Q0FBdUM7d0JBQ2xELFdBQVcsRUFBRSx5Q0FBeUM7cUJBQ3ZEO2lCQUNGO2FBQ0Y7U0FDRjtRQUNELGFBQWEsRUFBRTtZQUNiLEtBQUssRUFBRSxrQkFBa0I7WUFDekIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxXQUFXLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsNkJBQTZCLENBQUM7WUFDdEUsWUFBWSxFQUFFLEtBQUs7WUFDbkIsTUFBTSxFQUFFO2dCQUNOLEdBQUcsRUFBRTtvQkFDSCxXQUFXLEVBQUUsNkJBQTZCO29CQUMxQyxPQUFPLEVBQUU7d0JBQ1AsY0FBYyxFQUFFLDRDQUE0Qzt3QkFDNUQsSUFBSSxFQUFFLGtDQUFrQzt3QkFDeEMsK0NBQStDO3FCQUNoRDtpQkFDRjthQUNGO1NBQ0Y7S0FDRjtJQUVELE9BQU8sRUFBRTtRQUNQLGNBQWMsRUFBRTtZQUNkLEVBQUUsRUFBRSxnQkFBZ0I7WUFDcEIsS0FBSyxFQUFFLGlCQUFpQjtZQUN4QixXQUFXLEVBQ1QsbUVBQW1FO1lBQ3JFLE9BQU8sRUFBRSw2QkFBNkI7WUFDdEMsUUFBUSxFQUFFO2dCQUNSLGNBQWMsRUFBRTtvQkFDZCxPQUFPLEVBQUUsSUFBSTtpQkFDZDthQUNGO1NBQ0Y7UUFDRCxZQUFZLEVBQUU7WUFDWixFQUFFLEVBQUUsY0FBYztZQUNsQixLQUFLLEVBQUUsc0JBQXNCO1lBQzdCLFdBQVcsRUFBRSw2Q0FBNkM7WUFDMUQsT0FBTyxFQUFFLHNCQUFzQjtZQUMvQixRQUFRLEVBQUU7Z0JBQ1IsY0FBYyxFQUFFO29CQUNkLE9BQU8sRUFBRSxJQUFJO2lCQUNkO2FBQ0Y7U0FDRjtRQUNELElBQUksRUFBRTtZQUNKLEVBQUUsRUFBRSxNQUFNO1lBQ1YsS0FBSyxFQUFFLHdCQUF3QjtZQUMvQixXQUFXLEVBQUUsOENBQThDO1lBQzNELE9BQU8sRUFBRSxhQUFhO1lBQ3RCLFFBQVEsRUFBRTtnQkFDUixjQUFjLEVBQUU7b0JBQ2QsT0FBTyxFQUFFLElBQUk7aUJBQ2Q7YUFDRjtTQUNGO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsRUFBRSxFQUFFLFdBQVc7WUFDZixLQUFLLEVBQUUsa0JBQWtCO1lBQ3pCLFdBQVcsRUFBRSx3RUFBd0U7WUFDckYsT0FBTyxFQUFFLG1CQUFtQjtZQUM1QixRQUFRLEVBQUU7Z0JBQ1IsY0FBYyxFQUFFO29CQUNkLE9BQU8sRUFBRSxJQUFJO2lCQUNkO2FBQ0Y7U0FDRjtRQUNELFdBQVcsRUFBRTtZQUNYLEVBQUUsRUFBRSxhQUFhO1lBQ2pCLEtBQUssRUFBRSxxQkFBcUI7WUFDNUIsV0FBVyxFQUNULDZEQUE2RDtZQUMvRCxPQUFPLEVBQUUsaUNBQWlDO1lBQzFDLFFBQVEsRUFBRTtnQkFDUixjQUFjLEVBQUU7b0JBQ2QsT0FBTyxFQUFFLElBQUk7aUJBQ2Q7YUFDRjtTQUNGO0tBQ0Y7Q0FDRixDQUFDIn0=