export default function (api) {
    if (api.env.platform !== 'node')
        return;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSCxZQUFZLEVBQUU7WUFDVixHQUFHLEVBQUU7Z0JBQ0QsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLElBQUksRUFBRTtvQkFDRixPQUFPLEVBQUU7d0JBQ0wsS0FBSyxFQUFFLFVBQVU7d0JBQ2pCLEdBQUcsRUFBRSx1QkFBdUI7cUJBQy9CO29CQUNELEtBQUssRUFBRTt3QkFDSCxLQUFLLEVBQUUsT0FBTzt3QkFDZCxHQUFHLEVBQUUsNkJBQTZCO3FCQUNyQztpQkFDSjthQUNKO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLE1BQU0sRUFBRSxTQUFTO2dCQUNqQixJQUFJLEVBQUU7b0JBQ0YsT0FBTyxFQUFFO3dCQUNMLEtBQUssRUFBRSxVQUFVO3dCQUNqQixHQUFHLEVBQUUsK0JBQStCO3FCQUN2QztvQkFDRCxLQUFLLEVBQUU7d0JBQ0gsS0FBSyxFQUFFLE9BQU87d0JBQ2QsR0FBRyxFQUFFLHFDQUFxQztxQkFDN0M7aUJBQ0o7YUFDSjtZQUNELE9BQU8sRUFBRTtnQkFDTCxNQUFNLEVBQUUsU0FBUztnQkFDakIsSUFBSSxFQUFFO29CQUNGLE9BQU8sRUFBRTt3QkFDTCxLQUFLLEVBQUUsVUFBVTt3QkFDakIsR0FBRyxFQUFFLCtCQUErQjtxQkFDdkM7b0JBQ0QsS0FBSyxFQUFFO3dCQUNILEtBQUssRUFBRSxPQUFPO3dCQUNkLEdBQUcsRUFBRSxxQ0FBcUM7cUJBQzdDO2lCQUNKO2FBQ0o7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsSUFBSSxFQUFFO29CQUNGLE9BQU8sRUFBRTt3QkFDTCxLQUFLLEVBQUUsVUFBVTt3QkFDakIsR0FBRyxFQUFFLDRCQUE0QjtxQkFDcEM7b0JBQ0QsS0FBSyxFQUFFO3dCQUNILEtBQUssRUFBRSxPQUFPO3dCQUNkLEdBQUcsRUFBRSxrQ0FBa0M7cUJBQzFDO2lCQUNKO2FBQ0o7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDIn0=