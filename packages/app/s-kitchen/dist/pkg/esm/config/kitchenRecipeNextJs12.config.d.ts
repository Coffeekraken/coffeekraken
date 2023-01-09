export default function (api: any): {
    
    title: string;
    
    description: string;
    
    requirements: {
        readonly commands: any[];
    };
    
    defaultStack: string;
    stacks: {
        new: {
            
            description: string;
            actions: {
                
                readonly createApp: any;
                
                readonly rename: any;
                
                readonly addSugarJson: any;
                
                addSugar: {
                    extends: string;
                };
                
                addNvmrc: {
                    extends: string;
                    title: string;
                    description: string;
                    params: {};
                };
                
                readonly addManifestJson: any;
                
                readonly addSugarPostcss: any;
                
                installDependencies: any;
            };
        };
        dev: {
            
            description: string;
            runInParallel: boolean;
            actions: {
                
                start: {
                    title: string;
                    description: string;
                    command: string;
                    params: {};
                    settings: {};
                };
            };
        };
        prod: {
            
            description: string;
            sharedParams: {
                
                env: string;
            };
            actions: {
                
                start: {
                    title: string;
                    description: string;
                    command: string;
                    params: {};
                    settings: {};
                };
            };
        };
        build: {
            
            description: string;
            sharedParams: {
                
                prod: boolean;
            };
            actions: {
                
                start: {
                    title: string;
                    description: string;
                    command: string;
                    params: {};
                    settings: {};
                };
            };
        };
    };
};
