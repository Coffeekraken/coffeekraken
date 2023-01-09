export default function (api: any): {
    
    readonly input: string;
    
    readonly outDir: string;
    
    readonly host: string;
    
    failAfter: number;
    
    requestTimeout: number;
    
    requestRetry: number;
    
    requestRetryTimeout: number;
    
    clean: boolean;
    
    incremental: boolean;
    assets: {
        docmap: {
            
            readonly from: string;
            
            readonly to: string;
        };
        public: {
            
            readonly from: string;
            
            glob: string;
            
            readonly to: any;
        };
        dist: {
            
            readonly from: any;
            
            glob: string;
            
            readonly to: string;
        };
    };
};
