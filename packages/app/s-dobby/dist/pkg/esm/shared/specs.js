export const SDobbyTaskSpec = {
    type: 'Object',
    title: 'Task',
    description: 'Specify a task to execute',
    props: {
        uid: {
            type: 'String',
            title: 'UID',
            description: 'Task unique id',
            required: true,
        },
        name: {
            type: 'String',
            title: 'Name',
            description: 'The task name',
            required: true,
        },
        description: {
            type: 'String',
            title: 'Description',
            description: 'The task description',
        },
        type: {
            type: 'Select',
            title: 'type',
            description: 'Choose a task type to execute',
            placeholder: 'Select a task type',
            options: [
                {
                    id: 'responseTime',
                    name: 'Response time (ping)',
                },
                {
                    id: 'lighthouse',
                    name: 'Lighthouse',
                },
            ],
            required: true,
        },
        schedule: {
            type: 'String',
            title: 'Schedule',
            description: 'Schedule the task execution using the `unix-cron` format',
        },
    },
};
export const SDobbyResponseTimeTaskSpec = {
    type: 'Object',
    title: 'Response time (ping)',
    description: 'Ping a service to make sure it is online and respond quickly',
    props: {
        url: {
            type: 'String',
            title: 'Url',
            description: 'Url to ping',
            required: true,
        },
        timeout: {
            type: 'Number',
            title: 'Timeout',
            description: 'Timeout',
            default: 5000,
        },
    },
};
export const SDobbyLighthouseTaskSpec = {
    type: 'Object',
    title: 'Lighthouse',
    description: 'Execute lighthouse on a particular website',
    props: {
        url: {
            type: 'String',
            title: 'Url',
            description: 'Url of the page to inspect with lighthouse',
            required: true,
        },
    },
};
export const SDobbyEcoIndexTaskSpec = {
    type: 'Object',
    title: 'Lighthouse',
    description: 'Execute ecoindex on a particular website',
    props: {
        url: {
            type: 'String',
            title: 'Url',
            description: 'Url of the page to inspect with ecoindex',
            required: true,
        },
    },
};
export const SDobbyPoolStartParamsSpecs = {
    type: 'Object',
    title: 'Pool start params',
    description: 'Pool start parameters',
    props: {},
};
export const SDobbyGunPoolSettingsSpecs = {
    type: 'Object',
    title: 'SDobby Gun JS pool settings',
    description: 'Specify the SDobby Gun JS pool settings',
    props: {
        gunUid: {
            type: 'String',
            title: 'Gun JS unique key id',
            description: 'Specify the Gun JS storage unique key',
            required: true,
        },
        privateKey: {
            type: 'String',
            title: 'Private key',
            description: 'Specify the private key used to encrypt and decrypt data',
        },
    },
};
export const SDobbyTasksSpecsByType = {
    responseTime: SDobbyResponseTimeTaskSpec,
    lighthouse: SDobbyLighthouseTaskSpec,
    ecoindex: SDobbyEcoIndexTaskSpec,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRztJQUMxQixJQUFJLEVBQUUsUUFBUTtJQUNkLEtBQUssRUFBRSxNQUFNO0lBQ2IsV0FBVyxFQUFFLDJCQUEyQjtJQUN4QyxLQUFLLEVBQUU7UUFDSCxHQUFHLEVBQUU7WUFDRCxJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSxLQUFLO1lBQ1osV0FBVyxFQUFFLGdCQUFnQjtZQUM3QixRQUFRLEVBQUUsSUFBSTtTQUNqQjtRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLE1BQU07WUFDYixXQUFXLEVBQUUsZUFBZTtZQUM1QixRQUFRLEVBQUUsSUFBSTtTQUNqQjtRQUNELFdBQVcsRUFBRTtZQUNULElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLGFBQWE7WUFDcEIsV0FBVyxFQUFFLHNCQUFzQjtTQUN0QztRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLE1BQU07WUFDYixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLFdBQVcsRUFBRSxvQkFBb0I7WUFDakMsT0FBTyxFQUFFO2dCQUNMO29CQUNJLEVBQUUsRUFBRSxjQUFjO29CQUNsQixJQUFJLEVBQUUsc0JBQXNCO2lCQUMvQjtnQkFDRDtvQkFDSSxFQUFFLEVBQUUsWUFBWTtvQkFDaEIsSUFBSSxFQUFFLFlBQVk7aUJBQ3JCO2FBQ0o7WUFDRCxRQUFRLEVBQUUsSUFBSTtTQUNqQjtRQUNELFFBQVEsRUFBRTtZQUNOLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLFVBQVU7WUFDakIsV0FBVyxFQUNQLDBEQUEwRDtTQUNqRTtLQUNKO0NBQ0osQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLDBCQUEwQixHQUFHO0lBQ3RDLElBQUksRUFBRSxRQUFRO0lBQ2QsS0FBSyxFQUFFLHNCQUFzQjtJQUM3QixXQUFXLEVBQUUsOERBQThEO0lBQzNFLEtBQUssRUFBRTtRQUNILEdBQUcsRUFBRTtZQUNELElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLEtBQUs7WUFDWixXQUFXLEVBQUUsYUFBYTtZQUMxQixRQUFRLEVBQUUsSUFBSTtTQUNqQjtRQUNELE9BQU8sRUFBRTtZQUNMLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLFNBQVM7WUFDaEIsV0FBVyxFQUFFLFNBQVM7WUFDdEIsT0FBTyxFQUFFLElBQUk7U0FDaEI7S0FDSjtDQUNKLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSx3QkFBd0IsR0FBRztJQUNwQyxJQUFJLEVBQUUsUUFBUTtJQUNkLEtBQUssRUFBRSxZQUFZO0lBQ25CLFdBQVcsRUFBRSw0Q0FBNEM7SUFDekQsS0FBSyxFQUFFO1FBQ0gsR0FBRyxFQUFFO1lBQ0QsSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsS0FBSztZQUNaLFdBQVcsRUFBRSw0Q0FBNEM7WUFDekQsUUFBUSxFQUFFLElBQUk7U0FDakI7S0FDSjtDQUNKLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBRztJQUNsQyxJQUFJLEVBQUUsUUFBUTtJQUNkLEtBQUssRUFBRSxZQUFZO0lBQ25CLFdBQVcsRUFBRSwwQ0FBMEM7SUFDdkQsS0FBSyxFQUFFO1FBQ0gsR0FBRyxFQUFFO1lBQ0QsSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsS0FBSztZQUNaLFdBQVcsRUFBRSwwQ0FBMEM7WUFDdkQsUUFBUSxFQUFFLElBQUk7U0FDakI7S0FDSjtDQUNKLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSwwQkFBMEIsR0FBRztJQUN0QyxJQUFJLEVBQUUsUUFBUTtJQUNkLEtBQUssRUFBRSxtQkFBbUI7SUFDMUIsV0FBVyxFQUFFLHVCQUF1QjtJQUNwQyxLQUFLLEVBQUUsRUFBRTtDQUNaLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSwwQkFBMEIsR0FBRztJQUN0QyxJQUFJLEVBQUUsUUFBUTtJQUNkLEtBQUssRUFBRSw2QkFBNkI7SUFDcEMsV0FBVyxFQUFFLHlDQUF5QztJQUN0RCxLQUFLLEVBQUU7UUFDSCxNQUFNLEVBQUU7WUFDSixJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSxzQkFBc0I7WUFDN0IsV0FBVyxFQUFFLHVDQUF1QztZQUNwRCxRQUFRLEVBQUUsSUFBSTtTQUNqQjtRQUNELFVBQVUsRUFBRTtZQUNSLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLGFBQWE7WUFDcEIsV0FBVyxFQUNQLDBEQUEwRDtTQUNqRTtLQUNKO0NBQ0osQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFHO0lBQ2xDLFlBQVksRUFBRSwwQkFBMEI7SUFDeEMsVUFBVSxFQUFFLHdCQUF3QjtJQUNwQyxRQUFRLEVBQUUsc0JBQXNCO0NBQ25DLENBQUMifQ==