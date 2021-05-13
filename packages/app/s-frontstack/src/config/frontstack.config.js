import __sugarConfig from '@coffeekraken/s-sugar-config';
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
            process: `sugard js.compile ${__sugarConfig('storage.distDir').replace(__sugarConfig('storage.rootDir') + '/', '')}/js/index.js -b -w`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzdGFjay5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcm9udHN0YWNrLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFFdEIsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDO0FBQ3hCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLGFBQWEsRUFBRSxhQUFhLENBQUMsRUFBRTtJQUNwRCxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDM0QsSUFBSSxTQUFTLENBQUMsT0FBTztRQUFFLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDO0NBQ3BEO0FBRUQsZUFBZTtJQUNiLE9BQU87SUFFUCxPQUFPLEVBQUUsRUFBRTtJQUVYLFFBQVEsRUFBRTtRQUNSLE9BQU8sRUFBRTtZQUNQLEtBQUssRUFBRSxTQUFTO1lBQ2hCLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSw0Q0FBNEM7Z0JBQzVELEdBQUcsRUFBRSxpQ0FBaUM7Z0JBQ3RDLEVBQUUsRUFBRSxnQ0FBZ0M7Z0JBQ3BDLEVBQUUsRUFBRSxnQ0FBZ0M7Z0JBQ3BDLE1BQU0sRUFBRSxvQ0FBb0M7Z0JBQzVDLE1BQU0sRUFBRSxvQ0FBb0M7YUFDN0M7U0FDRjtRQUNELGVBQWUsRUFBRTtZQUNmLEtBQUssRUFBRSxxQkFBcUI7WUFDNUIsV0FBVyxFQUFFLDhCQUE4QjtZQUMzQyxPQUFPLEVBQUU7Z0JBQ1AsY0FBYyxFQUFFLDRDQUE0QztnQkFDNUQsSUFBSSxFQUFFLGtDQUFrQztnQkFDeEMsd0NBQXdDO2dCQUN4QywwQ0FBMEM7Z0JBQzFDLG9EQUFvRDtnQkFDcEQsd0NBQXdDO2dCQUN4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