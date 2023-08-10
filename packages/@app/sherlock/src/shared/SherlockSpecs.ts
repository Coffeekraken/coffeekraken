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
    description:
        'Filesystem adapter used to store sherlock data (clients, services, etc...) locally',
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
    description:
        'Gun(.js) is a decentralized realtime database that will allows you to sync your space clients, services, etc... as well as the ability to dispatch tasks to other members of your space. It can also be a server running the Sherlock server',
    props: {
        existing: {
            type: 'String',
            title: 'Existing gun space id',
            description:
                'Paste here an existing gun space id to join it instead of creating anoter',
            rules: {
                base64: true,
            },
        },
    },
};

export const SSherlockSpacePocketbaseAdapterSpec = {
    type: 'Object',
    title: 'Pocketbase adapter',
    description:
        'Pocketbase is a wonderful 1 file server that let you work with live data, auth, etc...',
    props: {
        url: {
            type: 'String',
            title: 'Server url',
            description:
                'Pocketbase server url with protocol (http:// or https://) and port (if needed)',
            rules: {
                url: true,
            },
        },
    },
};

export const SSherlockSpaceContentfulAdapterSpec = {
    type: 'Object',
    title: 'Contentful adapter',
    description:
        'Contentful adapter used to store sherlock data (clients, services, etc...) locally',
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
