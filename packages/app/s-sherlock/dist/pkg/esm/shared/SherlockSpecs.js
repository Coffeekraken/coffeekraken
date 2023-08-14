export const SSherlockNewSpaceSpec = {
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
export const SSherlockSpaceFsAdapterSpec = {
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
export const SSherlockSpaceGunAdapterSpec = {
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
export const SSherlockUserInfoSpec = {
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
export const SSherlockSpacePocketbaseAdapterSpec = {
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
export const SSherlockSpaceContentfulAdapterSpec = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFHO0lBQ2pDLElBQUksRUFBRSxRQUFRO0lBQ2QsS0FBSyxFQUFFLFdBQVc7SUFDbEIsV0FBVyxFQUFFLGlCQUFpQjtJQUM5QixLQUFLLEVBQUU7UUFDSCxHQUFHLEVBQUU7WUFDRCxJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSxXQUFXO1lBQ2xCLFdBQVcsRUFBRSxpQkFBaUI7WUFDOUIsUUFBUSxFQUFFLElBQUk7U0FDakI7UUFDRCxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSxNQUFNO1lBQ2IsV0FBVyxFQUFFLFlBQVk7WUFDekIsUUFBUSxFQUFFLElBQUk7U0FDakI7UUFDRCxXQUFXLEVBQUU7WUFDVCxJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBRSxhQUFhO1lBQ3BCLFdBQVcsRUFBRSxtQkFBbUI7U0FDbkM7UUFDRCxLQUFLLEVBQUU7WUFDSCxJQUFJLEVBQUUsT0FBTztZQUNiLEtBQUssRUFBRSxPQUFPO1lBQ2QsV0FBVyxFQUFFLGFBQWE7WUFDMUIsUUFBUSxFQUFFLElBQUk7U0FDakI7S0FDSjtDQUNKLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSwyQkFBMkIsR0FBRztJQUN2QyxJQUFJLEVBQUUsUUFBUTtJQUNkLEtBQUssRUFBRSxvQkFBb0I7SUFDM0IsV0FBVyxFQUNQLG9GQUFvRjtJQUN4RixLQUFLLEVBQUU7UUFDSCxNQUFNLEVBQUU7WUFDSixJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSxRQUFRO1lBQ2YsV0FBVyxFQUNQLGtFQUFrRTtZQUN0RSxRQUFRLEVBQUUsSUFBSTtZQUNkLFFBQVEsRUFBRSxJQUFJO1NBQ2pCO0tBQ0o7Q0FDSixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sNEJBQTRCLEdBQUc7SUFDeEMsSUFBSSxFQUFFLFFBQVE7SUFDZCxLQUFLLEVBQUUsbUJBQW1CO0lBQzFCLFdBQVcsRUFDUCw4T0FBOE87SUFDbFAsS0FBSyxFQUFFO1FBQ0gsUUFBUSxFQUFFO1lBQ04sSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsdUJBQXVCO1lBQzlCLFdBQVcsRUFDUCwyRUFBMkU7WUFDL0UsS0FBSyxFQUFFO2dCQUNILE1BQU0sRUFBRSxJQUFJO2FBQ2Y7U0FDSjtLQUNKO0NBQ0osQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFHO0lBQ2pDLElBQUksRUFBRSxRQUFRO0lBQ2QsS0FBSyxFQUFFLG1CQUFtQjtJQUMxQixXQUFXLEVBQ1AsNkZBQTZGO0lBQ2pHLEtBQUssRUFBRTtRQUNILFFBQVEsRUFBRTtZQUNOLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLFVBQVU7WUFDakIsV0FBVyxFQUNQLDRFQUE0RTtZQUNoRixLQUFLLEVBQUU7Z0JBQ0gsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSjtRQUNELFFBQVEsRUFBRTtZQUNOLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLFVBQVU7WUFDakIsV0FBVyxFQUFFLCtCQUErQjtZQUM1QyxLQUFLLEVBQUU7Z0JBQ0gsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSjtRQUNELEtBQUssRUFBRTtZQUNILElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxXQUFXLEVBQ1AsMEZBQTBGO1lBQzlGLEtBQUssRUFBRTtnQkFDSCxLQUFLLEVBQUUsSUFBSTthQUNkO1NBQ0o7S0FDSjtDQUNKLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxtQ0FBbUMsR0FBRztJQUMvQyxJQUFJLEVBQUUsUUFBUTtJQUNkLEtBQUssRUFBRSxvQkFBb0I7SUFDM0IsV0FBVyxFQUNQLHdGQUF3RjtJQUM1RixLQUFLLEVBQUU7UUFDSCxHQUFHLEVBQUU7WUFDRCxJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSxZQUFZO1lBQ25CLFdBQVcsRUFDUCxnRkFBZ0Y7WUFDcEYsT0FBTyxFQUFFLHVCQUF1QjtZQUNoQyxLQUFLLEVBQUU7Z0JBQ0gsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsR0FBRyxFQUFFLElBQUk7YUFDWjtTQUNKO0tBQ0o7Q0FDSixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sbUNBQW1DLEdBQUc7SUFDL0MsSUFBSSxFQUFFLFFBQVE7SUFDZCxLQUFLLEVBQUUsb0JBQW9CO0lBQzNCLFdBQVcsRUFDUCxvRkFBb0Y7SUFDeEYsS0FBSyxFQUFFO1FBQ0gsS0FBSyxFQUFFO1lBQ0gsSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLFdBQVcsRUFBRSxnQ0FBZ0M7WUFDN0MsUUFBUSxFQUFFLElBQUk7U0FDakI7UUFDRCxXQUFXLEVBQUU7WUFDVCxJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSxjQUFjO1lBQ3JCLFdBQVcsRUFBRSwrQ0FBK0M7WUFDNUQsUUFBUSxFQUFFLElBQUk7U0FDakI7UUFDRCxxQkFBcUIsRUFBRTtZQUNuQixJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSx5QkFBeUI7WUFDaEMsV0FBVyxFQUNQLHdFQUF3RTtZQUM1RSxRQUFRLEVBQUUsSUFBSTtTQUNqQjtLQUNKO0NBQ0osQ0FBQyJ9