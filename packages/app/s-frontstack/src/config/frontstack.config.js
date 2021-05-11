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
                vite: '[config.frontstack.actions.vite]'
                // js: '[config.frontstack.actions.js]',
                // css: '[config.frontstack.actions.css]',
                // jsBundle: '[config.frontstack.actions.jsBundle]',
                // ts: '[config.frontstack.actions.ts]',
                // svelte: '[config.frontstack.actions.svelte]',
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
        vite: {
            id: 'vite',
            title: 'Vite development stack',
            description: 'Allow to compile files easily',
            process: 'sugard vite.start',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzdGFjay5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcm9udHN0YWNrLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtGQUF5RDtBQUN6RCw0RkFBc0U7QUFDdEUsNENBQXNCO0FBRXRCLElBQUksT0FBTyxHQUFHLFNBQVMsQ0FBQztBQUN4QixJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxxQkFBYSxFQUFFLGFBQWEsQ0FBQyxFQUFFO0lBQ3BELE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLHFCQUFhLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDM0QsSUFBSSxTQUFTLENBQUMsT0FBTztRQUFFLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDO0NBQ3BEO0FBRUQsa0JBQWU7SUFDYixPQUFPO0lBRVAsT0FBTyxFQUFFLEVBQUU7SUFFWCxRQUFRLEVBQUU7UUFDUixPQUFPLEVBQUU7WUFDUCxLQUFLLEVBQUUsU0FBUztZQUNoQixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLE9BQU8sRUFBRTtnQkFDUCxjQUFjLEVBQUUsNENBQTRDO2dCQUM1RCxHQUFHLEVBQUUsaUNBQWlDO2dCQUN0QyxFQUFFLEVBQUUsZ0NBQWdDO2dCQUNwQyxFQUFFLEVBQUUsZ0NBQWdDO2dCQUNwQyxNQUFNLEVBQUUsb0NBQW9DO2dCQUM1QyxNQUFNLEVBQUUsb0NBQW9DO2FBQzdDO1NBQ0Y7UUFDRCxlQUFlLEVBQUU7WUFDZixLQUFLLEVBQUUscUJBQXFCO1lBQzVCLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSw0Q0FBNEM7Z0JBQzVELElBQUksRUFBRSxrQ0FBa0M7Z0JBQ3hDLHdDQUF3QztnQkFDeEMsMENBQTBDO2dCQUMxQyxvREFBb0Q7Z0JBQ3BELHdDQUF3QztnQkFDeEMsZ0RBQWdEO2dCQUNoRCwrQ0FBK0M7YUFDaEQ7U0FDRjtRQUNELEtBQUssRUFBRTtZQUNMLEtBQUssRUFBRSxvQkFBb0I7WUFDM0IsV0FBVyxFQUFFLHVDQUF1QztZQUNwRCxPQUFPLEVBQUU7Z0JBQ1Asd0NBQXdDO2dCQUN4QyxFQUFFLEVBQUUsZ0NBQWdDO2dCQUNwQywrQ0FBK0M7YUFDaEQ7U0FDRjtRQUVELEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFFRCxPQUFPLEVBQUU7UUFDUCxjQUFjLEVBQUU7WUFDZCxFQUFFLEVBQUUsZ0JBQWdCO1lBQ3BCLEtBQUssRUFBRSxpQkFBaUI7WUFDeEIsV0FBVyxFQUNULG1FQUFtRTtZQUNyRSxPQUFPLEVBQUUsNkJBQTZCO1lBQ3RDLFFBQVEsRUFBRTtnQkFDUixjQUFjLEVBQUU7b0JBQ2QsT0FBTyxFQUFFLElBQUk7aUJBQ2Q7YUFDRjtTQUNGO1FBQ0QsR0FBRyxFQUFFO1lBQ0gsRUFBRSxFQUFFLEtBQUs7WUFDVCxLQUFLLEVBQUUsd0JBQXdCO1lBQy9CLFdBQVcsRUFBRSwrQ0FBK0M7WUFDNUQsT0FBTyxFQUFFLDJCQUEyQjtZQUNwQyxRQUFRLEVBQUU7Z0JBQ1IsY0FBYyxFQUFFO29CQUNkLE9BQU8sRUFBRSxJQUFJO2lCQUNkO2FBQ0Y7U0FDRjtRQUNELEVBQUUsRUFBRTtZQUNGLEVBQUUsRUFBRSxJQUFJO1lBQ1IsS0FBSyxFQUFFLDJCQUEyQjtZQUNsQyxXQUFXLEVBQUUsbUNBQW1DO1lBQ2hELE9BQU8sRUFBRSxzQkFBc0I7WUFDL0IsUUFBUSxFQUFFO2dCQUNSLGNBQWMsRUFBRTtvQkFDZCxPQUFPLEVBQUUsSUFBSTtpQkFDZDthQUNGO1NBQ0Y7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLEVBQUUsVUFBVTtZQUNkLEtBQUssRUFBRSwwQkFBMEI7WUFDakMsV0FBVyxFQUFFLHNEQUFzRDtZQUNuRSxPQUFPLEVBQUUscUJBQXFCLHdCQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxPQUFPLENBQ3BFLHdCQUFhLENBQUMsaUJBQWlCLENBQUMsR0FBRyxHQUFHLEVBQ3RDLEVBQUUsQ0FDSCxvQkFBb0I7WUFDckIsUUFBUSxFQUFFO2dCQUNSLGNBQWMsRUFBRTtvQkFDZCxPQUFPLEVBQUUsSUFBSTtpQkFDZDthQUNGO1NBQ0Y7UUFDRCxFQUFFLEVBQUU7WUFDRixFQUFFLEVBQUUsSUFBSTtZQUNSLEtBQUssRUFBRSwyQkFBMkI7WUFDbEMsV0FBVyxFQUFFLG1DQUFtQztZQUNoRCxPQUFPLEVBQUUsc0JBQXNCO1lBQy9CLFFBQVEsRUFBRTtnQkFDUixjQUFjLEVBQUU7b0JBQ2QsT0FBTyxFQUFFLElBQUk7aUJBQ2Q7YUFDRjtTQUNGO1FBQ0QsSUFBSSxFQUFFO1lBQ0osRUFBRSxFQUFFLE1BQU07WUFDVixLQUFLLEVBQUUsd0JBQXdCO1lBQy9CLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsT0FBTyxFQUFFLG1CQUFtQjtZQUM1QixRQUFRLEVBQUU7Z0JBQ1IsY0FBYyxFQUFFO29CQUNkLE9BQU8sRUFBRSxJQUFJO2lCQUNkO2FBQ0Y7U0FDRjtRQUNELE1BQU0sRUFBRTtZQUNOLEVBQUUsRUFBRSxRQUFRO1lBQ1osS0FBSyxFQUFFLHVCQUF1QjtZQUM5QixXQUFXLEVBQUUsdUNBQXVDO1lBQ3BELE9BQU8sRUFBRSwwQkFBMEI7WUFDbkMsUUFBUSxFQUFFO2dCQUNSLGNBQWMsRUFBRTtvQkFDZCxPQUFPLEVBQUUsSUFBSTtpQkFDZDthQUNGO1NBQ0Y7UUFDRCxNQUFNLEVBQUU7WUFDTixFQUFFLEVBQUUsUUFBUTtZQUNaLEtBQUssRUFBRSwwQkFBMEI7WUFDakMsV0FBVyxFQUNULGdFQUFnRTtZQUNsRSxPQUFPLEVBQUUsZ0NBQWdDO1lBQ3pDLFFBQVEsRUFBRTtnQkFDUixjQUFjLEVBQUU7b0JBQ2QsT0FBTyxFQUFFLElBQUk7aUJBQ2Q7YUFDRjtTQUNGO0tBQ0Y7Q0FDRixDQUFDIn0=