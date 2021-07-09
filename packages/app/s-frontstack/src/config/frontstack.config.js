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
            templateDir: __path.resolve(`${__dirname}/../templates/riotComponent`),
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
        imagesBuild: {
            id: 'imagesBuild',
            title: 'Images build action',
            description: 'Build your images with ease. Compress, resize, webp version, etc...',
            process: 'sugard images.build',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzdGFjay5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcm9udHN0YWNrLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLGdCQUFnQixNQUFNLDhDQUE4QyxDQUFDO0FBQzVFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFMUIsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDO0FBQ3ZCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLGdCQUFnQixFQUFFLGFBQWEsQ0FBQyxFQUFFO0lBQ3ZELE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLGdCQUFnQixFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQzlELElBQUksU0FBUyxDQUFDLE1BQU07UUFBRSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztDQUNqRDtBQUVELGVBQWU7SUFDYixNQUFNO0lBRU4sT0FBTyxFQUFFLEVBQUU7SUFFWCxPQUFPLEVBQUU7UUFDUCxPQUFPLEVBQUU7WUFDUCxLQUFLLEVBQUUsU0FBUztZQUNoQixXQUFXLEVBQUUsOEJBQThCO1lBQzNDLFdBQVcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyx1QkFBdUIsQ0FBQztZQUNoRSxZQUFZLEVBQUUsS0FBSztZQUNuQixNQUFNLEVBQUU7Z0JBQ04sR0FBRyxFQUFFO29CQUNILFdBQVcsRUFBRSw2QkFBNkI7b0JBQzFDLE9BQU8sRUFBRTt3QkFDUCxjQUFjLEVBQUUsNENBQTRDO3dCQUM1RCxJQUFJLEVBQUUsa0NBQWtDO3FCQUN6QztpQkFDRjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osV0FBVyxFQUFFLG9DQUFvQztvQkFDakQsWUFBWSxFQUFFO3dCQUNaLEdBQUcsRUFBRSxZQUFZO3FCQUNsQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsY0FBYyxFQUFFLDRDQUE0QztxQkFDN0Q7aUJBQ0Y7Z0JB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