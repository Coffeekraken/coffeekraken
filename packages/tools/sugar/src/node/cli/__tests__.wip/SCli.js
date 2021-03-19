"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (__SCli, __SInterface) => {
    describe('sugar.node.cli.SCli', () => {
        it('Check that the SCli class work correctly', () => {
            class MyInterface extends __SInterface {
            }
            MyInterface.definition = {
                hostname: {
                    type: 'String',
                    description: 'Server hostname',
                    default: 'localhost'
                },
                port: {
                    type: 'Number',
                    description: 'Server port',
                    default: 8080
                },
                rootDir: {
                    type: 'String',
                    description: 'Root directory',
                    default: '.'
                },
                arg1: {
                    type: 'Boolean',
                    alias: 'a',
                    description: 'Argument 1',
                    default: true
                }
            };
            class MyCli extends __SCli {
                _run() { }
            }
            MyCli.command = 'php %hostname:%port %rootDir %arguments';
            MyCli.interfaces = {
                this: MyInterface
            };
            const cli = new MyCli();
            expect(cli.command).toBe('php %hostname:%port %rootDir %arguments');
            expect(typeof cli.interface).toBe('object');
            expect(cli.toString({
                port: 8888
            })).toBe('php localhost:8888 . -a');
            expect(cli.toString({
                port: 8888
            }, false)).toBe('php localhost:8888 .');
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQkFBZSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRTtJQUN0QyxRQUFRLENBQUMscUJBQXFCLEVBQUUsR0FBRyxFQUFFO1FBQ25DLEVBQUUsQ0FBQywwQ0FBMEMsRUFBRSxHQUFHLEVBQUU7WUFDbEQsTUFBTSxXQUFZLFNBQVEsWUFBWTs7WUFDN0Isc0JBQVUsR0FBRztnQkFDbEIsUUFBUSxFQUFFO29CQUNSLElBQUksRUFBRSxRQUFRO29CQUNkLFdBQVcsRUFBRSxpQkFBaUI7b0JBQzlCLE9BQU8sRUFBRSxXQUFXO2lCQUNyQjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLFFBQVE7b0JBQ2QsV0FBVyxFQUFFLGFBQWE7b0JBQzFCLE9BQU8sRUFBRSxJQUFJO2lCQUNkO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxXQUFXLEVBQUUsZ0JBQWdCO29CQUM3QixPQUFPLEVBQUUsR0FBRztpQkFDYjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLFNBQVM7b0JBQ2YsS0FBSyxFQUFFLEdBQUc7b0JBQ1YsV0FBVyxFQUFFLFlBQVk7b0JBQ3pCLE9BQU8sRUFBRSxJQUFJO2lCQUNkO2FBQ0YsQ0FBQztZQUdKLE1BQU0sS0FBTSxTQUFRLE1BQU07Z0JBS3hCLElBQUksS0FBSSxDQUFDOztZQUpGLGFBQU8sR0FBRyx5Q0FBeUMsQ0FBQztZQUNwRCxnQkFBVSxHQUFHO2dCQUNsQixJQUFJLEVBQUUsV0FBVzthQUNsQixDQUFDO1lBSUosTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUV4QixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO1lBQ3BFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFNUMsTUFBTSxDQUNKLEdBQUcsQ0FBQyxRQUFRLENBQUM7Z0JBQ1gsSUFBSSxFQUFFLElBQUk7YUFDWCxDQUFDLENBQ0gsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUVsQyxNQUFNLENBQ0osR0FBRyxDQUFDLFFBQVEsQ0FDVjtnQkFDRSxJQUFJLEVBQUUsSUFBSTthQUNYLEVBQ0QsS0FBSyxDQUNOLENBQ0YsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=