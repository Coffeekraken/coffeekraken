export default {
    routes: {
        '/config/explorer/*': {
            handler: 'view',
            request: {
                params: {
                    '0': 'pages/config/explorer',
                },
            },
        },
        '/config/explorer': {
            handler: 'redirect',
            request: {
                redirect: '/config/explorer/docmap.config.js'
            },
        },
        '/doc/api': {
            handler: 'view',
            request: {
                params: {
                    '0': 'pages/doc/list',
                },
            },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGVBQWU7SUFDWCxNQUFNLEVBQUU7UUFDSixvQkFBb0IsRUFBRTtZQUNsQixPQUFPLEVBQUUsTUFBTTtZQUNmLE9BQU8sRUFBRTtnQkFDTCxNQUFNLEVBQUU7b0JBQ0osR0FBRyxFQUFFLHVCQUF1QjtpQkFDL0I7YUFDSjtTQUNKO1FBQ0Qsa0JBQWtCLEVBQUU7WUFDaEIsT0FBTyxFQUFFLFVBQVU7WUFDbkIsT0FBTyxFQUFFO2dCQUNMLFFBQVEsRUFBRSxtQ0FBbUM7YUFDaEQ7U0FDSjtRQUNELFVBQVUsRUFBRTtZQUNSLE9BQU8sRUFBRSxNQUFNO1lBQ2YsT0FBTyxFQUFFO2dCQUNMLE1BQU0sRUFBRTtvQkFDSixHQUFHLEVBQUUsZ0JBQWdCO2lCQUN4QjthQUNKO1NBQ0o7S0FDSjtDQUNKLENBQUMifQ==