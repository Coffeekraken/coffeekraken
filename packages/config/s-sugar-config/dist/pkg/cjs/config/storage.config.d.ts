export default function (api: any): {
    system: {
        
        tmpDir: any;
    };
    package: {
        
        rootDir: string;
        
        readonly localDir: string;
        
        readonly cacheDir: string;
        
        readonly tmpDir: string;
        
        readonly nodeModulesDir: string;
    };
    sugar: {
        
        rootDir: string;
    };
    src: {
        
        readonly rootDir: string;
        
        readonly jsDir: string;
        
        readonly nodeDir: string;
        
        readonly cssDir: string;
        
        readonly configDir: string;
        
        readonly docDir: string;
        
        readonly fontsDir: string;
        
        readonly iconsDir: string;
        
        readonly imgDir: string;
        
        readonly pagesDir: string;
        
        readonly publicDir: string;
        
        readonly viewsDir: string;
    };
    dist: {
        
        readonly rootDir: string;
        
        readonly jsDir: string;
        
        readonly nodeDir: string;
        
        readonly cssDir: string;
        
        readonly docDir: string;
        
        readonly fontsDir: string;
        
        readonly iconsDir: string;
        
        readonly imgDir: string;
        
        readonly pagesDir: string;
        
        readonly viewsDir: string;
    };
    
    exclude: string[];
};
