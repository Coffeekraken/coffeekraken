const imgPath = '/dist/img/card-01.jpg';

export default {
    cardOne: {
        image: {
            url: imgPath,
            alt: '',
            title: '',
        },
        attributes: {
            's-appear': true,
            in: 'left',
            delay: '300-600',
        },
        title: 'Card title!',
        intro: 'Awesome card component',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec vestibulum mi. Etiam nec arcu ante.',
        cta: {
            label: 'CTA label...',
            color: 'accent',
            link: {
                url: '/contact',
                title: 'Discover more on apple.com',
            },
        },
        direction: 'horizontal',
    },
    cardTwo: {
        image: null,
        attributes: {
            's-appear': true,
            in: 'right',
            delay: '300-600',
        },
        title: 'Card title #1!',
        intro: 'Awesome card component',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        cta: {
            label: 'CTA label...',
            color: 'accent',
            link: {
                url: '/contact',
                title: 'Discover more on apple.com',
            },
        },
        direction: 'horizontal',
    },
};
