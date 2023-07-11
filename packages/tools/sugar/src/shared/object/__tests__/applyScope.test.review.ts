import __applyScope from '../applyScope.js';

describe('sugar.shared.object.applyScope', () => {
    it('Should apply a simple scope correctly', (done) => {
        const myObj = {
            myValue: 'Hello',
            '@dev': {
                myValue: 'World',
            },
            '@cool': {
                plop: 'yop',
            },
        };

        const applied = __applyScope(myObj, ['dev']);
        const notApplied = __applyScope(myObj, ['prod']);

        expect(applied).toEqual({
            myValue: 'World',
        });
        expect(notApplied).toEqual({
            myValue: 'Hello',
        });

        done();
    });

    it('Should apply a simple scope on a nested object correctly', (done) => {
        const myObj = {
            myValue: 'Hello',
            something: {
                else: 'plop',
            },
            'something@dev': {
                else: 'haha',
            },
        };

        const applied = __applyScope(myObj, ['dev']);

        expect(applied).toEqual({
            myValue: 'Hello',
            something: {
                else: 'haha',
            },
        });

        done();
    });

    it('Should apply a simple scope on a nested deep object correctly', (done) => {
        const myObj = {
            myValue: 'Hello',
            something: {
                else: 'plop',
            },
            'something@dev': {
                else: 'haha',
                '@dev': {
                    else: 'youhou',
                },
            },
        };

        const applied = __applyScope(myObj, ['dev']);

        expect(applied).toEqual({
            myValue: 'Hello',
            something: {
                else: 'youhou',
            },
        });

        done();
    });

    it('Should apply a simple scope on a non object property correctly', (done) => {
        const myObj = {
            myValue: 'Hello',
            'myValue@dev': 'Plop',
        };

        const applied = __applyScope(myObj, ['dev']);

        expect(applied).toEqual({
            myValue: 'Plop',
        });

        done();
    });
});
