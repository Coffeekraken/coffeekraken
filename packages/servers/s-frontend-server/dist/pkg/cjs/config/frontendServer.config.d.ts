export default function (api: any): {
    
    port: number;
    
    hostname: string;
    
    readonly rootDir: any;
    
    readonly staticDirs: {
        '/tmp': string;
        '/dist/css/lod': string;
        '/dist/css/partials': string;
        '/dist': any;
    };
    
    readonly viewsDir: any;
    
    readonly pagesDir: any;
    
    logLevel: string;
    corsProxy: {
        
        port: number;
        
        readonly url: string;
        
        targetUrlHeaderName: string;
        
        limit: string;
    };
    proxy: {};
    middlewares: {
        bench: {
            
            description: string;
            
            path: string;
            settings: {};
        };
        request: {
            
            description: string;
            
            path: string;
            settings: {};
        };
        env: {
            
            description: string;
            
            path: string;
            settings: {};
        };
        packageJson: {
            
            description: string;
            
            path: string;
            settings: {};
        };
    };
    data: {};
    modules: {
        publicDir: {
            
            description: string;
            
            path: string;
            settings: {};
        };
        upload: {
            
            description: string;
            
            path: string;
            settings: {};
        };
        generic: {
            
            description: string;
            
            path: string;
            settings: {};
        };
        docmap: {
            
            description: string;
            
            path: string;
            settings: {};
        };
        classmap: {
            
            description: string;
            
            path: string;
            settings: {};
        };
        carpenter: {
            
            description: string;
            
            path: string;
            settings: {};
        };
        redirect: {
            
            description: string;
            
            path: string;
            settings: {};
        };
        config: {
            
            description: string;
            
            path: string;
            settings: {};
        };
        frontspec: {
            
            description: string;
            
            path: string;
            settings: {};
        };
        404: {
            
            description: string;
            
            path: string;
            settings: {};
        };
    };
    pages: {};
    handlers: {};
};
