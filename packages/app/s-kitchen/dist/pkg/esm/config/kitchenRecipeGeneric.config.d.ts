export default function (api: any): {
    
    title: string;
    
    description: string;
    
    templateDir: any;
    
    requirements: {
        readonly commands: any[];
    };
    
    defaultStack: string;
    stacks: {
        new: {
            
            description: string;
            actions: {
                
                createApp: {
                    title: string;
                    description: string;
                    readonly command: string;
                    after(): void;
                    params: {};
                    settings: {};
                };
                
                initNpm: {
                    extends: string;
                    params: {};
                    settings: {};
                };
                
                rename: {
                    extends: string;
                    title: string;
                    description: string;
                    params: {};
                };
                
                addSugarJson: {
                    extends: string;
                    title: string;
                    description: string;
                    params: {};
                };
                
                addDefaultPackageJson: {
                    extends: string;
                };
                
                addNvmrc: {
                    extends: string;
                    title: string;
                    description: string;
                    params: {};
                };
                
                addFrontspecJson: {
                    extends: string;
                    title: string;
                    description: string;
                    params: {};
                };
                
                addDefaultPages: {
                    extends: string;
                };
                
                addDefaultScripts: {
                    extends: string;
                };
                
                addSugar: {
                    extends: string;
                };
                
                addManifestJson: {
                    extends: string;
                    title: string;
                    description: string;
                    params: {};
                };
                
                addSugarPostcss: {
                    extends: string;
                };
                
                addFavicon: {
                    extends: string;
                };
                
                addReadme: {
                    extends: string;
                };
                
                installDependencies: any;
            };
        };
        dev: {
            
            description: string;
            runInParallel: boolean;
            actions: {
                
                readonly typescriptBuild: any;
                
                readonly frontendServer: any;
                
                readonly corsProxy: any;
                
                readonly vite: any;
                
                readonly format: any;
            };
        };
        prod: {
            
            description: string;
            sharedParams: {
                
                env: string;
            };
            actions: {
                
                readonly frontendServer: any;
                
                readonly corsProxy: any;
            };
        };
        build: {
            
            description: string;
            sharedParams: {
                
                prod: boolean;
            };
            actions: {
                
                readonly postcssBuild: any;
                
                readonly viteBuild: any;
                
                readonly imagesBuild: any;
                
                readonly faviconBuild: any;
                
                readonly docmapBuild: any;
                
                readonly sitemapBuild: any;
                
                readonly markdownBuild: any;
                
                copyAssets: {
                    extends: string;
                    params: {
                        src: string;
                        glob: string;
                        dest: string;
                    };
                };
            };
        };
    };
};
