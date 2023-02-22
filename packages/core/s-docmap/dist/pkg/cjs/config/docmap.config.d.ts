export default function (api: any): {
    
    excludePackages: string[];
    read: {
        
        input: string;
        
        sort: string[];
        
        sortDeep: string[];
    };
    build: {
        
        globs: string[];
        
        exclude: string[];
        excludeByTags: {
            
            
            type: RegExp[];
        };
        
        tags: string[];
        
        save: boolean;
        
        readonly outPath: string;
    };
};
