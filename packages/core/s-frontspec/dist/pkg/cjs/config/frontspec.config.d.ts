export declare function prepare(config: any): Promise<any>;
export default function (api: any): {
    readonly storage: any;
    readonly serve: any;
    
    removeForFrontend: string[];
    build: {
        sources: {
            metas: {
                title: string;
                description: string;
                type: string;
                config: string;
            };
            assets: {
                title: string;
                description: string;
                type: string;
                config: string;
            };
            package: {
                title: string;
                description: string;
                type: string;
                readonly value: {
                    name: any;
                    description: any;
                    version: any;
                    author: any;
                    license: any;
                };
            };
            favicon: {
                title: string;
                description: string;
                type: string;
                readonly value: {
                    rootDir: string;
                    fileName: any;
                    filePath: string;
                };
            };
            theme: {
                title: string;
                description: string;
                type: string;
                readonly value: {
                    theme: any;
                    variant: any;
                    themes: {};
                    lnf: {
                        margin: any;
                        padding: any;
                        font: any;
                        layout: any;
                        typo: {};
                    };
                };
            };
            media: {
                title: string;
                description: string;
                type: string;
                readonly value: any;
            };
            views: {
                title: string;
                description: string;
                type: string;
                config: string;
            };
            specs: {
                title: string;
                description: string;
                type: string;
                config: string;
            };
            google: {
                title: string;
                description: string;
                type: string;
                config: string;
            };
            lod: {
                title: string;
                description: string;
                type: string;
                readonly value: any;
            };
            partytown: {
                title: string;
                description: string;
                type: string;
                readonly value: any;
            };
        };
    };
    default: {
        assets: {
            
            viteClient: {
                readonly src: string;
            };
        };
    };
};
