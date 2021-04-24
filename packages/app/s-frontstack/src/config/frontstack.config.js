"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    receipes: {
        default: {
            title: 'Default',
            description: 'Default s-frontstack receipe ',
            actions: {
                frontendServer: '[config.frontstack.actions.frontendServer]',
                css: '[config.frontstack.actions.css]',
                js: '[config.frontstack.actions.js]',
                svelte: '[config.frontstack.actions.svelte]',
                docmap: '[config.frontstack.actions.docmap]'
            }
        },
        react: {}
    },
    actions: {
        frontendServer: {
            id: 'frontendServer',
            title: 'Frontend server',
            description: 'Frontend server using the @coffeekraken/s-frontend-server package',
            process: 'sugar-dev frontendServer.start',
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
            process: 'sugar-dev postcss.compile -w',
            settings: {
                processManager: {
                    restart: true
                }
            }
        },
        js: {
            id: 'js',
            title: 'Javascript compile action',
            description: 'Allow to compile .js and .ts files easily',
            process: 'sugar-dev js.compile -w',
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
            process: 'sugar-dev svelte.compile -w',
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
            process: 'sugar-dev docmap.generate --watch',
            settings: {
                processManager: {
                    restart: true
                }
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzdGFjay5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcm9udHN0YWNrLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtCQUFlO0lBQ2IsUUFBUSxFQUFFO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsS0FBSyxFQUFFLFNBQVM7WUFDaEIsV0FBVyxFQUFFLCtCQUErQjtZQUM1QyxPQUFPLEVBQUU7Z0JBQ1AsY0FBYyxFQUFFLDRDQUE0QztnQkFDNUQsR0FBRyxFQUFFLGlDQUFpQztnQkFDdEMsRUFBRSxFQUFFLGdDQUFnQztnQkFDcEMsTUFBTSxFQUFFLG9DQUFvQztnQkFDNUMsTUFBTSxFQUFFLG9DQUFvQzthQUM3QztTQUNGO1FBRUQsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUVELE9BQU8sRUFBRTtRQUNQLGNBQWMsRUFBRTtZQUNkLEVBQUUsRUFBRSxnQkFBZ0I7WUFDcEIsS0FBSyxFQUFFLGlCQUFpQjtZQUN4QixXQUFXLEVBQ1QsbUVBQW1FO1lBQ3JFLE9BQU8sRUFBRSxnQ0FBZ0M7WUFDekMsUUFBUSxFQUFFO2dCQUNSLGNBQWMsRUFBRTtvQkFDZCxPQUFPLEVBQUUsSUFBSTtpQkFDZDthQUNGO1NBQ0Y7UUFDRCxHQUFHLEVBQUU7WUFDSCxFQUFFLEVBQUUsS0FBSztZQUNULEtBQUssRUFBRSx3QkFBd0I7WUFDL0IsV0FBVyxFQUFFLCtDQUErQztZQUM1RCxPQUFPLEVBQUUsOEJBQThCO1lBQ3ZDLFFBQVEsRUFBRTtnQkFDUixjQUFjLEVBQUU7b0JBQ2QsT0FBTyxFQUFFLElBQUk7aUJBQ2Q7YUFDRjtTQUNGO1FBQ0QsRUFBRSxFQUFFO1lBQ0YsRUFBRSxFQUFFLElBQUk7WUFDUixLQUFLLEVBQUUsMkJBQTJCO1lBQ2xDLFdBQVcsRUFBRSwyQ0FBMkM7WUFDeEQsT0FBTyxFQUFFLHlCQUF5QjtZQUNsQyxRQUFRLEVBQUU7Z0JBQ1IsY0FBYyxFQUFFO29CQUNkLE9BQU8sRUFBRSxJQUFJO2lCQUNkO2FBQ0Y7U0FDRjtRQUNELE1BQU0sRUFBRTtZQUNOLEVBQUUsRUFBRSxRQUFRO1lBQ1osS0FBSyxFQUFFLHVCQUF1QjtZQUM5QixXQUFXLEVBQUUsdUNBQXVDO1lBQ3BELE9BQU8sRUFBRSw2QkFBNkI7WUFDdEMsUUFBUSxFQUFFO2dCQUNSLGNBQWMsRUFBRTtvQkFDZCxPQUFPLEVBQUUsSUFBSTtpQkFDZDthQUNGO1NBQ0Y7UUFDRCxNQUFNLEVBQUU7WUFDTixFQUFFLEVBQUUsUUFBUTtZQUNaLEtBQUssRUFBRSwwQkFBMEI7WUFDakMsV0FBVyxFQUNULGdFQUFnRTtZQUNsRSxPQUFPLEVBQUUsbUNBQW1DO1lBQzVDLFFBQVEsRUFBRTtnQkFDUixjQUFjLEVBQUU7b0JBQ2QsT0FBTyxFQUFFLElBQUk7aUJBQ2Q7YUFDRjtTQUNGO0tBQ0Y7Q0FDRixDQUFDIn0=