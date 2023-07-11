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
            if (value === null || value === void 0 ? void 0 : value.myOtherValue)
                return true;
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
            if (key === 'doNotKeep')
                return false;
            if (isObject)
                return;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLGtCQUFrQixDQUFDO0FBRTVDLFFBQVEsQ0FBQyxnQ0FBZ0MsRUFBRSxHQUFHLEVBQUU7SUFDNUMsRUFBRSxDQUFDLHdDQUF3QyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDbEQsTUFBTSxLQUFLLEdBQUc7WUFDVixPQUFPLEVBQUUsT0FBTztZQUNoQixHQUFHLEVBQUU7Z0JBQ0QsWUFBWSxFQUFFLE1BQU07YUFDdkI7U0FDSixDQUFDO1FBRUYsTUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFO1lBQzdELElBQUksS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLFlBQVk7Z0JBQUUsT0FBTyxJQUFJLENBQUM7WUFDckMsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3BCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLEdBQUcsRUFBRTtnQkFDRCxZQUFZLEVBQUUsTUFBTTthQUN2QjtTQUNKLENBQUMsQ0FBQztRQUVILElBQUksRUFBRSxDQUFDO0lBQ1gsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsdURBQXVELEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNqRSxNQUFNLEdBQUcsR0FBRztZQUNSLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLEdBQUcsRUFBRTtnQkFDRCxTQUFTLEVBQUUsSUFBSTtnQkFDZixZQUFZLEVBQUUsTUFBTTthQUN2QjtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUU7b0JBQ0YsZUFBZSxFQUFFLE1BQU07b0JBQ3ZCLFNBQVMsRUFBRSxLQUFLO2lCQUNuQjtnQkFDRCxXQUFXLEVBQUUsT0FBTzthQUN2QjtTQUNKLENBQUM7UUFFRixNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUU7WUFDM0QsSUFBSSxHQUFHLEtBQUssV0FBVztnQkFBRSxPQUFPLEtBQUssQ0FBQztZQUN0QyxJQUFJLFFBQVE7Z0JBQUUsT0FBTztZQUNyQixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDcEIsT0FBTyxFQUFFLE9BQU87WUFDaEIsR0FBRyxFQUFFO2dCQUNELFlBQVksRUFBRSxNQUFNO2FBQ3ZCO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRTtvQkFDRixlQUFlLEVBQUUsTUFBTTtpQkFDMUI7Z0JBQ0QsV0FBVyxFQUFFLE9BQU87YUFDdkI7U0FDSixDQUFDLENBQUM7UUFFSCxJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==