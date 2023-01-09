declare const _default: (api: any) => {
    build: {
        
        readonly output: string;
    };
    sources: {
        file: {
            
            active: boolean;
            
            settings: {
                
                glob: string[];
                
                readonly inDir: any;
            };
            
            path: any;
        };
        docmap: {
            
            active: boolean;
            
            settings: {};
            
            path: any;
        };
    };
};
export default _default;
