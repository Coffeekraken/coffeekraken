import __sameItems from '../sameItems';

describe('@coffeekraken.sugar.shared.array.sameItems', () => {

    it('Should extract same items in simple number array', () => {
        const res = __sameItems(
            [1,2,3,4,5,6],
            [1,3,5,7]
        );
        expect(res).toEqual([1,3,5]);
    });

    it('Should extract same items in simple string array', () => {
        const res = __sameItems(
            ['hello','world','plop','coco'],
            ['world','coco']
        );
        expect(res).toEqual(['world','coco']);
    });

    it('Should extract same items in array of objects', () => {
        const res = __sameItems(
            [{
                hello: 'world'
            }, {
                plop: 'world'
            },{
                coco: 'world'
            }],
            [{
                hello1: 'world'
            }, {
                plop: 'world'
            }, {
                something: 'wrong'
            }]
        );
        expect(res).toEqual([{
            plop: 'world'
        }]);
    });

    it('Should extract same items in more that 2 arrays in simple number array', () => {
        const res = __sameItems(
            [1,2,3,4,5,6],
            [1,3,5,7],
            [1,5,6]
        );
        expect(res).toEqual([1,5]);
    });
    
    it('Should extract same items in array of objects and hashes disabled', () => {
        
        const plopObj = {
                plop: 'world'
            };

        const res = __sameItems(
            [{
                hello: 'world'
            }, plopObj ,{
                coco: 'world'
            }],
            [{
                hello1: 'world'
            }, plopObj, {
                something: 'wrong'
            }], {
                hash: false
            }
        );
        expect(res).toEqual([plopObj]);
    });

});