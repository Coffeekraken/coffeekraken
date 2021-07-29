import __applyScope from '../applyScope';
describe('sugar.shared.object.applyScope', () => {
    it('Should apply a simple scope correctly', (done) => {
        const myObj = {
            myValue: 'Hello',
            'env:dev': {
                myValue: 'World'
            },
            'something:cool': {
                plop: 'yop'
            }
        };
        const applied = __applyScope(myObj, {
            env: 'dev'
        });
        const notApplied = __applyScope(myObj, {
            env: 'prod'
        });
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
            'env:dev': {
                myValue: 'World',
                else: 'coco',
                'env:prod': {
                    else: 'else'
                }
            },
            'something:cool': {
                plop: 'yop'
            }
        };
        const applied = __applyScope(myObj, {
            env: ['dev', 'prod']
        });
        const notApplied = __applyScope(myObj, {
            env: 'prod',
            something: '*'
        });
        expect(applied).toEqual({
            myValue: 'World',
            else: 'else'
        });
        expect(notApplied).toEqual({
            myValue: 'Hello',
            plop: 'yop'
        });
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbHlTY29wZS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwbHlTY29wZS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxRQUFRLENBQUMsZ0NBQWdDLEVBQUUsR0FBRyxFQUFFO0lBQzlDLEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBRW5ELE1BQU0sS0FBSyxHQUFHO1lBQ1YsT0FBTyxFQUFFLE9BQU87WUFDaEIsU0FBUyxFQUFFO2dCQUNQLE9BQU8sRUFBRSxPQUFPO2FBQ25CO1lBQ0QsZ0JBQWdCLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLEtBQUs7YUFDZDtTQUNKLENBQUM7UUFFRixNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsS0FBSyxFQUFFO1lBQ2hDLEdBQUcsRUFBRSxLQUFLO1NBQ2IsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDLEtBQUssRUFBRTtZQUNuQyxHQUFHLEVBQUUsTUFBTTtTQUNkLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDcEIsT0FBTyxFQUFFLE9BQU87U0FDbkIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUN2QixPQUFPLEVBQUUsT0FBTztTQUNuQixDQUFDLENBQUM7UUFFSCxJQUFJLEVBQUUsQ0FBQztJQUNULENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDBEQUEwRCxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFFdEUsTUFBTSxLQUFLLEdBQUc7WUFDVixPQUFPLEVBQUUsT0FBTztZQUNoQixTQUFTLEVBQUU7Z0JBQ1AsT0FBTyxFQUFFLE9BQU87Z0JBQ2hCLElBQUksRUFBRSxNQUFNO2dCQUNaLFVBQVUsRUFBRTtvQkFDUixJQUFJLEVBQUUsTUFBTTtpQkFDZjthQUNKO1lBQ0QsZ0JBQWdCLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLEtBQUs7YUFDZDtTQUNKLENBQUM7UUFFRixNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsS0FBSyxFQUFFO1lBQ2hDLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBQyxNQUFNLENBQUM7U0FDdEIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDLEtBQUssRUFBRTtZQUNuQyxHQUFHLEVBQUUsTUFBTTtZQUNYLFNBQVMsRUFBRSxHQUFHO1NBQ2pCLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDcEIsT0FBTyxFQUFFLE9BQU87WUFDaEIsSUFBSSxFQUFFLE1BQU07U0FDZixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLElBQUksRUFBRSxLQUFLO1NBQ2QsQ0FBQyxDQUFDO1FBRUgsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQyxDQUFDIn0=