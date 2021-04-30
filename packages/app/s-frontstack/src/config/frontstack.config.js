"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
exports.default = {
    receipe: 'default',
    exclude: [],
    receipes: {
        default: {
            title: 'Default',
            description: 'Default s-frontstack receipe ',
            actions: {
                frontendServer: '[config.frontstack.actions.frontendServer]',
                css: '[config.frontstack.actions.css]',
                js: '[config.frontstack.actions.js]',
                ts: '[config.frontstack.actions.ts]',
                svelte: '[config.frontstack.actions.svelte]',
                docmap: '[config.frontstack.actions.docmap]'
            }
        },
        svelteComponent: {
            title: 'Svelte webcomponent',
            description: 'Svelte webcomponent receipe ',
            actions: {
                frontendServer: '[config.frontstack.actions.frontendServer]',
                js: '[config.frontstack.actions.js]',
                jsBundle: '[config.frontstack.actions.jsBundle]',
                ts: '[config.frontstack.actions.ts]',
                svelte: '[config.frontstack.actions.svelte]'
                // docmap: '[config.frontstack.actions.docmap]'
            }
        },
        react: {}
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
            process: 'sugard js.compile  -w',
            settings: {
                processManager: {
                    restart: true
                }
            }
        },
        jsBundle: {
            id: 'jsBundle',
            title: 'Javascript bundle action',
            description: 'Allow to compile .js files easily into a bundle file',
            process: `sugard js.compile ${s_sugar_config_1.default('storage.srcDir').replace(s_sugar_config_1.default('storage.rootDir') + '/', '')}/js/index.js -b -w`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzdGFjay5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcm9udHN0YWNrLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtGQUF5RDtBQUV6RCxrQkFBZTtJQUNiLE9BQU8sRUFBRSxTQUFTO0lBRWxCLE9BQU8sRUFBRSxFQUFFO0lBRVgsUUFBUSxFQUFFO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsS0FBSyxFQUFFLFNBQVM7WUFDaEIsV0FBVyxFQUFFLCtCQUErQjtZQUM1QyxPQUFPLEVBQUU7Z0JBQ1AsY0FBYyxFQUFFLDRDQUE0QztnQkFDNUQsR0FBRyxFQUFFLGlDQUFpQztnQkFDdEMsRUFBRSxFQUFFLGdDQUFnQztnQkFDcEMsRUFBRSxFQUFFLGdDQUFnQztnQkFDcEMsTUFBTSxFQUFFLG9DQUFvQztnQkFDNUMsTUFBTSxFQUFFLG9DQUFvQzthQUM3QztTQUNGO1FBQ0QsZUFBZSxFQUFFO1lBQ2YsS0FBSyxFQUFFLHFCQUFxQjtZQUM1QixXQUFXLEVBQUUsOEJBQThCO1lBQzNDLE9BQU8sRUFBRTtnQkFDUCxjQUFjLEVBQUUsNENBQTRDO2dCQUM1RCxFQUFFLEVBQUUsZ0NBQWdDO2dCQUNwQyxRQUFRLEVBQUUsc0NBQXNDO2dCQUNoRCxFQUFFLEVBQUUsZ0NBQWdDO2dCQUNwQyxNQUFNLEVBQUUsb0NBQW9DO2dCQUM1QywrQ0FBK0M7YUFDaEQ7U0FDRjtRQUVELEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFFRCxPQUFPLEVBQUU7UUFDUCxjQUFjLEVBQUU7WUFDZCxFQUFFLEVBQUUsZ0JBQWdCO1lBQ3BCLEtBQUssRUFBRSxpQkFBaUI7WUFDeEIsV0FBVyxFQUNULG1FQUFtRTtZQUNyRSxPQUFPLEVBQUUsNkJBQTZCO1lBQ3RDLFFBQVEsRUFBRTtnQkFDUixjQUFjLEVBQUU7b0JBQ2QsT0FBTyxFQUFFLElBQUk7aUJBQ2Q7YUFDRjtTQUNGO1FBQ0QsR0FBRyxFQUFFO1lBQ0gsRUFBRSxFQUFFLEtBQUs7WUFDVCxLQUFLLEVBQUUsd0JBQXdCO1lBQy9CLFdBQVcsRUFBRSwrQ0FBK0M7WUFDNUQsT0FBTyxFQUFFLDJCQUEyQjtZQUNwQyxRQUFRLEVBQUU7Z0JBQ1IsY0FBYyxFQUFFO29CQUNkLE9BQU8sRUFBRSxJQUFJO2lCQUNkO2FBQ0Y7U0FDRjtRQUNELEVBQUUsRUFBRTtZQUNGLEVBQUUsRUFBRSxJQUFJO1lBQ1IsS0FBSyxFQUFFLDJCQUEyQjtZQUNsQyxXQUFXLEVBQUUsbUNBQW1DO1lBQ2hELE9BQU8sRUFBRSx1QkFBdUI7WUFDaEMsUUFBUSxFQUFFO2dCQUNSLGNBQWMsRUFBRTtvQkFDZCxPQUFPLEVBQUUsSUFBSTtpQkFDZDthQUNGO1NBQ0Y7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLEVBQUUsVUFBVTtZQUNkLEtBQUssRUFBRSwwQkFBMEI7WUFDakMsV0FBVyxFQUFFLHNEQUFzRDtZQUNuRSxPQUFPLEVBQUUscUJBQXFCLHdCQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLENBQ25FLHdCQUFhLENBQUMsaUJBQWlCLENBQUMsR0FBRyxHQUFHLEVBQ3RDLEVBQUUsQ0FDSCxvQkFBb0I7WUFDckIsUUFBUSxFQUFFO2dCQUNSLGNBQWMsRUFBRTtvQkFDZCxPQUFPLEVBQUUsSUFBSTtpQkFDZDthQUNGO1NBQ0Y7UUFDRCxFQUFFLEVBQUU7WUFDRixFQUFFLEVBQUUsSUFBSTtZQUNSLEtBQUssRUFBRSwyQkFBMkI7WUFDbEMsV0FBVyxFQUFFLG1DQUFtQztZQUNoRCxPQUFPLEVBQUUsc0JBQXNCO1lBQy9CLFFBQVEsRUFBRTtnQkFDUixjQUFjLEVBQUU7b0JBQ2QsT0FBTyxFQUFFLElBQUk7aUJBQ2Q7YUFDRjtTQUNGO1FBQ0QsTUFBTSxFQUFFO1lBQ04sRUFBRSxFQUFFLFFBQVE7WUFDWixLQUFLLEVBQUUsdUJBQXVCO1lBQzlCLFdBQVcsRUFBRSx1Q0FBdUM7WUFDcEQsT0FBTyxFQUFFLDBCQUEwQjtZQUNuQyxRQUFRLEVBQUU7Z0JBQ1IsY0FBYyxFQUFFO29CQUNkLE9BQU8sRUFBRSxJQUFJO2lCQUNkO2FBQ0Y7U0FDRjtRQUNELE1BQU0sRUFBRTtZQUNOLEVBQUUsRUFBRSxRQUFRO1lBQ1osS0FBSyxFQUFFLDBCQUEwQjtZQUNqQyxXQUFXLEVBQ1QsZ0VBQWdFO1lBQ2xFLE9BQU8sRUFBRSxnQ0FBZ0M7WUFDekMsUUFBUSxFQUFFO2dCQUNSLGNBQWMsRUFBRTtvQkFDZCxPQUFPLEVBQUUsSUFBSTtpQkFDZDthQUNGO1NBQ0Y7S0FDRjtDQUNGLENBQUMifQ==