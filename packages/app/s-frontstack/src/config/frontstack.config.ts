import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __path from 'path';

const recipe = 'default';

export default function (env, config) {
    if (env.platform !== 'node') return;
    return {
        recipe,

        exclude: [],

        recipes: {
            default: {
                title: 'Default',
                description: 'Default s-frontstack recipe ',
                templateDir: __path.resolve(`${__dirname()}/../templates/default`),
                defaultStack: 'dev',
                Rangestacks: {
                    dev: {
                        description: 'Start the development stack',
                        actions: {
                            frontendServer: '[config.frontstack.actions.frontendServer]',
                            vite: '[config.frontstack.actions.vite]',
                        },
                    },
                    prod: {
                        description: 'Start the production testing stack',
                        sharedParams: {
                            env: 'production',
                        },
                        actions: {
                            frontendServer: '[config.frontstack.actions.frontendServer]',
                        },
                    },
                    build: {
                        description: 'Build your final production ready dist package',
                        actions: {
                            postcssBuild: '[config.frontstack.actions.postcssBuild]',
                            viteBuild: '[config.frontstack.actions.viteBuild]',
                            imagesBuild: '[config.frontstack.actions.imagesBuild]',
                            docBuild: '[config.frontstack.actions.docBuild]',
                            docmapBuild: '[config.frontstack.actions.docmapBuild]',
                        },
                    },
                },
            },
            litElement: {
                title: 'LitElement component',
                description: 'LitElement webcomponent recipe',
                templateDir: __path.resolve(`${__dirname()}/../templates/litElement`),
                defaultStack: 'dev',
                stacks: {
                    dev: {
                        description: 'Start the development stack',
                        actions: {
                            vite: '[config.frontstack.actions.vite]',
                        },
                    },
                    build: {
                        description: 'Build your final production ready dist package',
                        actions: {
                            viteBuild: {
                                action: '[config.frontstack.actions.viteBuild]',
                                params: {
                                    lib: true,
                                },
                            },
                            // docBuild: '[config.frontstack.actions.docBuild]',
                            // docmapBuild: '[config.frontstack.actions.docmapBuild]',
                        },
                    },
                },
            },
        },

        actions: {
            frontendServer: {
                id: 'frontendServer',
                title: 'Frontend server',
                description: 'Frontend server using the @coffeekraken/s-frontend-server package',
                process: 'sugar frontendServer.start',
                params: {},
                settings: {
                    processManager: {
                        restart: true,
                    },
                },
            },
            postcssBuild: {
                id: 'postcssBuild',
                title: 'PostCSS build action',
                description: 'Build css using the amazing PostCSS package',
                process: 'sugar postcss.build',
                params: {},
                settings: {
                    processManager: {
                        restart: true,
                    },
                },
            },
            imagesBuild: {
                id: 'imagesBuild',
                title: 'Images build action',
                description: 'Build your images with ease. Compress, resize, webp version, etc...',
                process: 'sugar images.build',
                params: {},
                settings: {
                    processManager: {
                        restart: true,
                    },
                },
            },
            vite: {
                id: 'vite',
                title: 'Vite development stack',
                description: 'Allow to build files easily while developing',
                process: 'sugar vite',
                params: {},
                settings: {
                    processManager: {
                        restart: true,
                    },
                },
            },
            viteBuild: {
                id: 'viteBuild',
                title: 'Vite build stack',
                description: 'Allow to compile javascript (js, ts, riot, react, etc...) files easily',
                process: 'sugar vite.build',
                params: {},
                settings: {
                    processManager: {
                        restart: true,
                    },
                },
            },
            docBuild: {
                id: 'docBuild',
                title: 'Markdown doc build stack',
                description:
                    'Allow to build markdown documentation with special features files easily. Take care of src/README and src/doc/**/*.md files',
                process: 'sugar markdown.build -p readme -p doc',
                params: {},
                settings: {
                    processManager: {
                        restart: true,
                    },
                },
            },
            docmapBuild: {
                id: 'docmapBuild',
                title: 'Docmap build action',
                description: 'Allow to build and maintain up to date the docmap.json file',
                process: 'sugar docmap.build --noExtends',
                params: {},
                settings: {
                    processManager: {
                        restart: true,
                    },
                },
            },
        },
    };
}
