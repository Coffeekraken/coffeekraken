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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1VybC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNVcmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRTtJQUUxQixRQUFRLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFO1FBRWpDLEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRSxDQUFNLElBQUksRUFBQyxFQUFFO1lBQ3hELE1BQU0sR0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLDRFQUE0RSxDQUFDLENBQUM7WUFDckcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ3hCLEtBQUssRUFBRSxPQUFPO2dCQUNkLEtBQUssRUFBRSxPQUFPO2FBQ2YsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUM3QyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QixNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQzdDLElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUdILEVBQUUsQ0FBQyx3REFBd0QsRUFBRSxDQUFNLElBQUksRUFBQyxFQUFFO1lBQ3hFLE1BQU0sR0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLDhFQUE4RSxFQUFFO2dCQUNyRyxNQUFNLEVBQUUsMkNBQTJDO2FBQ3BELENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDaEMsTUFBTSxFQUFFO29CQUNOLFFBQVEsRUFBRSxLQUFLO29CQUNmLEdBQUcsRUFBRSxpQkFBaUI7b0JBQ3RCLElBQUksRUFBRSxRQUFRO29CQUNkLEtBQUssRUFBRSxXQUFXO2lCQUNuQjtnQkFDRCxNQUFNLEVBQUU7b0JBQ04sUUFBUSxFQUFFLEtBQUs7b0JBQ2YsR0FBRyxFQUFFLFVBQVU7b0JBQ2YsSUFBSSxFQUFFLElBQUk7b0JBQ1YsS0FBSyxFQUFFLE1BQU07aUJBQ2Q7Z0JBQ0QsTUFBTSxFQUFFO29CQUNOLFFBQVEsRUFBRSxJQUFJO29CQUNkLEdBQUcsRUFBRSxrQkFBa0I7b0JBQ3ZCLElBQUksRUFBRSxRQUFRO29CQUNkLEtBQUssRUFBRSxDQUFDO2lCQUNUO2FBQ0YsQ0FBQyxDQUFDO1lBRUgsR0FBRyxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUM7WUFDNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUNoQyxNQUFNLEVBQUU7b0JBQ04sUUFBUSxFQUFFLEtBQUs7b0JBQ2YsR0FBRyxFQUFFLGlCQUFpQjtvQkFDdEIsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsS0FBSyxFQUFFLE1BQU07aUJBQ2Q7Z0JBQ0QsTUFBTSxFQUFFO29CQUNOLFFBQVEsRUFBRSxLQUFLO29CQUNmLEdBQUcsRUFBRSxVQUFVO29CQUNmLElBQUksRUFBRSxJQUFJO29CQUNWLEtBQUssRUFBRSxPQUFPO2lCQUNmO2dCQUNELE1BQU0sRUFBRTtvQkFDTixRQUFRLEVBQUUsSUFBSTtvQkFDZCxHQUFHLEVBQUUsa0JBQWtCO29CQUN2QixJQUFJLEVBQUUsUUFBUTtvQkFDZCxLQUFLLEVBQUUsSUFBSTtpQkFDWjthQUNGLENBQUMsQ0FBQztZQUVILEdBQUcsQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDaEMsTUFBTSxFQUFFO29CQUNOLEtBQUssRUFBRTt3QkFDTCxXQUFXLEVBQUUsaUVBQWlFO3dCQUM5RSxJQUFJLEVBQUUsTUFBTTt3QkFDWixNQUFNLEVBQUUsUUFBUTt3QkFDaEIsU0FBUyxFQUFFLFFBQVE7cUJBQ3BCO29CQUNELFFBQVEsRUFBRSxLQUFLO29CQUNmLEdBQUcsRUFBRSxpQkFBaUI7b0JBQ3RCLElBQUksRUFBRSxRQUFRO29CQUNkLEtBQUssRUFBRSxDQUFDO2lCQUNUO2dCQUNELE1BQU0sRUFBRTtvQkFDTixRQUFRLEVBQUUsS0FBSztvQkFDZixHQUFHLEVBQUUsVUFBVTtvQkFDZixJQUFJLEVBQUUsSUFBSTtvQkFDVixLQUFLLEVBQUUsT0FBTztpQkFDZjtnQkFDRCxNQUFNLEVBQUU7b0JBQ04sUUFBUSxFQUFFLElBQUk7b0JBQ2QsR0FBRyxFQUFFLGtCQUFrQjtvQkFDdkIsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsS0FBSyxFQUFFLENBQUM7aUJBQ1Q7YUFDRixDQUFDLENBQUM7WUFFSCxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFTCxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQSJ9