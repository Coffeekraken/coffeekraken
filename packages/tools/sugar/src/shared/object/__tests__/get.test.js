import __get from '../get';
describe('sugar.js.object.get', () => {
    it('Should get the object property correctly', (done) => {
        const obj1 = {
            hello: {
                world: 'hello world'
            },
            plop: {
                array: [0, 1, 2]
            }
        };
        const val1 = __get(obj1, 'hello.world');
        const val2 = __get(obj1, 'plop.array.2');
        expect(val1).toBe('hello world');
        expect(val2).toBe(2);
        done();
    });
    it('Should get the object property under an optional one', (done) => {
        const obj1 = {
            hello: {
                world: 'hello world'
            },
            plop: {
                array: [0, 1, 2]
            }
        };
        const obj2 = {
            hello: {
                coco: {
                    world: 'cc'
                },
                world: 'hello world'
            },
            plop: {
                array: [0, 1, 2]
            }
        };
        const obj3 = {
            hello: {
                world: 'xxx',
                ':coco': {
                    world: 'cc'
                }
            },
            plop: {
                array: [0, 1, 2]
            }
        };
        expect(__get(obj1, 'hello.something?.world')).toBe('hello world');
        expect(__get(obj2, 'hello.coco?.world')).toBe('cc');
        expect(__get(obj3, 'hello.plop?.:coco?.world')).toBe('cc');
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXQudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEtBQUssTUFBTSxRQUFRLENBQUM7QUFFM0IsUUFBUSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsRUFBRTtJQUNuQyxFQUFFLENBQUMsMENBQTBDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUN0RCxNQUFNLElBQUksR0FBRztZQUNYLEtBQUssRUFBRTtnQkFDTCxLQUFLLEVBQUUsYUFBYTthQUNyQjtZQUNELElBQUksRUFBRTtnQkFDSixLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNqQjtTQUNGLENBQUM7UUFFRixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFFekMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXJCLElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsc0RBQXNELEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNsRSxNQUFNLElBQUksR0FBRztZQUNYLEtBQUssRUFBRTtnQkFDTCxLQUFLLEVBQUUsYUFBYTthQUNyQjtZQUNELElBQUksRUFBRTtnQkFDSixLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNqQjtTQUNGLENBQUM7UUFDRixNQUFNLElBQUksR0FBRztZQUNYLEtBQUssRUFBRTtnQkFDTCxJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLElBQUk7aUJBQ1o7Z0JBQ0QsS0FBSyxFQUFFLGFBQWE7YUFDckI7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDakI7U0FDRixDQUFDO1FBRUYsTUFBTSxJQUFJLEdBQUc7WUFDWCxLQUFLLEVBQUU7Z0JBQ0wsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osT0FBTyxFQUFFO29CQUNQLEtBQUssRUFBRSxJQUFJO2lCQUNaO2FBQ0Y7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDakI7U0FDRixDQUFDO1FBRUYsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNsRSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BELE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLDBCQUEwQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFM0QsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=