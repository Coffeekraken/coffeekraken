export default function (api) {
    return {
        environments: {
            dev: {
                branch: 'develop',
                urls: {
                    website: {
                        label: 'Template',
                        url: 'http://localhost:3000',
                    },
                    admin: {
                        label: 'Admin',
                        url: 'http://localhost:3000/admin',
                    },
                },
            },
            staging: {
                branch: 'staging',
                urls: {
                    website: {
                        label: 'Template',
                        url: 'http://staging.localhost:3000',
                    },
                    admin: {
                        label: 'Admin',
                        url: 'http://staging.localhost:3000/admin',
                    },
                },
            },
            preprod: {
                branch: 'preprod',
                urls: {
                    website: {
                        label: 'Template',
                        url: 'http://preprod.localhost:3000',
                    },
                    admin: {
                        label: 'Admin',
                        url: 'http://preprod.localhost:3000/admin',
                    },
                },
            },
            prod: {
                branch: 'prod',
                urls: {
                    website: {
                        label: 'Template',
                        url: 'http://prod.localhost:3000',
                    },
                    admin: {
                        label: 'Admin',
                        url: 'http://prod.localhost:3000/admin',
                    },
                },
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPO1FBQ0gsWUFBWSxFQUFFO1lBQ1YsR0FBRyxFQUFFO2dCQUNELE1BQU0sRUFBRSxTQUFTO2dCQUNqQixJQUFJLEVBQUU7b0JBQ0YsT0FBTyxFQUFFO3dCQUNMLEtBQUssRUFBRSxVQUFVO3dCQUNqQixHQUFHLEVBQUUsdUJBQXVCO3FCQUMvQjtvQkFDRCxLQUFLLEVBQUU7d0JBQ0gsS0FBSyxFQUFFLE9BQU87d0JBQ2QsR0FBRyxFQUFFLDZCQUE2QjtxQkFDckM7aUJBQ0o7YUFDSjtZQUNELE9BQU8sRUFBRTtnQkFDTCxNQUFNLEVBQUUsU0FBUztnQkFDakIsSUFBSSxFQUFFO29CQUNGLE9BQU8sRUFBRTt3QkFDTCxLQUFLLEVBQUUsVUFBVTt3QkFDakIsR0FBRyxFQUFFLCtCQUErQjtxQkFDdkM7b0JBQ0QsS0FBSyxFQUFFO3dCQUNILEtBQUssRUFBRSxPQUFPO3dCQUNkLEdBQUcsRUFBRSxxQ0FBcUM7cUJBQzdDO2lCQUNKO2FBQ0o7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLElBQUksRUFBRTtvQkFDRixPQUFPLEVBQUU7d0JBQ0wsS0FBSyxFQUFFLFVBQVU7d0JBQ2pCLEdBQUcsRUFBRSwrQkFBK0I7cUJBQ3ZDO29CQUNELEtBQUssRUFBRTt3QkFDSCxLQUFLLEVBQUUsT0FBTzt3QkFDZCxHQUFHLEVBQUUscUNBQXFDO3FCQUM3QztpQkFDSjthQUNKO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLE1BQU0sRUFBRSxNQUFNO2dCQUNkLElBQUksRUFBRTtvQkFDRixPQUFPLEVBQUU7d0JBQ0wsS0FBSyxFQUFFLFVBQVU7d0JBQ2pCLEdBQUcsRUFBRSw0QkFBNEI7cUJBQ3BDO29CQUNELEtBQUssRUFBRTt3QkFDSCxLQUFLLEVBQUUsT0FBTzt3QkFDZCxHQUFHLEVBQUUsa0NBQWtDO3FCQUMxQztpQkFDSjthQUNKO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9