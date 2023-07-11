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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLGtCQUFrQixDQUFDO0FBRTVDLFFBQVEsQ0FBQyxnQ0FBZ0MsRUFBRSxHQUFHLEVBQUU7SUFDNUMsRUFBRSxDQUFDLHVDQUF1QyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDakQsTUFBTSxLQUFLLEdBQUc7WUFDVixPQUFPLEVBQUUsT0FBTztZQUNoQixNQUFNLEVBQUU7Z0JBQ0osT0FBTyxFQUFFLE9BQU87YUFDbkI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLEtBQUs7YUFDZDtTQUNKLENBQUM7UUFFRixNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUM3QyxNQUFNLFVBQVUsR0FBRyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUVqRCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3BCLE9BQU8sRUFBRSxPQUFPO1NBQ25CLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDdkIsT0FBTyxFQUFFLE9BQU87U0FDbkIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywwREFBMEQsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3BFLE1BQU0sS0FBSyxHQUFHO1lBQ1YsT0FBTyxFQUFFLE9BQU87WUFDaEIsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRSxNQUFNO2FBQ2Y7WUFDRCxlQUFlLEVBQUU7Z0JBQ2IsSUFBSSxFQUFFLE1BQU07YUFDZjtTQUNKLENBQUM7UUFFRixNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUU3QyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3BCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFNBQVMsRUFBRTtnQkFDUCxJQUFJLEVBQUUsTUFBTTthQUNmO1NBQ0osQ0FBQyxDQUFDO1FBRUgsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywrREFBK0QsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3pFLE1BQU0sS0FBSyxHQUFHO1lBQ1YsT0FBTyxFQUFFLE9BQU87WUFDaEIsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRSxNQUFNO2FBQ2Y7WUFDRCxlQUFlLEVBQUU7Z0JBQ2IsSUFBSSxFQUFFLE1BQU07Z0JBQ1osTUFBTSxFQUFFO29CQUNKLElBQUksRUFBRSxRQUFRO2lCQUNqQjthQUNKO1NBQ0osQ0FBQztRQUVGLE1BQU0sT0FBTyxHQUFHLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRTdDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDcEIsT0FBTyxFQUFFLE9BQU87WUFDaEIsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRSxRQUFRO2FBQ2pCO1NBQ0osQ0FBQyxDQUFDO1FBRUgsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxnRUFBZ0UsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzFFLE1BQU0sS0FBSyxHQUFHO1lBQ1YsT0FBTyxFQUFFLE9BQU87WUFDaEIsYUFBYSxFQUFFLE1BQU07U0FDeEIsQ0FBQztRQUVGLE1BQU0sT0FBTyxHQUFHLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRTdDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDcEIsT0FBTyxFQUFFLE1BQU07U0FDbEIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=