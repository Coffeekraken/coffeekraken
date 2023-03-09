export default function (api: any): {
    
    defaultAction: string;
    
    readonly defaultMedia: "mobile" | "desktop";
    
    method: string;
    
    containerName: string;
    queries: {
        
        mobile: {
            minWidth: number;
            maxWidth: number;
        };
        
        tablet: {
            minWidth: number;
            maxWidth: number;
        };
        
        desktop: {
            minWidth: number;
            maxWidth: number;
        };
        
        wide: {
            minWidth: number;
            maxWidth: any;
        };
    };
};
