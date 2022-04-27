export default {
    params: {
        namespace: true,
    },
    views: [
        {
            data: 'docmapMarkdown',
            path: 'pages.markdown.markdown',
        },
    ],
    handler: 'dynamic',
};
