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
                    name: 'Response time (ping + TTFB)',
                },
                {
                    id: 'lighthouse',
                    name: 'Lighthouse',
                },
                {
                    id: 'ecoindex',
                    name: 'Ecoindex',
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
export const SDobbyPocketbasePoolSettingsSpecs = {
    type: 'Object',
    title: 'Pocketbase pool settings',
    description: 'Specify the SDobby pocketbase pool settings',
    props: {
        url: {
            type: 'String',
            title: 'Server Url',
            description: 'Pocketbase server url',
            required: true,
        },
    },
};
export const SDobbyTasksSpecsByType = {
    responseTime: SDobbyResponseTimeTaskSpec,
    lighthouse: SDobbyLighthouseTaskSpec,
    ecoindex: SDobbyEcoIndexTaskSpec,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRztJQUMxQixJQUFJLEVBQUUsUUFBUTtJQUNkLEtBQUssRUFBRSxNQUFNO0lBQ2IsV0FBVyxFQUFFLDJCQUEyQjtJQUN4QyxLQUFLLEVBQUU7UUFDSCxHQUFHLEVBQUU7WUFDRCxJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSxLQUFLO1lBQ1osV0FBVyxFQUFFLGdCQUFnQjtZQUM3QixRQUFRLEVBQUUsSUFBSTtTQUNqQjtRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLE1BQU07WUFDYixXQUFXLEVBQUUsZUFBZTtZQUM1QixRQUFRLEVBQUUsSUFBSTtTQUNqQjtRQUNELFdBQVcsRUFBRTtZQUNULElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLGFBQWE7WUFDcEIsV0FBVyxFQUFFLHNCQUFzQjtTQUN0QztRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLE1BQU07WUFDYixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLFdBQVcsRUFBRSxvQkFBb0I7WUFDakMsT0FBTyxFQUFFO2dCQUNMO29CQUNJLEVBQUUsRUFBRSxjQUFjO29CQUNsQixJQUFJLEVBQUUsNkJBQTZCO2lCQUN0QztnQkFDRDtvQkFDSSxFQUFFLEVBQUUsWUFBWTtvQkFDaEIsSUFBSSxFQUFFLFlBQVk7aUJBQ3JCO2dCQUNEO29CQUNJLEVBQUUsRUFBRSxVQUFVO29CQUNkLElBQUksRUFBRSxVQUFVO2lCQUNuQjthQUNKO1lBQ0QsUUFBUSxFQUFFLElBQUk7U0FDakI7UUFDRCxRQUFRLEVBQUU7WUFDTixJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSxVQUFVO1lBQ2pCLFdBQVcsRUFDUCwwREFBMEQ7U0FDakU7S0FDSjtD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