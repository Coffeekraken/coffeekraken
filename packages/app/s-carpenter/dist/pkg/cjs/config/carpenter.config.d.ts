export default function (api: any): {
    server: {
        port: number;
    };
    vite: {
        port: number;
    };
    categories: {
        bare: {
            name: string;
            description: string;
            specsNamespaces: string[];
        };
        sections: {
            name: string;
            description: string;
            specsNamespaces: string[];
        };
        components: {
            name: string;
            description: string;
            specsNamespaces: string[];
        };
    };
    scopes: {
        user: {
            name: string;
            description: string;
            readonly rootDir: string;
        };
        repo: {
            name: string;
            description: string;
            readonly rootDir: string;
        };
    };
};
