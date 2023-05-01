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
        };
        sections: {
            name: string;
            description: string;
        };
        components: {
            name: string;
            description: string;
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
    sources: {
        components: {
            title: string;
            specsNamespaces: string[];
        };
        sections: {
            title: string;
            specsNamespaces: string[];
        };
    };
};
