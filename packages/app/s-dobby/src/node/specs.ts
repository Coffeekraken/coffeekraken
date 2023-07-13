export const SDobbyTask = {
    type: 'Object',
    title: 'SDobby task',
    description: 'Specify an SDobby task',
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
            required: true
        },
        description: {
            type: 'String',
            title: 'Description',
            description: 'The task description'
        },
        schedule: {
            type: 'String',
            title: 'Schedule',
            description: 'Schedule the task execution'
        }
    },
};
