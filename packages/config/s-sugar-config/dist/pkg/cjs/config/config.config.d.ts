export default function (api: any): {
    browser: {
        
        include: string[];
    };
    node: {
        
        include: any[];
    };
    readonly cacheDir: string;
};
