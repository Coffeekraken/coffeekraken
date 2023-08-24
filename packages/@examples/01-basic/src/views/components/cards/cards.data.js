import { faker } from '@faker-js/faker';

function generateCard() {
    return {
        title: faker.lorem.words({
            min: 2,
            max: 6,
        }),
        intro: faker.lorem.words({
            min: 3,
            max: 10,
        }),
        text: faker.lorem.words({
            min: 10,
            max: 20,
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
        primaryCta: {
            color: {
                id: 'accent',
                value: 'accent',
            },
            link: {
                text: faker.lorem.words({
                    min: 2,
                    max: 4,
                }),
                url: '#',
                title: '',
            },
        },
        secondaryCta: {
            color: {
                id: 'main',
                value: 'main',
            },
            lnf: {
                id: 'outline',
                value: 'outline',
            },
            link: {
                text: faker.lorem.words({
                    min: 2,
                    max: 4,
                }),
                url: '#',
                title: '',
            },
        },
    };
}

export default {
    cards: [
        generateCard(),
        generateCard(),
        generateCard(),
        generateCard(),
        generateCard(),
        generateCard(),
    ],
};
