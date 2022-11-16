export default {
    slugs: ['/specs/*', '/package/:organisation/:package/specs/*'],
    params: {
        path: '*',
    },
    views: [
        {
            data: {
                handler: 'docmap',
                settings: {},
                params: {
                    path({ req }) {
                        return `/specs/${req.params.path}`;
                    },
                },
            },
            path: 'pages.specs.specs',
        },
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGVBQWU7SUFDYixLQUFLLEVBQUUsQ0FBQyxVQUFVLEVBQUUseUNBQXlDLENBQUM7SUFDOUQsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLEdBQUc7S0FDVjtJQUNELEtBQUssRUFBRTtRQUNMO1lBQ0UsSUFBSSxFQUFFO2dCQUNKLE9BQU8sRUFBRSxRQUFRO2dCQUNqQixRQUFRLEVBQUUsRUFBRTtnQkFDWixNQUFNLEVBQUU7b0JBQ04sSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFO3dCQUNWLE9BQU8sVUFBVSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNyQyxDQUFDO2lCQUNGO2FBQ0Y7WUFDRCxJQUFJLEVBQUUsbUJBQW1CO1NBQzFCO0tBQ0Y7Q0FDRixDQUFDIn0=