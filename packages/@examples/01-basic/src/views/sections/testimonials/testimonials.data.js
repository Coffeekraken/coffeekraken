import { faker } from '@faker-js/faker';

export default {
    bgColor: {
        format: 'hex',
        value: '#fdfdfd',
    },
    // title: faker.lorem.words({
    //     min: 2,
    //     max: 10,
    // }),
    // intro: faker.lorem.words({
    //     min: 10,
    //     max: 15,
    // }),
    testimonials: [
        {
            image: {
                url: faker.image.avatar(),
                title: 'Macbook air',
                alt: 'Macbook air',
            },
            name: faker.person.fullName(),
            role: faker.person.jobTitle(),
            text: faker.lorem.words({
                min: 20,
                max: 40,
            }),
            rating: 3.5,
            total: 5,
            icon: '★',
        },
    ],
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
    container: 'full',
    spaces: {
        paddingTop: 70,
        paddingBottom: 70,
    },
};
