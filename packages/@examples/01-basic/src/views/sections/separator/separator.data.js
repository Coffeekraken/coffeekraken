import { faker } from '@faker-js/faker';

export default {
    bgColor: {
        value: '#393A34',
    },
    bgImage: {
        url: 'https://images.unsplash.com/photo-1559137651-1e81a7f924b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2664&q=80',
    },
    align: 'end',
    title: faker.lorem.sentence({
        min: 4,
        max: 8,
    }),
    intro: faker.lorem.sentence({
        min: 5,
        max: 15,
    }),
    container: 'default',
    variant: 'dark',
    spaces: {
        paddingTop: 70,
        paddingBottom: 70,
    },
};
