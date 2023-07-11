import __deepMerge from '../deepMerge.js';

describe('sugar.shared.object.deepMerge', () => {
    it('Should merge two simple objects correctly', () => {
        const a = {
                myValue: 'Hello',
                sub: {
                    myOtherValue: 'plop',
                },
            },
            b = {
                something: 'else',
                sub: {
                    myOtherValue: 'yop',
                    newValue: 'world',
                },
            };

        const applied = __deepMerge(a, b);

        expect(applied).toEqual({
            myValue: 'Hello',
            something: 'else',
            sub: {
                myOtherValue: 'yop',
                newValue: 'world',
            },
        });
    });

    it('Should merge two objects with getter on the first one correctly', () => {
        const a = {
                myValue: 'Hello',
                sub: {
                    myOtherValue: 'plop',
                    get getter() {
                        return 'yop';
                    },
                },
            },
            b = {
                something: 'else',
                sub: {
                    myOtherValue: 'yop',
                    newValue: 'world',
                },
            };

        const applied = __deepMerge(a, b);

        expect(applied).toEqual({
            myValue: 'Hello',
            something: 'else',
            sub: {
                myOtherValue: 'yop',
                newValue: 'world',
                getter: 'yop',
            },
        });
    });

    it('Should merge two objects with getter on the first AND the second one correctly', () => {
        const a = {
                myValue: 'Hello',
                sub: {
                    myOtherValue: 'plop',
                    get getter() {
                        return 'yop';
                    },
                },
            },
            b = {
                something: 'else',
                sub: {
                    myOtherValue: 'yop',
                    newValue: 'world',
                    get getter2() {
                        return 'hey';
                    },
                },
            };

        const applied = __deepMerge(a, b);

        expect(applied).toEqual({
            myValue: 'Hello',
            something: 'else',
            sub: {
                myOtherValue: 'yop',
                newValue: 'world',
                getter: 'yop',
                getter2: 'hey',
            },
        });
    });

    it('Should merge two objects with getter on the first OVERIDED on the second one correctly', () => {
        const a = {
                myValue: 'Hello',
                sub: {
                    myOtherValue: 'plop',
                    get getter() {
                        return 'yop';
                    },
                },
            },
            b = {
                something: 'else',
                sub: {
                    myOtherValue: 'yop',
                    newValue: 'world',
                    get getter() {
                        return 'hey';
                    },
                },
            };

        const applied = __deepMerge(a, b);

        expect(applied).toEqual({
            myValue: 'Hello',
            something: 'else',
            sub: {
                myOtherValue: 'yop',
                newValue: 'world',
                getter: 'hey',
            },
        });
    });

    it('Should merge objects with array correctly', () => {
        const a = {
                myValue: 'Hello',
                sub: {
                    list: ['something'],
                },
            },
            b = {
                sub: {
                    list: ['else'],
                },
            };

        const applied = __deepMerge(a, b, {
            mergeArray: true,
        });

        expect(applied).toEqual({
            myValue: 'Hello',
            sub: {
                list: ['something', 'else'],
            },
        });
    });

    it('Should merge two objects with getter on the first OVERIDED on the second one AND access the first one value using the "this.$source" keyword correctly', () => {
        const a = {
                myValue: 'Hello',
                sub: {
                    myOtherValue: 'plop',
                    get getter() {
                        return ['hello'];
                    },
                },
            },
            b = {
                sub: {
                    get getter() {
                        return [...(this.$source?.getter || []), 'world'];
                    },
                },
            };

        const applied = __deepMerge(a, b, {
            mergeGetterSource: true,
        });

        expect(applied).toEqual({
            myValue: 'Hello',
            sub: {
                myOtherValue: 'plop',
                getter: ['hello', 'world'],
            },
        });
    });
});
