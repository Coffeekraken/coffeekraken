import __get from '../get';
describe('sugar.shared.object.get', () => {
    it('Should get the object property correctly', (done) => {
        const obj1 = {
            hello: {
                world: 'hello world',
            },
            plop: {
                array: [0, 1, 2],
            },
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
                world: 'hello world',
            },
            plop: {
                array: [0, 1, 2],
            },
        };
        const obj2 = {
            hello: {
                coco: {
                    world: 'cc',
                },
                world: 'hello world',
            },
            plop: {
                array: [0, 1, 2],
            },
        };
        const obj3 = {
            hello: {
                world: 'xxx',
                ':coco': {
                    world: 'cc',
                },
            },
            plop: {
                array: [0, 1, 2],
            },
        };
        expect(__get(obj1, 'hello.something?.world')).toBe('hello world');
        expect(__get(obj2, 'hello.coco?.world')).toBe('cc');
        expect(__get(obj3, 'hello.plop?.:coco?.world')).toBe('cc');
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxNQUFNLFFBQVEsQ0FBQztBQUUzQixRQUFRLENBQUMseUJBQXlCLEVBQUUsR0FBRyxFQUFFO0lBQ3JDLEVBQUUsQ0FBQywwQ0FBMEMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3BELE1BQU0sSUFBSSxHQUFHO1lBQ1QsS0FBSyxFQUFFO2dCQUNILEtBQUssRUFBRSxhQUFhO2FBQ3ZCO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ25CO1NBQ0osQ0FBQztRQUVGLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDeEMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztRQUV6QyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFckIsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxzREFBc0QsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ2hFLE1BQU0sSUFBSSxHQUFHO1lBQ1QsS0FBSyxFQUFFO2dCQUNILEtBQUssRUFBRSxhQUFhO2FBQ3ZCO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ25CO1NBQ0osQ0FBQztRQUNGLE1BQU0sSUFBSSxHQUFHO1lBQ1QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsSUFBSTtpQkFDZDtnQkFDRCxLQUFLLEVBQUUsYUFBYTthQUN2QjtZQUNELElBQUksRUFBRTtnQkFDRixLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNuQjtTQUNKLENBQUM7UUFFRixNQUFNLElBQUksR0FBRztZQUNULEtBQUssRUFBRTtnQkFDSCxLQUFLLEVBQUUsS0FBSztnQkFDWixPQUFPLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLElBQUk7aUJBQ2Q7YUFDSjtZQUNELElBQUksRUFBRTtnQkFDRixLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNuQjtTQUNKLENBQUM7UUFFRixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsMEJBQTBCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUzRCxJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==