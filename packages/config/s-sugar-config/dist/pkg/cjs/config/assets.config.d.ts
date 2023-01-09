export default function (api: any): {
    
    dev: {
        type: string;
        defer: boolean;
        src: string;
        env: string;
    };
    
    module: {
        type: string;
        defer: boolean;
        src: string;
        env: string;
    };
    
    nomodule: {
        nomodule: boolean;
        defer: boolean;
        src: string;
        env: string;
    };
    
    style: {
        id: string;
        defer: boolean;
        src: string;
    };
};
