"use strict";
module.exports = (__argsToObject) => {
    describe('sugar.js.cli.argsToObject', () => {
        it('Should process the passed args object correctly', (done) => {
            const object = __argsToObject('-a Yop', {
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
            expect(object).toEqual({ arg1: 'Yop', boolArg: false, objArg: {} });
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJnc1RvT2JqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXJnc1RvT2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsY0FBYyxFQUFFLEVBQUU7SUFDbEMsUUFBUSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtRQUN6QyxFQUFFLENBQUMsaURBQWlELEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM3RCxNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsUUFBUSxFQUFFO2dCQUN0QyxJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLFFBQVE7b0JBQ2QsV0FBVyxFQUFFLFdBQVc7b0JBQ3hCLEtBQUssRUFBRSxHQUFHO29CQUNWLE9BQU8sRUFBRSxNQUFNO2lCQUNoQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsV0FBVyxFQUFFLFdBQVc7b0JBQ3hCLEtBQUssRUFBRSxHQUFHO29CQUNWLE9BQU8sRUFBRSxLQUFLO2lCQUNmO2dCQUNELE1BQU0sRUFBRTtvQkFDTixJQUFJLEVBQUUsUUFBUTtvQkFDZCxXQUFXLEVBQUUsV0FBVztvQkFDeEIsT0FBTyxFQUFFLEVBQUU7aUJBQ1o7Z0JBQ0QsUUFBUSxFQUFFO29CQUNSLElBQUksRUFBRSxPQUFPO29CQUNiLFdBQVcsRUFBRSxXQUFXO2lCQUN6QjthQUNGLENBQUMsQ0FBQztZQUVILE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFcEUsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=