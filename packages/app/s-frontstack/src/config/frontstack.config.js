"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
let receipe = 'default';
if (fs_1.default.existsSync(`${packageRoot_1.default()}/sugar.json`)) {
    const sugarJson = require(`${packageRoot_1.default()}/sugar.json`);
    if (sugarJson.receipe)
        receipe = sugarJson.receipe;
}
exports.default = {
    receipe,
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
                // js: '[config.frontstack.actions.js]',
                css: '[config.frontstack.actions.css]',
                jsBundle: '[config.frontstack.actions.jsBundle]',
                ts: '[config.frontstack.actions.ts]',
                svelte: '[config.frontstack.actions.svelte]'
                // docmap: '[config.frontstack.actions.docmap]'
            }
        },
        jsLib: {
            title: 'Javascript library',
            description: 'Javascript browser destinated library',
            actions: {
                // js: '[config.frontstack.actions.js]',
                ts: '[config.frontstack.actions.ts]'
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
            process: 'sugard js.compile -w',
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
            process: `sugard js.compile ${s_sugar_config_1.default('storage.distDir').replace(s_sugar_config_1.default('storage.rootDir') + '/', '')}/js/index.js -b -w`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzdGFjay5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcm9udHN0YWNrLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtGQUF5RDtBQUN6RCw0RkFBc0U7QUFDdEUsNENBQXNCO0FBRXRCLElBQUksT0FBTyxHQUFHLFNBQVMsQ0FBQztBQUN4QixJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxxQkFBYSxFQUFFLGFBQWEsQ0FBQyxFQUFFO0lBQ3BELE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLHFCQUFhLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDM0QsSUFBSSxTQUFTLENBQUMsT0FBTztRQUFFLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDO0NBQ3BEO0FBRUQsa0JBQWU7SUFDYixPQUFPO0lBRVAsT0FBTyxFQUFFLEVBQUU7SUFFWCxRQUFRLEVBQUU7UUFDUixPQUFPLEVBQUU7WUFDUCxLQUFLLEVBQUUsU0FBUztZQUNoQixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLE9BQU8sRUFBRTtnQkFDUCxjQUFjLEVBQUUsNENBQTRDO2dCQUM1RCxHQUFHLEVBQUUsaUNBQWlDO2dCQUN0QyxFQUFFLEVBQUUsZ0NBQWdDO2dCQUNwQyxFQUFFLEVBQUUsZ0NBQWdDO2dCQUNwQyxNQUFNLEVBQUUsb0NBQW9DO2dCQUM1QyxNQUFNLEVBQUUsb0NBQW9DO2FBQzdDO1NBQ0Y7UUFDRCxlQUFlLEVBQUU7WUFDZixLQUFLLEVBQUUscUJBQXFCO1lBQzVCLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSw0Q0FBNEM7Z0JBQzVELHdDQUF3QztnQkFDeEMsR0FBRyxFQUFFLGlDQUFpQztnQkFDdEMsUUFBUSxFQUFFLHNDQUFzQztnQkFDaEQsRUFBRSxFQUFFLGdDQUFnQztnQkFDcEMsTUFBTSxFQUFFLG9DQUFvQztnQkFDNUMsK0NBQStDO2FBQ2hEO1NBQ0Y7UUFDRCxLQUFLLEVBQUU7WUFDTCxLQUFLLEVBQUUsb0JBQW9CO1lBQzNCLFdBQVcsRUFBRSx1Q0FBdUM7WUFDcEQsT0FBTyxFQUFFO2dCQUNQLHdDQUF3QztnQkFDeEMsRUFBRSxFQUFFLGdDQUFnQztnQkFDcEMsK0NBQStDO2FBQ2hEO1NBQ0Y7UUFFRCxLQUFLLEVBQUUsRUFBRTtLQUNWO0lBRUQsT0FBTyxFQUFFO1FBQ1AsY0FBYyxFQUFFO1lBQ2QsRUFBRSxFQUFFLGdCQUFnQjtZQUNwQixLQUFLLEVBQUUsaUJBQWlCO1lBQ3hCLFdBQVcsRUFDVCxtRUFBbUU7WUFDckUsT0FBTyxFQUFFLDZCQUE2QjtZQUN0QyxRQUFRLEVBQUU7Z0JBQ1IsY0FBYyxFQUFFO29CQUNkLE9BQU8sRUFBRSxJQUFJO2lCQUNkO2FBQ0Y7U0FDRjtRQUNELEdBQUcsRUFBRTtZQUNILEVBQUUsRUFBRSxLQUFLO1lBQ1QsS0FBSyxFQUFFLHdCQUF3QjtZQUMvQixXQUFXLEVBQUUsK0NBQStDO1lBQzVELE9BQU8sRUFBRSwyQkFBMkI7WUFDcEMsUUFBUSxFQUFFO2dCQUNSLGNBQWMsRUFBRTtvQkFDZCxPQUFPLEVBQUUsSUFBSTtpQkFDZDthQUNGO1NBQ0Y7UUFDRCxFQUFFLEVBQUU7WUFDRixFQUFFLEVBQUUsSUFBSTtZQUNSLEtBQUssRUFBRSwyQkFBMkI7WUFDbEMsV0FBVyxFQUFFLG1DQUFtQztZQUNoRCxPQUFPLEVBQUUsc0JBQXNCO1lBQy9CLFFBQVEsRUFBRTtnQkFDUixjQUFjLEVBQUU7b0JBQ2QsT0FBTyxFQUFFLElBQUk7aUJBQ2Q7YUFDRjtTQUNGO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxFQUFFLFVBQVU7WUFDZCxLQUFLLEVBQUUsMEJBQTBCO1lBQ2pDLFdBQVcsRUFBRSxzREFBc0Q7WUFDbkUsT0FBTyxFQUFFLHFCQUFxQix3QkFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUMsT0FBTyxDQUNwRSx3QkFBYSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsR0FBRyxFQUN0QyxFQUFFLENBQ0gsb0JBQW9CO1lBQ3JCLFFBQVEsRUFBRTtnQkFDUixjQUFjLEVBQUU7b0JBQ2QsT0FBTyxFQUFFLElBQUk7aUJBQ2Q7YUFDRjtTQUNGO1FBQ0QsRUFBRSxFQUFFO1lBQ0YsRUFBRSxFQUFFLElBQUk7WUFDUixLQUFLLEVBQUUsMkJBQTJCO1lBQ2xDLFdBQVcsRUFBRSxtQ0FBbUM7WUFDaEQsT0FBTyxFQUFFLHNCQUFzQjtZQUMvQixRQUFRLEVBQUU7Z0JBQ1IsY0FBYyxFQUFFO29CQUNkLE9BQU8sRUFBRSxJQUFJO2lCQUNkO2FBQ0Y7U0FDRjtRQUNELE1BQU0sRUFBRTtZQUNOLEVBQUUsRUFBRSxRQUFRO1lBQ1osS0FBSyxFQUFFLHVCQUF1QjtZQUM5QixXQUFXLEVBQUUsdUNBQXVDO1lBQ3BELE9BQU8sRUFBRSwwQkFBMEI7WUFDbkMsUUFBUSxFQUFFO2dCQUNSLGNBQWMsRUFBRTtvQkFDZCxPQUFPLEVBQUUsSUFBSTtpQkFDZDthQUNGO1NBQ0Y7UUFDRCxNQUFNLEVBQUU7WUFDTixFQUFFLEVBQUUsUUFBUTtZQUNaLEtBQUssRUFBRSwwQkFBMEI7WUFDakMsV0FBVyxFQUNULGdFQUFnRTtZQUNsRSxPQUFPLEVBQUUsZ0NBQWdDO1lBQ3pDLFFBQVEsRUFBRTtnQkFDUixjQUFjLEVBQUU7b0JBQ2QsT0FBTyxFQUFFLElBQUk7aUJBQ2Q7YUFDRjtTQUNGO0tBQ0Y7Q0FDRixDQUFDIn0=