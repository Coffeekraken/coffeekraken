export default function (api: any): {
    
    noExtends: boolean;
    
    excludePackages: string[];
    read: {
        
        input: string;
        
        sort: string[];
        
        sortDeep: string[];
    };
    snapshot: {
        
        readonly outDir: string;
    };
    installSnapshot: {
        
        readonly glob: string;
    };
    build: {
        
        globs: string[];
        
        exclude: string[];
        filters: {
            
            namespace: RegExp;
            
            type: RegExp;
        };
        
        tags: string[];
        
        save: boolean;
        
        readonly outPath: string;
    };
};
