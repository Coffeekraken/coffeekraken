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
                svelte: '[config.frontstack.actions.svelte]',
                docmap: '[config.frontstack.actions.docmap]'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzdGFjay5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcm9udHN0YWNrLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtGQUF5RDtBQUN6RCw0RkFBc0U7QUFDdEUsNENBQXNCO0FBRXRCLElBQUksT0FBTyxHQUFHLFNBQVMsQ0FBQztBQUN4QixJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxxQkFBYSxFQUFFLGFBQWEsQ0FBQyxFQUFFO0lBQ3BELE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLHFCQUFhLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDM0QsSUFBSSxTQUFTLENBQUMsT0FBTztRQUFFLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDO0NBQ3BEO0FBRUQsa0JBQWU7SUFDYixPQUFPO0lBRVAsT0FBTyxFQUFFLEVBQUU7SUFFWCxRQUFRLEVBQUU7UUFDUixPQUFPLEVBQUU7WUFDUCxLQUFLLEVBQUUsU0FBUztZQUNoQixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLE9BQU8sRUFBRTtnQkFDUCxjQUFjLEVBQUUsNENBQTRDO2dCQUM1RCxHQUFHLEVBQUUsaUNBQWlDO2dCQUN0QyxFQUFFLEVBQUUsZ0NBQWdDO2dCQUNwQyxFQUFFLEVBQUUsZ0NBQWdDO2dCQUNwQyxNQUFNLEVBQUUsb0NBQW9DO2dCQUM1QyxNQUFNLEVBQUUsb0NBQW9DO2FBQzdDO1NBQ0Y7UUFDRCxlQUFlLEVBQUU7WUFDZixLQUFLLEVBQUUscUJBQXFCO1lBQzVCLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSw0Q0FBNEM7Z0JBQzVELHdDQUF3QztnQkFDeEMsR0FBRyxFQUFFLGlDQUFpQztnQkFDdEMsUUFBUSxFQUFFLHNDQUFzQztnQkFDaEQsRUFBRSxFQUFFLGdDQUFnQztnQkFDcEMsTUFBTSxFQUFFLG9DQUFvQztnQkFDNUMsTUFBTSxFQUFFLG9DQUFvQzth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