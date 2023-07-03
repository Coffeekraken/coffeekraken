import __deepFilter from '../deepFilter';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxRQUFRLENBQUMsZ0NBQWdDLEVBQUUsR0FBRyxFQUFFO0lBQzVDLEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ2xELE1BQU0sS0FBSyxHQUFHO1lBQ1YsT0FBTyxFQUFFLE9BQU87WUFDaEIsR0FBRyxFQUFFO2dCQUNELFlBQVksRUFBRSxNQUFNO2FBQ3ZCO1NBQ0osQ0FBQztRQUVGLE1BQU0sT0FBTyxHQUFHLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRTtZQUM3RCxJQUFJLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxZQUFZO2dCQUFFLE9BQU8sSUFBSSxDQUFDO1lBQ3JDLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNwQixPQUFPLEVBQUUsT0FBTztZQUNoQixHQUFHLEVBQUU7Z0JBQ0QsWUFBWSxFQUFFLE1BQU07YUFDdkI7U0FDSixDQUFDLENBQUM7UUFFSCxJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHVEQUF1RCxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDakUsTUFBTSxHQUFHLEdBQUc7WUFDUixPQUFPLEVBQUUsT0FBTztZQUNoQixHQUFHLEVBQUU7Z0JBQ0QsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsWUFBWSxFQUFFLE1BQU07YUFDdkI7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFO29CQUNGLGVBQWUsRUFBRSxNQUFNO29CQUN2QixTQUFTLEVBQUUsS0FBSztpQkFDbkI7Z0JBQ0QsV0FBVyxFQUFFLE9BQU87YUFDdkI7U0FDSixDQUFDO1FBRUYsTUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFO1lBQzNELElBQUksR0FBRyxLQUFLLFdBQVc7Z0JBQUUsT0FBTyxLQUFLLENBQUM7WUFDdEMsSUFBSSxRQUFRO2dCQUFFLE9BQU87WUFDckIsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3BCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLEdBQUcsRUFBRTtnQkFDRCxZQUFZLEVBQUUsTUFBTTthQUN2QjtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUU7b0JBQ0YsZUFBZSxFQUFFLE1BQU07aUJBQzFCO2dCQUNELFdBQVcsRUFBRSxPQUFPO2FBQ3ZCO1NBQ0osQ0FBQyxDQUFDO1FBRUgsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=