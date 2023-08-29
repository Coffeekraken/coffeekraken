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
    bgColor: {
        value: '#fdfdfd',
    },
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
    cards: {
        cards: [generateCard(), generateCard(), generateCard()],
        spaces: {
            marginTop: 50,
            marginBottom: 50,
        },
    },
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
    align: 'center',
    spaces: {
        paddingTop: 80,
        paddingBottom: 80,
    },
};
