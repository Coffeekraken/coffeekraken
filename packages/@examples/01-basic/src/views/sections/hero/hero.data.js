import { faker } from '@faker-js/faker';

export default {
    bgColor: {
        value: '#393A34',
    },
    bgImage: {
        url: 'https://images.unsplash.com/photo-1556888335-95371827d5fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2662&q=80',
    },
    variant: 'dark',
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
    ctas: [
        {
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
        {
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
    ],
    align: 'center',
};
