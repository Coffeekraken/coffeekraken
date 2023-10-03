import { faker } from '@faker-js/faker';

function generateCard() {
    return {
        title: faker.lorem.words({
            min: 2,
            max: 6,
        }),
        intro: faker.lorem.words({
            min: 3,
            max: 6,
        }),
        text: faker.lorem.words({
            min: 5,
            max: 15,
        }),
        image: {
            url: `https://picsum.photos/600?v=${Math.random()}`,
            title: faker.lorem.words({
                min: 3,
                max: 10,
            }),
            alt: faker.lorem.words({
                min: 3,
                max: 10,
            }),
        },
        ctas: [
            {
                color: {
                    id: 'accent',
                    value: 'accent',
                },
                text: faker.lorem.words({
                    min: 2,
                    max: 4,
                }),
                url: '#',
                title: '',
            },
            {
                color: {
                    id: 'main',
                    value: 'main',
                },
                lnf: {
                    id: 'outline',
                    value: 'outline',
                },
                text: faker.lorem.words({
                    min: 2,
                    max: 4,
                }),
                url: '#',
                title: '',
            },
        ],
    };
}

export default {
    cards: [
        generateCard(),
        generateCard(),
        generateCard(),
        // generateCard(),
        // generateCard(),
        // generateCard(),
    ],
    spaces: {
        marginTop: 50,
        marginBottom: 50,
    },
};
