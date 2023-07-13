"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDobbyTask = void 0;
exports.SDobbyTask = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFhLFFBQUEsVUFBVSxHQUFHO0lBQ3RCLElBQUksRUFBRSxRQUFRO0lBQ2QsS0FBSyxFQUFFLGFBQWE7SUFDcEIsV0FBVyxFQUFFLHdCQUF3QjtJQUNyQyxLQUFLLEVBQUU7UUFDSCxHQUFHLEVBQUU7WUFDRCxJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSxLQUFLO1lBQ1osV0FBVyxFQUFFLGdCQUFnQjtZQUM3QixRQUFRLEVBQUUsSUFBSTtTQUNqQjtRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLE1BQU07WUFDYixXQUFXLEVBQUUsZUFBZTtZQUM1QixRQUFRLEVBQUUsSUFBSTtTQUNqQjtRQUNELFdBQVcsRUFBRTtZQUNULElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLGFBQWE7WUFDcEIsV0FBVyxFQUFFLHNCQUFzQjtTQUN0QztRQUNELFFBQVEsRUFBRTtZQUNOLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLFVBQVU7WUFDakIsV0FBVyxFQUFFLDZCQUE2QjtTQUM3QztLQUNKO0NBQ0osQ0FBQyJ9