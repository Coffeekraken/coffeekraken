"use strict";
module.exports = (__parseSchema) => {
    describe('sugar.js.url.parseSchema', () => {
        it('Should correctly parse the passed url using the passed schema', () => {
            const res = __parseSchema('https://github.com/myApp/master/3', '{project:string}/{?branch:string}/{?idx:number}');
            expect(res).toEqual({
                match: true,
                errors: null,
                params: {
                    project: {
                        optional: false,
                        raw: '{project:string}',
                        type: 'string',
                        value: 'myApp'
                    },
                    branch: {
                        optional: true,
                        raw: '{?branch:string}',
                        type: 'string',
                        value: 'master'
                    },
                    idx: {
                        optional: true,
                        raw: '{?idx:number}',
                        type: 'number',
                        value: 3
                    }
                },
                schema: '{project:string}/{?branch:string}/{?idx:number}',
                url: 'https://github.com/myApp/master/3'
            });
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsYUFBYSxFQUFFLEVBQUU7SUFDakMsUUFBUSxDQUFDLDBCQUEwQixFQUFFLEdBQUcsRUFBRTtRQUN4QyxFQUFFLENBQUMsK0RBQStELEVBQUUsR0FBRyxFQUFFO1lBQ3ZFLE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FDdkIsbUNBQW1DLEVBQ25DLGlEQUFpRCxDQUNsRCxDQUFDO1lBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDbEIsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsTUFBTSxFQUFFLElBQUk7Z0JBQ1osTUFBTSxFQUFFO29CQUNOLE9BQU8sRUFBRTt3QkFDUCxRQUFRLEVBQUUsS0FBSzt3QkFDZixHQUFHLEVBQUUsa0JBQWtCO3dCQUN2QixJQUFJLEVBQUUsUUFBUTt3QkFDZCxLQUFLLEVBQUUsT0FBTztxQkFDZjtvQkFDRCxNQUFNLEVBQUU7d0JBQ04sUUFBUSxFQUFFLElBQUk7d0JBQ2QsR0FBRyxFQUFFLGtCQUFrQjt3QkFDdkIsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsS0FBSyxFQUFFLFFBQVE7cUJBQ2hCO29CQUNELEdBQUcsRUFBRTt3QkFDSCxRQUFRLEVBQUUsSUFBSTt3QkFDZCxHQUFHLEVBQUUsZUFBZTt3QkFDcEIsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsS0FBSyxFQUFFLENBQUM7cUJBQ1Q7aUJBQ0Y7Z0JBQ0QsTUFBTSxFQUFFLGlEQUFpRDtnQkFDekQsR0FBRyxFQUFFLG1DQUFtQzthQUN6QyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=