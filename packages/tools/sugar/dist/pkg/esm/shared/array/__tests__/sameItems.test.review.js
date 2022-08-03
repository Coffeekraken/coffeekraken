import __sameItems from '../sameItems';
describe('@coffeekraken.sugar.shared.array.sameItems', () => {
    it('Should extract same items in simple number array', () => {
        const res = __sameItems([1, 2, 3, 4, 5, 6], [1, 3, 5, 7]);
        expect(res).toEqual([1, 3, 5]);
    });
    it('Should extract same items in simple string array', () => {
        const res = __sameItems(['hello', 'world', 'plop', 'coco'], ['world', 'coco']);
        expect(res).toEqual(['world', 'coco']);
    });
    it('Should extract same items in array of objects', () => {
        const res = __sameItems([{
                hello: 'world'
            }, {
                plop: 'world'
            }, {
                coco: 'world'
            }], [{
                hello1: 'world'
            }, {
                plop: 'world'
            }, {
                something: 'wrong'
            }]);
        expect(res).toEqual([{
                plop: 'world'
            }]);
    });
    it('Should extract same items in more that 2 arrays in simple number array', () => {
        const res = __sameItems([1, 2, 3, 4, 5, 6], [1, 3, 5, 7], [1, 5, 6]);
        expect(res).toEqual([1, 5]);
    });
    it('Should extract same items in array of objects and hashes disabled', () => {
        const plopObj = {
            plop: 'world'
        };
        const res = __sameItems([{
                hello: 'world'
            }, plopObj, {
                coco: 'world'
            }], [{
                hello1: 'world'
            }, plopObj, {
                something: 'wrong'
            }], {
            hash: false
        });
        expect(res).toEqual([plopObj]);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLGNBQWMsQ0FBQztBQUV2QyxRQUFRLENBQUMsNENBQTRDLEVBQUUsR0FBRyxFQUFFO0lBRXhELEVBQUUsQ0FBQyxrREFBa0QsRUFBRSxHQUFHLEVBQUU7UUFDeEQsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUNuQixDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQ2IsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FDWixDQUFDO1FBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxrREFBa0QsRUFBRSxHQUFHLEVBQUU7UUFDeEQsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUNuQixDQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sQ0FBQyxFQUMvQixDQUFDLE9BQU8sRUFBQyxNQUFNLENBQUMsQ0FDbkIsQ0FBQztRQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUMxQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywrQ0FBK0MsRUFBRSxHQUFHLEVBQUU7UUFDckQsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUNuQixDQUFDO2dCQUNHLEtBQUssRUFBRSxPQUFPO2FBQ2pCLEVBQUU7Z0JBQ0MsSUFBSSxFQUFFLE9BQU87YUFDaEIsRUFBQztnQkFDRSxJQUFJLEVBQUUsT0FBTzthQUNoQixDQUFDLEVBQ0YsQ0FBQztnQkFDRyxNQUFNLEVBQUUsT0FBTzthQUNsQixFQUFFO2dCQUNDLElBQUksRUFBRSxPQUFPO2FBQ2hCLEVBQUU7Z0JBQ0MsU0FBUyxFQUFFLE9BQU87YUFDckIsQ0FBQyxDQUNMLENBQUM7UUFDRixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksRUFBRSxPQUFPO2FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsd0VBQXdFLEVBQUUsR0FBRyxFQUFFO1FBQzlFLE1BQU0sR0FBRyxHQUFHLFdBQVcsQ0FDbkIsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUNiLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQ1QsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUNWLENBQUM7UUFDRixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsbUVBQW1FLEVBQUUsR0FBRyxFQUFFO1FBRXpFLE1BQU0sT0FBTyxHQUFHO1lBQ1IsSUFBSSxFQUFFLE9BQU87U0FDaEIsQ0FBQztRQUVOLE1BQU0sR0FBRyxHQUFHLFdBQVcsQ0FDbkIsQ0FBQztnQkFDRyxLQUFLLEVBQUUsT0FBTzthQUNqQixFQUFFLE9BQU8sRUFBRTtnQkFDUixJQUFJLEVBQUUsT0FBTzthQUNoQixDQUFDLEVBQ0YsQ0FBQztnQkFDRyxNQUFNLEVBQUUsT0FBTzthQUNsQixFQUFFLE9BQU8sRUFBRTtnQkFDUixTQUFTLEVBQUUsT0FBTzthQUNyQixDQUFDLEVBQUU7WUFDQSxJQUFJLEVBQUUsS0FBSztTQUNkLENBQ0osQ0FBQztRQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQyxDQUFDO0FBRVAsQ0FBQyxDQUFDLENBQUMifQ==