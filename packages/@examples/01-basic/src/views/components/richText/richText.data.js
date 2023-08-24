import { faker } from '@faker-js/faker';

export default {
    content: `
        <h1>${faker.lorem.sentence({
            min: 4,
            max: 10,
        })}</h1>
        <h5>${faker.lorem.sentence({
            min: 10,
            max: 30,
        })}</h5>
        <p>${faker.lorem.paragraph({
            min: 10,
            max: 20,
        })}</p>
    `,
};
