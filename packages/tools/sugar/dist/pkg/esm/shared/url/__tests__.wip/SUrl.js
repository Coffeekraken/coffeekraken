"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = (__SUrl) => {
    describe('sugar.js.url.SUrl', () => {
        it('Should build a simple url and parse it', (done) => __awaiter(void 0, void 0, void 0, function* () {
            const url = new __SUrl('https://coffeekraken.io:9999/something/cool?item1=hello&item2=world#toMake');
            expect(url.protocol).toBe('https:');
            expect(url.hash).toBe('#toMake');
            expect(url.query).toEqual({
                item1: 'hello',
                item2: 'world'
            });
            expect(url.pathname).toBe('/something/cool');
            expect(url.port).toBe(9999);
            expect(url.hostname).toBe('coffeekraken.io');
            done();
        }));
        it('Should nuild a complexe url with a schema and parse it', (done) => __awaiter(void 0, void 0, void 0, function* () {
            const url = new __SUrl('https://coffeekraken.io:9999/something/cool/2?item1=hello&item2=world#toMake', {
                schema: '{param1:string}/{param2}/{?param3:number}'
            });
            expect(url.schema.params).toEqual({
                param1: {
                    optional: false,
                    raw: '{param1:string}',
                    type: 'string',
                    value: 'something'
                },
                param2: {
                    optional: false,
                    raw: '{param2}',
                    type: null,
                    value: 'cool'
                },
                param3: {
                    optional: true,
                    raw: '{?param3:number}',
                    type: 'number',
                    value: 2
                }
            });
            url.pathname = 'some/other';
            expect(url.schema.params).toEqual({
                param1: {
                    optional: false,
                    raw: '{param1:string}',
                    type: 'string',
                    value: 'some'
                },
                param2: {
                    optional: false,
                    raw: '{param2}',
                    type: null,
                    value: 'other'
                },
                param3: {
                    optional: true,
                    raw: '{?param3:number}',
                    type: 'number',
                    value: null
                }
            });
            url.pathname = '3/other/3';
            expect(url.schema.params).toEqual({
                param1: {
                    error: {
                        description: `This param "param1" has to be a "string" but he's a "number"...`,
                        type: "type",
                        passed: "number",
                        requested: "string",
                    },
                    optional: false,
                    raw: '{param1:string}',
                    type: 'string',
                    value: 3
                },
                param2: {
                    optional: false,
                    raw: '{param2}',
                    type: null,
                    value: 'other'
                },
                param3: {
                    optional: true,
                    raw: '{?param3:number}',
                    type: 'number',
                    value: 3
                }
            });
            done();
        }));
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsTUFBTSxFQUFFLEVBQUU7SUFFMUIsUUFBUSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsRUFBRTtRQUVqQyxFQUFFLENBQUMsd0NBQXdDLEVBQUUsQ0FBTSxJQUFJLEVBQUMsRUFBRTtZQUN4RCxNQUFNLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyw0RUFBNEUsQ0FBQyxDQUFDO1lBQ3JHLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUN4QixLQUFLLEVBQUUsT0FBTztnQkFDZCxLQUFLLEVBQUUsT0FBTzthQUNmLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDN0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUM3QyxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQSxDQUFDLENBQUM7UUFHSCxFQUFFLENBQUMsd0RBQXdELEVBQUUsQ0FBTSxJQUFJLEVBQUMsRUFBRTtZQUN4RSxNQUFNLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyw4RUFBOEUsRUFBRTtnQkFDckcsTUFBTSxFQUFFLDJDQUEyQzthQUNwRCxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ2hDLE1BQU0sRUFBRTtvQkFDTixRQUFRLEVBQUUsS0FBSztvQkFDZixHQUFHLEVBQUUsaUJBQWlCO29CQUN0QixJQUFJLEVBQUUsUUFBUTtvQkFDZCxLQUFLLEVBQUUsV0FBVztpQkFDbkI7Z0JBQ0QsTUFBTSxFQUFFO29CQUNOLFFBQVEsRUFBRSxLQUFLO29CQUNmLEdBQUcsRUFBRSxVQUFVO29CQUNmLElBQUksRUFBRSxJQUFJO29CQUNWLEtBQUssRUFBRSxNQUFNO2lCQUNkO2dCQUNELE1BQU0sRUFBRTtvQkFDTixRQUFRLEVBQUUsSUFBSTtvQkFDZCxHQUFHLEVBQUUsa0JBQWtCO29CQUN2QixJQUFJLEVBQUUsUUFBUTtvQkFDZCxLQUFLLEVBQUUsQ0FBQztpQkFDVDthQUNGLENBQUMsQ0FBQztZQUVILEdBQUcsQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDaEMsTUFBTSxFQUFFO29CQUNOLFFBQVEsRUFBRSxLQUFLO29CQUNmLEdBQUcsRUFBRSxpQkFBaUI7b0JBQ3RCLElBQUksRUFBRSxRQUFRO29CQUNkLEtBQUssRUFBRSxNQUFNO2lCQUNkO2dCQUNELE1BQU0sRUFBRTtvQkFDTixRQUFRLEVBQUUsS0FBSztvQkFDZixHQUFHLEVBQUUsVUFBVTtvQkFDZixJQUFJLEVBQUUsSUFBSTtvQkFDVixLQUFLLEVBQUUsT0FBTztpQkFDZjtnQkFDRCxNQUFNLEVBQUU7b0JBQ04sUUFBUSxFQUFFLElBQUk7b0JBQ2QsR0FBRyxFQUFFLGtCQUFrQjtvQkFDdkIsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsS0FBSyxFQUFFLElBQUk7aUJBQ1o7YUFDRixDQUFDLENBQUM7WUFFSCxHQUFHLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQztZQUMzQixNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ2hDLE1BQU0sRUFBRTtvQkFDTixLQUFLLEVBQUU7d0JBQ0wsV0FBVyxFQUFFLGlFQUFpRTt3QkFDOUUsSUFBSSxFQUFFLE1BQU07d0JBQ1osTUFBTSxFQUFFLFFBQVE7d0JBQ2hCLFNBQVMsRUFBRSxRQUFRO3FCQUNwQjtvQkFDRCxRQUFRLEVBQUUsS0FBSztvQkFDZixHQUFHLEVBQUUsaUJBQWlCO29CQUN0QixJQUFJLEVBQUUsUUFBUTtvQkFDZCxLQUFLLEVBQUUsQ0FBQztpQkFDVDtnQkFDRCxNQUFNLEVBQUU7b0JBQ04sUUFBUSxFQUFFLEtBQUs7b0JBQ2YsR0FBRyxFQUFFLFVBQVU7b0JBQ2YsSUFBSSxFQUFFLElBQUk7b0JBQ1YsS0FBSyxFQUFFLE9BQU87aUJBQ2Y7Z0JBQ0QsTUFBTSxFQUFFO29CQUNOLFFBQVEsRUFBRSxJQUFJO29CQUNkLEdBQUcsRUFBRSxrQkFBa0I7b0JBQ3ZCLElBQUksRUFBRSxRQUFRO29CQUNkLEtBQUssRUFBRSxDQUFDO2lCQUNUO2FBQ0YsQ0FBQyxDQUFDO1lBRUgsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUEifQ==