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
            theme: {
                title: string;
                description: string;
                type: string;
                readonly value: {
                    theme: any;
                    variant: any;
                    themes: {};
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
            margin: {
                title: string;
                description: string;
                type: string;
                readonly value: any;
            };
            padding: {
                title: string;
                description: string;
                type: string;
                readonly value: any;
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
            font: {
                title: string;
                description: string;
                type: string;
                readonly value: any;
            };
            typo: {
                title: string;
                description: string;
                type: string;
                readonly value: {};
            };
            layout: {
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
