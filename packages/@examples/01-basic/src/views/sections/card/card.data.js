const imgPath = '/dist/img/card-01.jpg';

export default {
    cardOne: {
        image: {
            url: imgPath,
            alt: '',
            title: '',
        },
        attributes: [
            {
                name: 's-appear',
                value: true,
            },
            {
                name: 'in',
                value: 'right',
            },
            {
                name: 'delay',
                value: '300-600',
            },
        ],
        title: 'Card title!',
        intro: 'Awesome card component',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec vestibulum mi. Etiam nec arcu ante.',
        cta: {
            color: {
                id: 'accent',
                name: 'Accent',
                value: 'accent',
            },
            link: {
                text: 'Click me!',
                url: '/contact',
                title: 'Discover more on apple.com',
            },
        },
        direction: {
            id: 'horizontal',
            name: 'Horizontal',
            value: 'horizontal',
        },
    },
    cardTwo: {
        image: null,
        attributes: [
            {
                name: 's-appear',
                value: true,
            },
            {
                name: 'in',
                value: 'right',
            },
            {
                name: 'delay',
                value: '300-600',
            },
        ],
        title: 'Card title #1!',
        intro: 'Awesome card component',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        cta: {
            color: {
                id: 'accent',
                name: 'Accent',
                value: 'accent',
            },
            link: {
                text: 'Click me!',
                url: '/contact',
                title: 'Discover more on apple.com',
            },
        },
        direction: {
            id: 'horizontal',
            name: 'Horizontal',
            value: 'horizontal',
        },
    },
};
