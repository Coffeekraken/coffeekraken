export default {
    slugs: ['/doc/*', '/package/:organisation/:package/doc/*'],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGVBQWU7SUFDWCxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsdUNBQXVDLENBQUM7SUFDMUQsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLEdBQUc7S0FDWjtJQUNELEtBQUssRUFBRTtRQUNIO1lBQ0ksSUFBSSxFQUFFLHFCQUFxQjtZQUMzQixJQUFJLEVBQUUseUJBQXlCO1NBQ2xDO0tBQ0o7SUFDRCxPQUFPLEVBQUUsU0FBUztDQUNyQixDQUFDIn0=