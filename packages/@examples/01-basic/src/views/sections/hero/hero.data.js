import { faker } from '@faker-js/faker';

export default {
    title: faker.lorem.sentence({
        min: 4,
        max: 8,
    }),
    intro: faker.lorem.sentence({
        min: 5,
        max: 15,
    }),
    text: faker.lorem.sentence({
        min: 15,
        max: 30,
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
        color: {
            id: 'complementary',
            value: 'complementary',
        },
        link: {
            text: faker.lorem.words(2),
            url: '#',
            title: faker.lorem.words(2),
        },
    },
};
