import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __fs from 'fs';
let receipe = 'default';
if (__fs.existsSync(`${__packageRoot()}/sugar.json`)) {
    const sugarJson = require(`${__packageRoot()}/sugar.json`);
    if (sugarJson.receipe)
        receipe = sugarJson.receipe;
}
export default {
    receipe,
    exclude: [],
    receipes: {
        default: {
            title: 'Default',
            description: 'Default s-frontstack receipe ',
            stacks: {
                dev: {
                    description: 'Start the development stack',
                    actions: {
                        frontendServer: '[config.frontstack.actions.frontendServer]',
                        css: '[config.frontstack.actions.css]',
                        js: '[config.frontstack.actions.js]',
                        ts: '[config.frontstack.actions.ts]',
                        svelte: '[config.frontstack.actions.svelte]',
                        docmap: '[config.frontstack.actions.docmap]'
                    }
                },
                build: {
                    description: 'Build your final production ready dist package',
                    actions: {}
                }
            }
        },
        riotjsComponent: {
            title: 'RiotJs component',
            description: 'RiotJs webcomponent receipe',
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
        css: {
            id: 'css',
            title: 'PostCSS compile action',
            description: 'Compile css using the amazing PostCSS package',
            process: 'sugard postcss.compile -w',
            settings: {
                processManager: {
                    restart: true
                }
            }
        },
        js: {
            id: 'js',
            title: 'Javascript compile action',
            description: 'Allow to compile .js files easily',
            process: 'sugard js.compile -w',
            settings: {
                processManager: {
                    restart: true
                }
            }
        },
        ts: {
            id: 'ts',
            title: 'Typescript compile action',
            description: 'Allow to compile .ts files easily',
            process: 'sugard ts.compile -w',
            settings: {
                processManager: {
                    restart: true
                }
            }
        },
        vite: {
            id: 'vite',
            title: 'Vite development stack',
            description: 'Allow to compile files easily',
            process: 'sugard vite',
            settings: {
                processManager: {
                    restart: true
                }
            }
        },
        svelte: {
            id: 'svelte',
            title: 'Svelte compile action',
            description: 'Allow to compile .svelte files easily',
            process: 'sugard svelte.compile -w',
            settings: {
                processManager: {
                    restart: true
                }
            }
        },
        docmap: {
            id: 'docmap',
            title: 'Docmap generation action',
            description: 'Allow to generate and maintain up to date the docmap.json file',
            process: 'sugard docmap.generate --watch',
            settings: {
                processManager: {
                    restart: true
                }
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzdGFjay5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcm9udHN0YWNrLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFFdEIsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDO0FBQ3hCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLGFBQWEsRUFBRSxhQUFhLENBQUMsRUFBRTtJQUNwRCxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDM0QsSUFBSSxTQUFTLENBQUMsT0FBTztRQUFFLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDO0NBQ3BEO0FBRUQsZUFBZTtJQUNiLE9BQU87SUFFUCxPQUFPLEVBQUUsRUFBRTtJQUVYLFFBQVEsRUFBRTtRQUNSLE9BQU8sRUFBRTtZQUNQLEtBQUssRUFBRSxTQUFTO1lBQ2hCLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsTUFBTSxFQUFFO2dCQUNOLEdBQUcsRUFBRTtvQkFDSCxXQUFXLEVBQUUsNkJBQTZCO29CQUMxQyxPQUFPLEVBQUU7d0JBQ1AsY0FBYyxFQUFFLDRDQUE0Qzt3QkFDNUQsR0FBRyxFQUFFLGlDQUFpQzt3QkFDdEMsRUFBRSxFQUFFLGdDQUFnQzt3QkFDcEMsRUFBRSxFQUFFLGdDQUFnQzt3QkFDcEMsTUFBTSxFQUFFLG9DQUFvQzt3QkFDNUMsTUFBTSxFQUFFLG9DQUFvQztxQkFDN0M7aUJBQ0Y7Z0JBQ0QsS0FBSyxFQUFFO29CQUNMLFdBQVcsRUFBRSxnREFBZ0Q7b0JBQzdELE9BQU8sRUFBRSxFQUFFO2lCQUNaO2FBQ0Y7U0FDRjtRQUNELGVBQWUsRUFBRTtZQUNmLEtBQUssRUFBRSxrQkFBa0I7WUFDekIsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxNQUFNLEVBQUU7Z0JBQ04sR0FBRyxFQUFFO29CQUNILFdBQVcsRUFBRSw2QkFBNkI7b0JBQzFDLE9BQU8sRUFBRTt3QkFDUCxjQUFjLEVBQUUsNENBQTRDO3dCQUM1RCxJQUFJLEVBQUUsa0NBQWtDO3dCQUN4QywrQ0FBK0M7cUJBQ2hEO2lCQUNGO2FBQ0Y7U0FDRjtLQUNGO0lBRUQsT0FBTyxFQUFFO1FBQ1AsY0FBYyxFQUFFO1lBQ2QsRUFBRSxFQUFFLGdCQUFnQjtZQUNwQixLQUFLLEVBQUUsaUJBQWlCO1lBQ3hCLFdBQVcsRUFDVCxtRUFBbUU7WUFDckUsT0FBTyxFQUFFLDZCQUE2QjtZQUN0QyxRQUFRLEVBQUU7Z0JBQ1IsY0FBYyxFQUFFO29CQUNkLE9BQU8sRUFBRSxJQUFJO2lCQUNkO2FBQ0Y7U0FDRjtRQUNELEdBQUcsRUFBRTtZQUNILEVBQUUsRUFBRSxLQUFLO1lBQ1QsS0FBSyxFQUFFLHdCQUF3QjtZQUMvQixXQUFXLEVBQUUsK0NBQStDO1lBQzVELE9BQU8sRUFBRSwyQkFBMkI7WUFDcEMsUUFBUSxFQUFFO2dCQUNSLGNBQWMsRUFBRTtvQkFDZCxPQUFPLEVBQUUsSUFBSTtpQkFDZDthQUNGO1NBQ0Y7UUFDRCxFQUFFLEVBQUU7WUFDRixFQUFFLEVBQUUsSUFBSTtZQUNSLEtBQUssRUFBRSwyQkFBMkI7WUFDbEMsV0FBVyxFQUFFLG1DQUFtQztZQUNoRCxPQUFPLEVBQUUsc0JBQXNCO1lBQy9CLFFBQVEsRUFBRTtnQkFDUixjQUFjLEVBQUU7b0JBQ2QsT0FBTyxFQUFFLElBQUk7aUJBQ2Q7YUFDRjtTQUNGO1FBQ0QsRUFBRSxFQUFFO1lBQ0YsRUFBRSxFQUFFLElBQUk7WUFDUixLQUFLLEVBQUUsMkJBQTJCO1lBQ2xDLFdBQVcsRUFBRSxtQ0FBbUM7WUFDaEQsT0FBTyxFQUFFLHNCQUFzQjtZQUMvQixRQUFRLEVBQUU7Z0JBQ1IsY0FBYyxFQUFFO29CQUNkLE9BQU8sRUFBRSxJQUFJO2lCQUNkO2FBQ0Y7U0FDRjtRQUNELElBQUksRUFBRTtZQUNKLEVBQUUsRUFBRSxNQUFNO1lBQ1YsS0FBSyxFQUFFLHdCQUF3QjtZQUMvQixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLE9BQU8sRUFBRSxhQUFhO1lBQ3RCLFFBQVEsRUFBRTtnQkFDUixjQUFjLEVBQUU7b0JBQ2QsT0FBTyxFQUFFLElBQUk7aUJBQ2Q7YUFDRjtTQUNGO1FBQ0QsTUFBTSxFQUFFO1lBQ04sRUFBRSxFQUFFLFFBQVE7WUFDWixLQUFLLEVBQUUsdUJBQXVCO1lBQzlCLFdBQVcsRUFBRSx1Q0FBdUM7WUFDcEQsT0FBTyxFQUFFLDBCQUEwQjtZQUNuQyxRQUFRLEVBQUU7Z0JBQ1IsY0FBYyxFQUFFO29CQUNkLE9BQU8sRUFBRSxJQUFJO2lCQUNkO2FBQ0Y7U0FDRjtRQUNELE1BQU0sRUFBRTtZQUNOLEVBQUUsRUFBRSxRQUFRO1lBQ1osS0FBSyxFQUFFLDBCQUEwQjtZQUNqQyxXQUFXLEVBQ1QsZ0VBQWdFO1lBQ2xFLE9BQU8sRUFBRSxnQ0FBZ0M7WUFDekMsUUFBUSxFQUFFO2dCQUNSLGNBQWMsRUFBRTtvQkFDZCxPQUFPLEVBQUUsSUFBSTtpQkFDZDthQUNGO1NBQ0Y7S0FDRjtDQUNGLENBQUMifQ==