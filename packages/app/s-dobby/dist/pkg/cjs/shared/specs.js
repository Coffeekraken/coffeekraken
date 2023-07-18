"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDobbyTasksSpecsByType = exports.SDobbyGunJsAdapterSettingsSpecs = exports.SDobbyLighthouseTaskSpec = exports.SDobbyResponseTimeTaskSpec = exports.SDobbyTaskSpec = void 0;
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
exports.SDobbyGunJsAdapterSettingsSpecs = {
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
exports.SDobbyTasksSpecsByType = {
    responseTime: exports.SDobbyResponseTimeTaskSpec,
    lighthouse: exports.SDobbyLighthouseTaskSpec,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFhLFFBQUEsY0FBYyxHQUFHO0lBQzFCLElBQUksRUFBRSxRQUFRO0lBQ2QsS0FBSyxFQUFFLE1BQU07SUFDYixXQUFXLEVBQUUsMkJBQTJCO0lBQ3hDLEtBQUssRUFBRTtRQUNILEdBQUcsRUFBRTtZQUNELElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLEtBQUs7WUFDWixXQUFXLEVBQUUsZ0JBQWdCO1lBQzdCLFFBQVEsRUFBRSxJQUFJO1NBQ2pCO1FBQ0QsSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsTUFBTTtZQUNiLFdBQVcsRUFBRSxlQUFlO1lBQzVCLFFBQVEsRUFBRSxJQUFJO1NBQ2pCO1FBQ0QsV0FBVyxFQUFFO1lBQ1QsSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsYUFBYTtZQUNwQixXQUFXLEVBQUUsc0JBQXNCO1NBQ3RDO1FBQ0QsSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsTUFBTTtZQUNiLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsV0FBVyxFQUFFLG9CQUFvQjtZQUNqQyxPQUFPLEVBQUU7Z0JBQ0w7b0JBQ0ksRUFBRSxFQUFFLGNBQWM7b0JBQ2xCLElBQUksRUFBRSxzQkFBc0I7aUJBQy9CO2dCQUNEO29CQUNJLEVBQUUsRUFBRSxZQUFZO29CQUNoQixJQUFJLEVBQUUsWUFBWTtpQkFDckI7YUFDSjtZQUNELFFBQVEsRUFBRSxJQUFJO1NBQ2pCO1FBQ0QsUUFBUSxFQUFFO1lBQ04sSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsVUFBVTtZQUNqQixXQUFXLEVBQ1AsMERBQTBEO1lBQzlELFFBQVEsRUFBRSxJQUFJO1NBQ2pCO0tBQ0o7Q0FDSixDQUFDO0FBRVcsUUFBQSwwQkFBMEIsR0FBRztJQUN0QyxJQUFJLEVBQUUsUUFBUTtJQUNkLEtBQUssRUFBRSxzQkFBc0I7SUFDN0IsV0FBVyxFQUFFLDhEQUE4RDtJQUMzRSxLQUFLLEVBQUU7UUFDSCxHQUFHLEVBQUU7WUFDRCxJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSxLQUFLO1lBQ1osV0FBVyxFQUFFLGFBQWE7WUFDMUIsUUFBUSxFQUFFLElBQUk7U0FDakI7S0FDSjtDQUNKLENBQUM7QUFFVyxRQUFBLHdCQUF3QixHQUFHO0lBQ3BDLElBQUksRUFBRSxRQUFRO0lBQ2QsS0FBSyxFQUFFLFlBQVk7SUFDbkIsV0FBVyxFQUFFLDRDQUE0QztJQUN6RCxLQUFLLEVBQUU7UUFDSCxHQUFHLEVBQUU7WUFDRCxJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSxLQUFLO1lBQ1osV0FBVyxFQUFFLDRDQUE0QztZQUN6RCxRQUFRLEVBQUUsSUFBSTtTQUNqQjtLQUNKO0NBQ0osQ0FBQztBQUVXLFFBQUEsK0JBQStCLEdBQUc7SUFDM0MsSUFBSSxFQUFFLFFBQVE7SUFDZCxLQUFLLEVBQUUsZ0NBQWdDO0lBQ3ZDLFdBQVcsRUFBRSw0Q0FBNEM7SUFDekQsS0FBSyxFQUFFO1FBQ0gsR0FBRyxFQUFFO1lBQ0QsSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsb0JBQW9CO1lBQzNCLFdBQVcsRUFBRSxnQ0FBZ0M7WUFDN0MsUUFBUSxFQUFFLElBQUk7U0FDakI7S0FDSjtDQUNKLENBQUM7QUFFVyxRQUFBLHNCQUFzQixHQUFHO0lBQ2xDLFlBQVksRUFBRSxrQ0FBMEI7SUFDeEMsVUFBVSxFQUFFLGdDQUF3QjtDQUN2QyxDQUFDIn0=