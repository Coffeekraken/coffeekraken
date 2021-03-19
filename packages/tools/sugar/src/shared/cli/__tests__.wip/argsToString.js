"use strict";
module.exports = (__argsToString) => {
    describe('sugar.js.cli.argsToString', () => {
        it('Should process the passed args object correctly', (done) => {
            const string = __argsToString({
                arg1: 'Hello world',
                boolArg: true,
                objArg: {
                    content: 'Nelson'
                },
                arrayArg: ['item0', 'item 1', 'item 2']
            }, {
                arg1: {
                    type: 'String',
                    description: 'Something',
                    alias: 'a',
                    default: 'Plop'
                },
                boolArg: {
                    type: 'Boolean',
                    description: 'Something',
                    alias: 'b',
                    default: false
                },
                objArg: {
                    type: 'Object',
                    description: 'Something',
                    default: {}
                },
                arrayArg: {
                    type: 'Array',
                    description: 'Something'
                }
            });
            expect(string).toBe("-a \"Hello world\" -b  --objArg \"{'content':'Nelson'}\" --arrayArg \"['item0','item 1','item 2']\"");
            done();
        });
        // it('Should process the passed args string correctly', (done) => {
        //   const string = __argsToString(
        //     `--arg1 "Hello world" -b --objArg "{'content':'Nelson'}"`,
        //     {
        //       arg1: {
        //         type: 'String',
        //         description: 'Something',
        //         alias: 'a',
        //         default: 'Plop'
        //       },
        //       boolArg: {
        //         type: 'Boolean',
        //         description: 'Something',
        //         alias: 'b',
        //         default: false
        //       },
        //       objArg: {
        //         type: 'Object',
        //         description: 'Something',
        //         default: {}
        //       },
        //       arrayArg: {
        //         type: 'Array',
        //         description: 'Something'
        //       }
        //     }
        //   );
        //   expect(string).toBe(
        //     '-a "Hello world" -b  --objArg "{\'content\':\'Nelson\'}"'
        //   );
        //   done();
        // });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJnc1RvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXJnc1RvU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsY0FBYyxFQUFFLEVBQUU7SUFDbEMsUUFBUSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtRQUN6QyxFQUFFLENBQUMsaURBQWlELEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM3RCxNQUFNLE1BQU0sR0FBRyxjQUFjLENBQzNCO2dCQUNFLElBQUksRUFBRSxhQUFhO2dCQUNuQixPQUFPLEVBQUUsSUFBSTtnQkFDYixNQUFNLEVBQUU7b0JBQ04sT0FBTyxFQUFFLFFBQVE7aUJBQ2xCO2dCQUNELFFBQVEsRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDO2FBQ3hDLEVBQ0Q7Z0JBQ0UsSUFBSSxFQUFFO29CQUNKLElBQUksRUFBRSxRQUFRO29CQUNkLFdBQVcsRUFBRSxXQUFXO29CQUN4QixLQUFLLEVBQUUsR0FBRztvQkFDVixPQUFPLEVBQUUsTUFBTTtpQkFDaEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLElBQUksRUFBRSxTQUFTO29CQUNmLFdBQVcsRUFBRSxXQUFXO29CQUN4QixLQUFLLEVBQUUsR0FBRztvQkFDVixPQUFPLEVBQUUsS0FBSztpQkFDZjtnQkFDRCxNQUFNLEVBQUU7b0JBQ04sSUFBSSxFQUFFLFFBQVE7b0JBQ2QsV0FBVyxFQUFFLFdBQVc7b0JBQ3hCLE9BQU8sRUFBRSxFQUFFO2lCQUNaO2dCQUNELFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsT0FBTztvQkFDYixXQUFXLEVBQUUsV0FBVztpQkFDekI7YUFDRixDQUNGLENBQUM7WUFFRixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUNqQixxR0FBcUcsQ0FDdEcsQ0FBQztZQUVGLElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUM7UUFFSCxvRUFBb0U7UUFDcEUsbUNBQW1DO1FBQ25DLGlFQUFpRTtRQUNqRSxRQUFRO1FBQ1IsZ0JBQWdCO1FBQ2hCLDBCQUEwQjtRQUMxQixvQ0FBb0M7UUFDcEMsc0JBQXNCO1FBQ3RCLDBCQUEwQjtRQUMxQixXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLDJCQUEyQjtRQUMzQixvQ0FBb0M7UUFDcEMsc0JBQXNCO1FBQ3RCLHlCQUF5QjtRQUN6QixXQUFXO1FBQ1gsa0JBQWtCO1FBQ2xCLDBCQUEwQjtRQUMxQixvQ0FBb0M7UUFDcEMsc0JBQXNCO1FBQ3RCLFdBQVc7UUFDWCxvQkFBb0I7UUFDcEIseUJBQXlCO1FBQ3pCLG1DQUFtQztRQUNuQyxVQUFVO1FBQ1YsUUFBUTtRQUNSLE9BQU87UUFFUCx5QkFBeUI7UUFDekIsaUVBQWlFO1FBQ2pFLE9BQU87UUFFUCxZQUFZO1FBQ1osTUFBTTtJQUNSLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=