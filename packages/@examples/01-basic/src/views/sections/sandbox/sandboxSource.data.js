export default {
    title: 'My cool source',
    description: 'My very cool source!',
    url: 'https://coffeekraken.io',
    values: {
        string: {
            value: 'From source',
            cool: null,
            media: {
                desktop: {
                    value: null,
                },
            },
        },
        select: {
            value: {
                id: 'value-3',
            },
        },
        checkbox: {
            value: [
                {
                    id: 'value-2',
                },
            ],
        },
        boolean: {
            value: true,
        },
        switch: {
            value: false,
        },
        integer: {
            value: 3,
        },
        color: {
            value: '#ff0000',
            format: 'hex',
        },
        wysiwyg: {
            value: {
                type: 'root',
                nodes: [
                    {
                        type: 'h1',
                        block: true,
                        nodes: [{ type: 'text', text: 'Hello World' }],
                    },
                    {
                        type: 'p',
                        block: true,
                        nodes: [{ type: 'text', text: 'How arey ou?' }],
                    },
                ],
            },
        },
        image: {
            url: '/dist/img/macbookair.png',
            title: 'Macbook air',
            alt: 'Macbook air',
            media: {
                desktop: {
                    url: '/dist/img/macbookair.png',
                },
                mobile: {
                    url: '/tmp/upload/Screenshot 2022-12-14 at 17.55.05.png',
                },
            },
        },
        spaces: {
            media: {
                desktop: {
                    paddingTop: 50,
                    marginRight: 20,
                },
            },
        },
    },
};
