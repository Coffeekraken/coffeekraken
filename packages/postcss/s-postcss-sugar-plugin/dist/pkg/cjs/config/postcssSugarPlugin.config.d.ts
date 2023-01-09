export default function (api: any): {
    
    readonly outDir: any;
    
    cache: boolean;
    scopes: {
        bare: {
            
            properties: string[];
        };
    };
    
    excludeByTypes: any[];
    
    excludeCommentByTypes: string[];
    
    excludeCodeByTypes: any[];
};
