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
