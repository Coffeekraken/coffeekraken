export default function (api: any): {
    namespaces: {
        views: string[];
        'views.bare': string[];
        'views.sections': string[];
        'views.components': string[];
    };
    readonly cwd: any;
};
