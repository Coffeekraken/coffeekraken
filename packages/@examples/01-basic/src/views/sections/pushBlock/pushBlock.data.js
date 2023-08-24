import { faker } from '@faker-js/faker';

export default {
    bkg: {
        url: '/dist/img/macos-wallpaper-01.jpg',
        title: 'Macbook air',
        alt: 'Macbook air',
    },
    image: {
        url: '/dist/img/macbookair.png',
        title: 'Macbook air',
        alt: 'Macbook air',
    },
    title: faker.lorem.words({
        min: 2,
        max: 10,
    }),
    intro: faker.lorem.words({
        min: 10,
        max: 15,
    }),
    text: faker.lorem.words({
        min: 20,
        max: 40,
    }),
    primaryCta: {
        color: {
            id: 'accent',
            value: 'accent',
        },
        link: {
            text: faker.lorem.words(2),
            url: '#',
            title: faker.lorem.words(2),
        },
    },
    secondaryCta: {
        lnf: {
            id: 'outline',
            value: 'outline',
        },
        color: {
            id: 'main',
            value: 'main',
        },
        link: {
            text: faker.lorem.words(2),
            url: '#',
            title: faker.lorem.words(2),
        },
    },
};
