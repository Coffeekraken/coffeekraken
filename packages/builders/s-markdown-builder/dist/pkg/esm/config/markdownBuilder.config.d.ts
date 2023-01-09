export default function (api: any): {
    default: {
        
        glob: string;
        
        readonly inDir: any;
        
        inPath: any;
        
        inRaw: any;
        
        readonly outDir: any;
        
        outPath: any;
        
        save: boolean;
        
        target: string;
    };
    metas: {
        
        readonly websiteUrl: any;
    };
    presets: {
        default: {};
        readme: {
            readonly inPath: string;
            readonly outPath: string;
        };
    };
};
