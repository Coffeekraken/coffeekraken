export default {
    params: {
        path: '*',
    },
    views: [
        {
            data: 'docmapDocumentation',
            path: 'pages.markdown.markdown',
        },
    ],
    handler: 'dynamic',
};
