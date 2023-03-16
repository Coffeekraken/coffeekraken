export default function (api: any): {
    server: {
        port: number;
    };
    vite: {
        port: number;
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
