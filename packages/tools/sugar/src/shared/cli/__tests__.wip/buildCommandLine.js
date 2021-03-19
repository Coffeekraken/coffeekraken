"use strict";
module.exports = (__buildCommandLine) => {
    describe('sugar.js.cli.buildCommandLine', () => {
        it('Should build the command line correctly', (done) => {
            const command = __buildCommandLine('php [hostname]:[port] [rootDir] [arguments]', {
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
            }, {
                port: 8888
            });
            expect(command).toBe('php localhost:8888 . -a');
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRDb21tYW5kTGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJ1aWxkQ29tbWFuZExpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFO0lBQ3RDLFFBQVEsQ0FBQywrQkFBK0IsRUFBRSxHQUFHLEVBQUU7UUFDN0MsRUFBRSxDQUFDLHlDQUF5QyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDckQsTUFBTSxPQUFPLEdBQUcsa0JBQWtCLENBQ2hDLDZDQUE2QyxFQUM3QztnQkFDRSxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsV0FBVyxFQUFFLGlCQUFpQjtvQkFDOUIsT0FBTyxFQUFFLFdBQVc7aUJBQ3JCO2dCQUNELElBQUksRUFBRTtvQkFDSixJQUFJLEVBQUUsUUFBUTtvQkFDZCxXQUFXLEVBQUUsYUFBYTtvQkFDMUIsT0FBTyxFQUFFLElBQUk7aUJBQ2Q7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLElBQUksRUFBRSxRQUFRO29CQUNkLFdBQVcsRUFBRSxnQkFBZ0I7b0JBQzdCLE9BQU8sRUFBRSxHQUFHO2lCQUNiO2dCQUNELElBQUksRUFBRTtvQkFDSixJQUFJLEVBQUUsU0FBUztvQkFDZixLQUFLLEVBQUUsR0FBRztvQkFDVixXQUFXLEVBQUUsWUFBWTtvQkFDekIsT0FBTyxFQUFFLElBQUk7aUJBQ2Q7YUFDRixFQUNEO2dCQUNFLElBQUksRUFBRSxJQUFJO2FBQ1gsQ0FDRixDQUFDO1lBRUYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBRWhELElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9