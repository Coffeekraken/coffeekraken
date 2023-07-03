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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsRUFBRTtJQUN0QyxRQUFRLENBQUMsK0JBQStCLEVBQUUsR0FBRyxFQUFFO1FBQzdDLEVBQUUsQ0FBQyx5Q0FBeUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3JELE1BQU0sT0FBTyxHQUFHLGtCQUFrQixDQUNoQyw2Q0FBNkMsRUFDN0M7Z0JBQ0UsUUFBUSxFQUFFO29CQUNSLElBQUksRUFBRSxRQUFRO29CQUNkLFdBQVcsRUFBRSxpQkFBaUI7b0JBQzlCLE9BQU8sRUFBRSxXQUFXO2lCQUNyQjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLFFBQVE7b0JBQ2QsV0FBVyxFQUFFLGFBQWE7b0JBQzFCLE9BQU8sRUFBRSxJQUFJO2lCQUNkO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxXQUFXLEVBQUUsZ0JBQWdCO29CQUM3QixPQUFPLEVBQUUsR0FBRztpQkFDYjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLFNBQVM7b0JBQ2YsS0FBSyxFQUFFLEdBQUc7b0JBQ1YsV0FBVyxFQUFFLFlBQVk7b0JBQ3pCLE9BQU8sRUFBRSxJQUFJO2lCQUNkO2FBQ0YsRUFDRDtnQkFDRSxJQUFJLEVBQUUsSUFBSTthQUNYLENBQ0YsQ0FBQztZQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUVoRCxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==