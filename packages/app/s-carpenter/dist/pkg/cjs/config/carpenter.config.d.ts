export default function (api: any): {
    server: {
        port: number;
    };
    vite: {
        port: number;
    };
    namespaces: string[];
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
