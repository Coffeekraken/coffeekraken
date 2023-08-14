"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSherlockSpaceContentfulAdapterSpec = exports.SSherlockSpacePocketbaseAdapterSpec = exports.SSherlockUserInfoSpec = exports.SSherlockSpaceGunAdapterSpec = exports.SSherlockSpaceFsAdapterSpec = exports.SSherlockNewSpaceSpec = void 0;
exports.SSherlockNewSpaceSpec = {
    type: 'Object',
    title: 'New space',
    description: 'Add a new space',
    props: {
        uid: {
            type: 'String',
            title: 'Unique ID',
            description: 'Space unique id',
            required: true,
        },
        name: {
            type: 'String',
            title: 'Name',
            description: 'Space name',
            required: true,
        },
        description: {
            type: 'Text',
            title: 'Description',
            description: 'Space description',
        },
        image: {
            type: 'Image',
            title: 'Image',
            description: 'Space image',
            required: true,
        },
    },
};
exports.SSherlockSpaceFsAdapterSpec = {
    type: 'Object',
    title: 'Filesystem adapter',
    description: 'Filesystem adapter used to store sherlock data (clients, services, etc...) locally',
    props: {
        folder: {
            type: 'String',
            title: 'Folder',
            description: 'Specify a folder where to store the sherlock data for this space',
            readonly: true,
            required: true,
        },
    },
};
exports.SSherlockSpaceGunAdapterSpec = {
    type: 'Object',
    title: 'Gun adapter (p2p)',
    description: 'Gun(.js) is a decentralized realtime database that will allows you to sync your space clients, services, etc... as well as the ability to dispatch tasks to other members of your space. It can also be a server running the Sherlock server',
    props: {
        existing: {
            type: 'String',
            title: 'Existing gun space id',
            description: 'Paste here an existing gun space id to join it instead of creating anoter',
            rules: {
                base64: true,
            },
        },
    },
};
exports.SSherlockUserInfoSpec = {
    type: 'Object',
    title: 'User informations',
    description: 'These are your user informations that will be used to identify you in this particular space',
    props: {
        username: {
            type: 'String',
            title: 'Username',
            description: 'Choose a username that will be displayed for the other users of this space',
            rules: {
                required: true,
                alphanum: true,
            },
        },
        fullname: {
            type: 'String',
            title: 'Fullname',
            description: 'Enter your first and lastname',
            rules: {
                required: true,
            },
        },
        email: {
            type: 'String',
            title: 'Email',
            description: 'Your email will be used to send you notifications as well as display your Gravatar image',
            rules: {
                email: true,
            },
        },
    },
};
exports.SSherlockSpacePocketbaseAdapterSpec = {
    type: 'Object',
    title: 'Pocketbase adapter',
    description: 'Pocketbase is a wonderful 1 file server that let you work with live data, auth, etc...',
    props: {
        url: {
            type: 'String',
            title: 'Server url',
            description: 'Pocketbase server url with protocol (http:// or https://) and port (if needed)',
            default: 'http://127.0.0.1:8090',
            rules: {
                required: true,
                url: true,
            },
        },
    },
};
exports.SSherlockSpaceContentfulAdapterSpec = {
    type: 'Object',
    title: 'Contentful adapter',
    description: 'Contentful adapter used to store sherlock data (clients, services, etc...) locally',
    props: {
        space: {
            type: 'String',
            title: 'Space',
            description: 'Contentful space to connect to',
            required: true,
        },
        accessToken: {
            type: 'String',
            title: 'Access token',
            description: 'Contentful access token to use for connection',
            required: true,
        },
        managementAccessToken: {
            type: 'String',
            title: 'Management access token',
            description: 'Contentful management access token to be able to write results, etc...',
            required: true,
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFhLFFBQUEscUJBQXFCLEdBQUc7SUFDakMsSUFBSSxFQUFFLFFBQVE7SUFDZCxLQUFLLEVBQUUsV0FBVztJQUNsQixXQUFXLEVBQUUsaUJBQWlCO0lBQzlCLEtBQUssRUFBRTtRQUNILEdBQUcsRUFBRTtZQUNELElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLFdBQVc7WUFDbEIsV0FBVyxFQUFFLGlCQUFpQjtZQUM5QixRQUFRLEVBQUUsSUFBSTtTQUNqQjtRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLE1BQU07WUFDYixXQUFXLEVBQUUsWUFBWTtZQUN6QixRQUFRLEVBQUUsSUFBSTtTQUNqQjtRQUNELFdBQVcsRUFBRTtZQUNULElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLGFBQWE7WUFDcEIsV0FBVyxFQUFFLG1CQUFtQjtTQUNuQztRQUNELEtBQUssRUFBRTtZQUNILElBQUksRUFBRSxPQUFPO1lBQ2IsS0FBSyxFQUFFLE9BQU87WUFDZCxXQUFXLEVBQUUsYUFBYTtZQUMxQixRQUFRLEVBQUUsSUFBSTtTQUNqQjtLQUNKO0NBQ0osQ0FBQztBQUVXLFFBQUEsMkJBQTJCLEdBQUc7SUFDdkMsSUFBSSxFQUFFLFFBQVE7SUFDZCxLQUFLLEVBQUUsb0JBQW9CO0lBQzNCLFdBQVcsRUFDUCxvRkFBb0Y7SUFDeEYsS0FBSyxFQUFFO1FBQ0gsTUFBTSxFQUFFO1lBQ0osSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsUUFBUTtZQUNmLFdBQVcsRUFDUCxrRUFBa0U7WUFDdEUsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsSUFBSTtTQUNqQjtLQUNKO0NBQ0osQ0FBQztBQUVXLFFBQUEsNEJBQTRCLEdBQUc7SUFDeEMsSUFBSSxFQUFFLFFBQVE7SUFDZCxLQUFLLEVBQUUsbUJBQW1CO0lBQzFCLFdBQVcsRUFDUCw4T0FBOE87SUFDbFAsS0FBSyxFQUFFO1FBQ0gsUUFBUSxFQUFFO1lBQ04sSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsdUJBQXVCO1lBQzlCLFdBQVcsRUFDUCwyRUFBMkU7WUFDL0UsS0FBSyxFQUFFO2dCQUNILE1BQU0sRUFBRSxJQUFJO2FBQ2Y7U0FDSjtLQUNKO0NBQ0osQ0FBQztBQUVXLFFBQUEscUJBQXFCLEdBQUc7SUFDakMsSUFBSSxFQUFFLFFBQVE7SUFDZCxLQUFLLEVBQUUsbUJBQW1CO0lBQzFCLFdBQVcsRUFDUCw2RkFBNkY7SUFDakcsS0FBSyxFQUFFO1FBQ0gsUUFBUSxFQUFFO1lBQ04sSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsVUFBVTtZQUNqQixXQUFXLEVBQ1AsNEVBQTRFO1lBQ2hGLEtBQUssRUFBRTtnQkFDSCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtTQUNKO1FBQ0QsUUFBUSxFQUFFO1lBQ04sSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsVUFBVTtZQUNqQixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLEtBQUssRUFBRTtnQkFDSCxRQUFRLEVBQUUsSUFBSTthQUNqQjtTQUNKO1FBQ0QsS0FBSyxFQUFFO1lBQ0gsSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLFdBQVcsRUFDUCwwRkFBMEY7WUFDOUYsS0FBSyxFQUFFO2dCQUNILEtBQUssRUFBRSxJQUFJO2FBQ2Q7U0FDSjtLQUNKO0NBQ0osQ0FBQztBQUVXLFFBQUEsbUNBQW1DLEdBQUc7SUFDL0MsSUFBSSxFQUFFLFFBQVE7SUFDZCxLQUFLLEVBQUUsb0JBQW9CO0lBQzNCLFdBQVcsRUFDUCx3RkFBd0Y7SUFDNUYsS0FBSyxFQUFFO1FBQ0gsR0FBRyxFQUFFO1lBQ0QsSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsWUFBWTtZQUNuQixXQUFXLEVBQ1AsZ0ZBQWdGO1lBQ3BGLE9BQU8sRUFBRSx1QkFBdUI7WUFDaEMsS0FBSyxFQUFFO2dCQUNILFFBQVEsRUFBRSxJQUFJO2dCQUNkLEdBQUcsRUFBRSxJQUFJO2FBQ1o7U0FDSjtLQUNKO0NBQ0osQ0FBQztBQUVXLFFBQUEsbUNBQW1DLEdBQUc7SUFDL0MsSUFBSSxFQUFFLFFBQVE7SUFDZCxLQUFLLEVBQUUsb0JBQW9CO0lBQzNCLFdBQVcsRUFDUCxvRkFBb0Y7SUFDeEYsS0FBSyxFQUFFO1FBQ0gsS0FBSyxFQUFFO1lBQ0gsSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLFdBQVcsRUFBRSxnQ0FBZ0M7WUFDN0MsUUFBUSxFQUFFLElBQUk7U0FDakI7UUFDRCxXQUFXLEVBQUU7WUFDVCxJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSxjQUFjO1lBQ3JCLFdBQVcsRUFBRSwrQ0FBK0M7WUFDNUQsUUFBUSxFQUFFLElBQUk7U0FDakI7UUFDRCxxQkFBcUIsRUFBRTtZQUNuQixJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSx5QkFBeUI7WUFDaEMsV0FBVyxFQUNQLHdFQUF3RTtZQUM1RSxRQUFRLEVBQUUsSUFBSTtTQUNqQjtLQUNKO0NBQ0osQ0FBQyJ9