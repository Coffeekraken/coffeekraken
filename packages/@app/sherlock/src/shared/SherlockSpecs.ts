export const SSherlockNewSpaceSpec = {
    type: 'Object',
    title: 'New space',
    description: 'Add a new space',
    props: {
        uid: {
            type: 'String',
            title: 'Unique ID',
            description: 'Space unique id',
            required: true
        },
        name: {
            type: 'String',
            title: 'Name',
            description: 'Space name',
            required: true
        },
        description: {
            type: 'Text',
            title: 'Description',
            description: 'Space description'
        },
        image: {
            type: 'Image',
            title: 'Image',
            description: 'Space image'
        }
    }
}
