export default function (api: any): {
    
    manager: string;
    
    readonly rootDir: any;
    readme: {
        
        readonly path: string;
    };
    
    defaultPackageJson: {
        scripts: {
            dev: string;
            prod: string;
            build: string;
        };
        dependencies: {
            readonly '@coffeekraken/sugar': string;
        };
    };
    checkDependencies: {
        
        readonly dirs: any[];
        
        packagesMap: {
            '^@coffeekraken/': string;
        };
    };
    exports: {
        
        glob: string[];
        
        folderModuleMap: {
            esm: string;
            cjs: string;
        };
        
        folderPlatformMap: {
            node: string;
            shared: string;
            js: string;
        };
    };
};
