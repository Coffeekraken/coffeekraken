import { faker } from '@faker-js/faker';

export default {
    image: {
        url: 'https://images.unsplash.com/photo-1559137651-1e81a7f924b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2664&q=80',
    },
    // imageSide: 'right', // setted in the .node.json file
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
    spaces: {
        paddingTop: 70,
        paddingBottom: 70,
        paddingInline: 50,
    },
};
