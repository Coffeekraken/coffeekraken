import __camelCaseProps from '../camelCaseProps.js';

describe('sugar.shared.object.camelCaseProps', () => {
    it('Should process a simple 1 level object correctly', () => {
        const newObj = __camelCaseProps({
            'hello-world': true,
            plop: 'world',
            'plop-World': true,
        });

        expect(newObj).toEqual({
            helloWorld: true,
            plop: 'world',
            plopWorld: true,
        });
    });

    it('Should process a multiple levels object correctly', () => {
        const newObj = __camelCaseProps({
            'hello-world': true,
            plop: 'world',
            'plop-World': {
                yep: 'ok',
                plop_please: false,
            },
        });

        expect(newObj).toEqual({
            helloWorld: true,
            plop: 'world',
            plopWorld: {
                yep: 'ok',
                plopPlease: false,
            },
        });
    });
});
