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
            description:
                'Schedule the task execution using the `unix-cron` format',
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

export const SDobbyPoolStartParamsSpecs = {
    type: 'Object',
    title: 'Pool start params',
    description: 'Pool start parameters',
    props: {},
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
