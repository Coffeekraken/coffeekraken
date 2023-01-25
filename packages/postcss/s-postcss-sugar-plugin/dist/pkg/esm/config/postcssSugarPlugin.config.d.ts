export default function (api: any): {
    
    readonly outDir: any;
    clean: {
        
        readonly variables: boolean;
    };
    compress: {
        
        readonly variables: boolean;
    };
    
    excludeByTypes: any[];
    
    excludeCommentByTypes: string[];
    
    excludeCodeByTypes: any[];
};
