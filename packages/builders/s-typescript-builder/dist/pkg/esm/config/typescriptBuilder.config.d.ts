export default function (api: any): {
    
    glob: string[];
    
    readonly inDir: any;
    
    readonly outDir: string;
    
    formats: string[];
    
    platform: string;
    
    customSettings: {};
    
    exclude: string[];
    
    readonly tsconfig: any;
};
