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
                        vite: '[config.frontstack.actions.vite]'
                        // docmap: '[config.frontstack.actions.docmap]'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzdGFjay5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcm9udHN0YWNrLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFFdEIsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDO0FBQ3hCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLGFBQWEsRUFBRSxhQUFhLENBQUMsRUFBRTtJQUNwRCxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDM0QsSUFBSSxTQUFTLENBQUMsT0FBTztRQUFFLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDO0NBQ3BEO0FBRUQsZUFBZTtJQUNiLE9BQU87SUFFUCxPQUFPLEVBQUUsRUFBRTtJQUVYLFFBQVEsRUFBRTtRQUNSLE9BQU8sRUFBRTtZQUNQLEtBQUssRUFBRSxTQUFTO1lBQ2hCLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsTUFBTSxFQUFFO2dCQUNOLEdBQUcsRUFBRTtvQkFDSCxXQUFXLEVBQUUsNkJBQTZCO29CQUMxQyxPQUFPLEVBQUU7d0JBQ1AsY0FBYyxFQUFFLDRDQUE0Qzt3QkFDNUQsSUFBSSxFQUFFLGtDQUFrQzt3QkFDeEMsK0NBQStDO3FCQUNoRDtpQkFDRjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsV0FBVyxFQUFFLGdEQUFnRDtvQkFDN0QsT0FBTyxFQUFFLEVBQUU7aUJBQ1o7YUFDRjtTQUNGO1FBQ0QsZUFBZSxFQUFFO1lBQ2YsS0FBSyxFQUFFLGtCQUFrQjtZQUN6QixXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLE1BQU0sRUFBRTtnQkFDTixHQUFHLEVBQUU7b0JBQ0gsV0FBVyxFQUFFLDZCQUE2QjtvQkFDMUMsT0FBTyxFQUFFO3dCQUNQLGNBQWMsRUFBRSw0Q0FBNEM7d0JBQzVELElBQUksRUFBRSxrQ0FBa0M7d0JBQ3hDLCtDQUErQztxQkFDaEQ7aUJBQ0Y7YUFDRjtTQUNGO0tBQ0Y7SUFFRCxPQUFPLEVBQUU7UUFDUCxjQUFjLEVBQUU7WUFDZCxFQUFFLEVBQUUsZ0JBQWdCO1lBQ3BCLEtBQUssRUFBRSxpQkFBaUI7WUFDeEIsV0FBVyxFQUNULG1FQUFtRTtZQUNyRSxPQUFPLEVBQUUsNkJBQTZCO1lBQ3RDLFFBQVEsRUFBRTtnQkFDUixjQUFjLEVBQUU7b0JBQ2QsT0FBTyxFQUFFLElBQUk7aUJBQ2Q7YUFDRjtTQUNGO1FBQ0QsR0FBRyxFQUFFO1lBQ0gsRUFBRSxFQUFFLEtBQUs7WUFDVCxLQUFLLEVBQUUsd0JBQXdCO1lBQy9CLFdBQVcsRUFBRSwrQ0FBK0M7WUFDNUQsT0FBTyxFQUFFLDJCQUEyQjtZQUNwQyxRQUFRLEVBQUU7Z0JBQ1IsY0FBYyxFQUFFO29CQUNkLE9BQU8sRUFBRSxJQUFJO2lCQUNkO2FBQ0Y7U0FDRjtRQUNELEVBQUUsRUFBRTtZQUNGLEVBQUUsRUFBRSxJQUFJO1lBQ1IsS0FBSyxFQUFFLDJCQUEyQjtZQUNsQyxXQUFXLEVBQUUsbUNBQW1DO1lBQ2hELE9BQU8sRUFBRSxzQkFBc0I7WUFDL0IsUUFBUSxFQUFFO2dCQUNSLGNBQWMsRUFBRTtvQkFDZCxPQUFPLEVBQUUsSUFBSTtpQkFDZDthQUNGO1NBQ0Y7UUFDRCxFQUFFLEVBQUU7WUFDRixFQUFFLEVBQUUsSUFBSTtZQUNSLEtBQUssRUFBRSwyQkFBMkI7WUFDbEMsV0FBVyxFQUFFLG1DQUFtQztZQUNoRCxPQUFPLEVBQUUsc0JBQXNCO1lBQy9CLFFBQVEsRUFBRTtnQkFDUixjQUFjLEVBQUU7b0JBQ2QsT0FBTyxFQUFFLElBQUk7aUJBQ2Q7YUFDRjtTQUNGO1FBQ0QsSUFBSSxFQUFFO1lBQ0osRUFBRSxFQUFFLE1BQU07WUFDVixLQUFLLEVBQUUsd0JBQXdCO1lBQy9CLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsT0FBTyxFQUFFLGFBQWE7WUFDdEIsUUFBUSxFQUFFO2dCQUNSLGNBQWMsRUFBRTtvQkFDZCxPQUFPLEVBQUUsSUFBSTtpQkFDZDthQUNGO1NBQ0Y7UUFDRCxNQUFNLEVBQUU7WUFDTixFQUFFLEVBQUUsUUFBUTtZQUNaLEtBQUssRUFBRSx1QkFBdUI7WUFDOUIsV0FBVyxFQUFFLHVDQUF1QztZQUNwRCxPQUFPLEVBQUUsMEJBQTBCO1lBQ25DLFFBQVEsRUFBRTtnQkFDUixjQUFjLEVBQUU7b0JBQ2QsT0FBTyxFQUFFLElBQUk7aUJBQ2Q7YUFDRjtTQUNGO1FBQ0QsTUFBTSxFQUFFO1lBQ04sRUFBRSxFQUFFLFFBQVE7WUFDWixLQUFLLEVBQUUsMEJBQTBCO1lBQ2pDLFdBQVcsRUFDVCxnRUFBZ0U7WUFDbEUsT0FBTyxFQUFFLGdDQUFnQztZQUN6QyxRQUFRLEVBQUU7Z0JBQ1IsY0FBYyxFQUFFO29CQUNkLE9BQU8sRUFBRSxJQUFJO2lCQUNkO2FBQ0Y7U0FDRjtLQUNGO0NBQ0YsQ0FBQyJ9