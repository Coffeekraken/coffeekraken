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
            required: true,
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
    },
};
export const SDobbyPoolStartParamsSpecs = {
    type: 'Object',
    title: 'Pool start params',
    description: 'Pool start parameters',
    props: {},
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
export const SDobbyGunJsAdapterSettingsSpecs = {
    type: 'Object',
    title: 'SDobby Gun JS adapter settings',
    description: 'Specify the SDobby Gun JS adapter settings',
    props: {
        key: {
            type: 'String',
            title: 'Gun JS storage key',
            description: 'Specify the Gun JS storage key',
            required: true,
        },
    },
};
export const SDobbyTasksSpecsByType = {
    responseTime: SDobbyResponseTimeTaskSpec,
    lighthouse: SDobbyLighthouseTaskSpec,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRztJQUMxQixJQUFJLEVBQUUsUUFBUTtJQUNkLEtBQUssRUFBRSxNQUFNO0lBQ2IsV0FBVyxFQUFFLDJCQUEyQjtJQUN4QyxLQUFLLEVBQUU7UUFDSCxHQUFHLEVBQUU7WUFDRCxJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSxLQUFLO1lBQ1osV0FBVyxFQUFFLGdCQUFnQjtZQUM3QixRQUFRLEVBQUUsSUFBSTtTQUNqQjtRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLE1BQU07WUFDYixXQUFXLEVBQUUsZUFBZTtZQUM1QixRQUFRLEVBQUUsSUFBSTtTQUNqQjtRQUNELFdBQVcsRUFBRTtZQUNULElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLGFBQWE7WUFDcEIsV0FBVyxFQUFFLHNCQUFzQjtTQUN0QztRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLE1BQU07WUFDYixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLFdBQVcsRUFBRSxvQkFBb0I7WUFDakMsT0FBTyxFQUFFO2dCQUNMO29CQUNJLEVBQUUsRUFBRSxjQUFjO29CQUNsQixJQUFJLEVBQUUsc0JBQXNCO2lCQUMvQjtnQkFDRDtvQkFDSSxFQUFFLEVBQUUsWUFBWTtvQkFDaEIsSUFBSSxFQUFFLFlBQVk7aUJBQ3JCO2FBQ0o7WUFDRCxRQUFRLEVBQUUsSUFBSTtTQUNqQjtRQUNELFFBQVEsRUFBRTtZQUNOLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLFVBQVU7WUFDakIsV0FBVyxFQUNQLDBEQUEwRDtZQUM5RCxRQUFRLEVBQUUsSUFBSTtTQUNqQjtLQUNKO0NBQ0osQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLDBCQUEwQixHQUFHO0lBQ3RDLElBQUksRUFBRSxRQUFRO0lBQ2QsS0FBSyxFQUFFLHNCQUFzQjtJQUM3QixXQUFXLEVBQUUsOERBQThEO0lBQzNFLEtBQUssRUFBRTtRQUNILEdBQUcsRUFBRTtZQUNELElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLEtBQUs7WUFDWixXQUFXLEVBQUUsYUFBYTtZQUMxQixRQUFRLEVBQUUsSUFBSTtTQUNqQjtLQUNKO0NBQ0osQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLDBCQUEwQixHQUFHO0lBQ3RDLElBQUksRUFBRSxRQUFRO0lBQ2QsS0FBSyxFQUFFLG1CQUFtQjtJQUMxQixXQUFXLEVBQUUsdUJBQXVCO0lBQ3BDLEtBQUssRUFBRSxFQUFFO0NBQ1osQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUFHO0lBQ3BDLElBQUksRUFBRSxRQUFRO0lBQ2QsS0FBSyxFQUFFLFlBQVk7SUFDbkIsV0FBVyxFQUFFLDRDQUE0QztJQUN6RCxLQUFLLEVBQUU7UUFDSCxHQUFHLEVBQUU7WUFDRCxJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSxLQUFLO1lBQ1osV0FBVyxFQUFFLDRDQUE0QztZQUN6RCxRQUFRLEVBQUUsSUFBSTtTQUNqQjtLQUNKO0NBQ0osQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLCtCQUErQixHQUFHO0lBQzNDLElBQUksRUFBRSxRQUFRO0lBQ2QsS0FBSyxFQUFFLGdDQUFnQztJQUN2QyxXQUFXLEVBQUUsNENBQTRDO0lBQ3pELEtBQUssRUFBRTtRQUNILEdBQUcsRUFBRTtZQUNELElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLG9CQUFvQjtZQUMzQixXQUFXLEVBQUUsZ0NBQWdDO1lBQzdDLFFBQVEsRUFBRSxJQUFJO1NBQ2pCO0tBQ0o7Q0FDSixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQUc7SUFDbEMsWUFBWSxFQUFFLDBCQUEwQjtJQUN4QyxVQUFVLEVBQUUsd0JBQXdCO0NBQ3ZDLENBQUMifQ==