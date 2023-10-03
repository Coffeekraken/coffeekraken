import { faker } from '@faker-js/faker';

export default {
    bkg: {
        url: '/dist/img/macos-wallpaper-01.jpg',
        title: 'Macbook air',
        alt: 'Macbook air',
    },
    image: {
        url: 'https://static.wixstatic.com/media/d921b2_e8352cef668e4f09b2aa3bc2d598eb46~mv2.png/v1/fill/w_664,h_498,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/imposing%2Bch.png',
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
    ctas: [
        {
            color: {
                id: 'accent',
                value: 'accent',
            },
            text: faker.lorem.words(2),
            url: '#',
            title: faker.lorem.words(2),
        },
        {
            lnf: {
                id: 'outline',
                value: 'outline',
            },
            color: {
                id: 'main',
                value: 'main',
            },
            text: faker.lorem.words(2),
            url: '#',
            title: faker.lorem.words(2),
        },
    ],
};
