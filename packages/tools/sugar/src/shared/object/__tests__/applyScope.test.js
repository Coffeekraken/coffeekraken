import __applyScope from '../applyScope';
describe('sugar.shared.object.applyScope', () => {
    it('Should apply a simple scope correctly', (done) => {
        const myObj = {
            myValue: 'Hello',
            '@dev': {
                myValue: 'World'
            },
            '@cool': {
                plop: 'yop'
            }
        };
        const applied = __applyScope(myObj, ['dev']);
        const notApplied = __applyScope(myObj, ['prod']);
        expect(applied).toEqual({
            myValue: 'World'
        });
        expect(notApplied).toEqual({
            myValue: 'Hello'
        });
        done();
    });
    it('Should apply a simple scope on a nested object correctly', (done) => {
        const myObj = {
            myValue: 'Hello',
            something: {
                else: 'plop'
            },
            'something@dev': {
                else: 'haha'
            }
        };
        const applied = __applyScope(myObj, ['dev']);
        expect(applied).toEqual({
            myValue: 'Hello',
            something: {
                else: 'haha'
            }
        });
        done();
    });
    it('Should apply a simple scope on a nested deep object correctly', (done) => {
        const myObj = {
            myValue: 'Hello',
            something: {
                else: 'plop'
            },
            'something@dev': {
                else: 'haha',
                '@dev': {
                    else: 'youhou'
                }
            }
        };
        const applied = __applyScope(myObj, ['dev']);
        expect(applied).toEqual({
            myValue: 'Hello',
            something: {
                else: 'youhou'
            }
        });
        done();
    });
    it('Should apply a simple scope on a non object property correctly', (done) => {
        const myObj = {
            myValue: 'Hello',
            'myValue@dev': 'Plop'
        };
        const applied = __applyScope(myObj, ['dev']);
        expect(applied).toEqual({
            myValue: 'Plop',
        });
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbHlTY29wZS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwbHlTY29wZS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxRQUFRLENBQUMsZ0NBQWdDLEVBQUUsR0FBRyxFQUFFO0lBQzlDLEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBRW5ELE1BQU0sS0FBSyxHQUFHO1lBQ1YsT0FBTyxFQUFFLE9BQU87WUFDaEIsTUFBTSxFQUFFO2dCQUNKLE9BQU8sRUFBRSxPQUFPO2FBQ25CO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxLQUFLO2FBQ2Q7U0FDSixDQUFDO1FBRUYsTUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDN0MsTUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFFakQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNwQixPQUFPLEVBQUUsT0FBTztTQUNuQixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxPQUFPO1NBQ25CLENBQUMsQ0FBQztRQUVILElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMERBQTBELEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUV0RSxNQUFNLEtBQUssR0FBRztZQUNWLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFNBQVMsRUFBRTtnQkFDUCxJQUFJLEVBQUUsTUFBTTthQUNmO1lBQ0QsZUFBZSxFQUFFO2dCQUNiLElBQUksRUFBRSxNQUFNO2FBQ2Y7U0FDSixDQUFDO1FBRUYsTUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFN0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNwQixPQUFPLEVBQUUsT0FBTztZQUNoQixTQUFTLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLE1BQU07YUFDZjtTQUNKLENBQUMsQ0FBQztRQUVILElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsK0RBQStELEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUUzRSxNQUFNLEtBQUssR0FBRztZQUNWLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFNBQVMsRUFBRTtnQkFDUCxJQUFJLEVBQUUsTUFBTTthQUNmO1lBQ0QsZUFBZSxFQUFFO2dCQUNiLElBQUksRUFBRSxNQUFNO2dCQUNaLE1BQU0sRUFBRTtvQkFDSixJQUFJLEVBQUUsUUFBUTtpQkFDakI7YUFDSjtTQUNKLENBQUM7UUFFRixNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUU3QyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3BCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFNBQVMsRUFBRTtnQkFDUCxJQUFJLEVBQUUsUUFBUTthQUNqQjtTQUNKLENBQUMsQ0FBQztRQUVILElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZ0VBQWdFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUU1RSxNQUFNLEtBQUssR0FBRztZQUNWLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLGFBQWEsRUFBRSxNQUFNO1NBQ3hCLENBQUM7UUFFRixNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUU3QyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3BCLE9BQU8sRUFBRSxNQUFNO1NBQ2xCLENBQUMsQ0FBQztRQUVILElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUMsQ0FBQyJ9