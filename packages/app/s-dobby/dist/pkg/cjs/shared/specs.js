"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDobbyTasksSpecsByType = exports.SDobbyPocketbasePoolSettingsSpecs = exports.SDobbyGunPoolSettingsSpecs = exports.SDobbyPoolStartParamsSpecs = exports.SDobbyEcoIndexTaskSpec = exports.SDobbyLighthouseTaskSpec = exports.SDobbyResponseTimeTaskSpec = exports.SDobbyTaskSpec = void 0;
exports.SDobbyTaskSpec = {
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
exports.SDobbyResponseTimeTaskSpec = {
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
exports.SDobbyLighthouseTaskSpec = {
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
exports.SDobbyEcoIndexTaskSpec = {
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
exports.SDobbyPoolStartParamsSpecs = {
    type: 'Object',
    title: 'Pool start params',
    description: 'Pool start parameters',
    props: {},
};
exports.SDobbyGunPoolSettingsSpecs = {
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
exports.SDobbyPocketbasePoolSettingsSpecs = {
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
exports.SDobbyTasksSpecsByType = {
    responseTime: exports.SDobbyResponseTimeTaskSpec,
    lighthouse: exports.SDobbyLighthouseTaskSpec,
    ecoindex: exports.SDobbyEcoIndexTaskSpec,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFhLFFBQUEsY0FBYyxHQUFHO0lBQzFCLElBQUksRUFBRSxRQUFRO0lBQ2QsS0FBSyxFQUFFLE1BQU07SUFDYixXQUFXLEVBQUUsMkJBQTJCO0lBQ3hDLEtBQUssRUFBRTtRQUNILEdBQUcsRUFBRTtZQUNELElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLEtBQUs7WUFDWixXQUFXLEVBQUUsZ0JBQWdCO1lBQzdCLFFBQVEsRUFBRSxJQUFJO1NBQ2pCO1FBQ0QsSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsTUFBTTtZQUNiLFdBQVcsRUFBRSxlQUFlO1lBQzVCLFFBQVEsRUFBRSxJQUFJO1NBQ2pCO1FBQ0QsV0FBVyxFQUFFO1lBQ1QsSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsYUFBYTtZQUNwQixXQUFXLEVBQUUsc0JBQXNCO1NBQ3RDO1FBQ0QsSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsTUFBTTtZQUNiLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsV0FBVyxFQUFFLG9CQUFvQjtZQUNqQyxPQUFPLEVBQUU7Z0JBQ0w7b0JBQ0ksRUFBRSxFQUFFLGNBQWM7b0JBQ2xCLElBQUksRUFBRSw2QkFBNkI7aUJBQ3RDO2dCQUNEO29CQUNJLEVBQUUsRUFBRSxZQUFZO29CQUNoQixJQUFJLEVBQUUsWUFBWTtpQkFDckI7Z0JBQ0Q7b0JBQ0ksRUFBRSxFQUFFLFVBQVU7b0JBQ2QsSUFBSSxFQUFFLFVBQVU7aUJBQ25CO2FBQ0o7WUFDRCxRQUFRLEVBQUUsSUFBSTtTQUNqQjtRQUNELFFBQVEsRUFBRTtZQUNOLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLFVBQVU7WUFDakIsV0FBVyxFQUNQLDBEQUEwRDtTQUNqRTtLQUNKO0NBQ0osQ0FB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