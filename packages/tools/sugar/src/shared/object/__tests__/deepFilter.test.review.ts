import __deepFilter from '../deepFilter.js';

describe('sugar.shared.object.deepFilter', () => {
    it('Should apply a simple filter correctly', (done) => {
        const myObj = {
            myValue: 'Hello',
            sub: {
                myOtherValue: 'plop',
            },
        };

        const applied = __deepFilter(myObj, ({ key, value, isObject }) => {
            if (value?.myOtherValue) return true;
            return true;
        });

        expect(applied).toEqual({
            myValue: 'Hello',
            sub: {
                myOtherValue: 'plop',
            },
        });

        done();
    });

    it('Should apply a slightly more complex filter correctly', (done) => {
        const obj = {
            myValue: 'Hello',
            sub: {
                doNotKeep: true,
                myOtherValue: 'plop',
            },
            sub2: {
                sub3: {
                    somethingToKeep: 'plop',
                    doNotKeep: false,
                },
                middleValue: 'hello',
            },
        };

        const applied = __deepFilter(obj, ({ key, value, isObject }) => {
            if (key === 'doNotKeep') return false;
            if (isObject) return;
            return true;
        });

        expect(applied).toEqual({
            myValue: 'Hello',
            sub: {
                myOtherValue: 'plop',
            },
            sub2: {
                sub3: {
                    somethingToKeep: 'plop',
                },
                middleValue: 'hello',
            },
        });

        done();
    });
});
