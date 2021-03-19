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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VTY2hlbWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJzZVNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLGFBQWEsRUFBRSxFQUFFO0lBQ2pDLFFBQVEsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEVBQUU7UUFDeEMsRUFBRSxDQUFDLCtEQUErRCxFQUFFLEdBQUcsRUFBRTtZQUN2RSxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQ3ZCLG1DQUFtQyxFQUNuQyxpREFBaUQsQ0FDbEQsQ0FBQztZQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ2xCLEtBQUssRUFBRSxJQUFJO2dCQUNYLE1BQU0sRUFBRSxJQUFJO2dCQUNaLE1BQU0sRUFBRTtvQkFDTixPQUFPLEVBQUU7d0JBQ1AsUUFBUSxFQUFFLEtBQUs7d0JBQ2YsR0FBRyxFQUFFLGtCQUFrQjt3QkFDdkIsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsS0FBSyxFQUFFLE9BQU87cUJBQ2Y7b0JBQ0QsTUFBTSxFQUFFO3dCQUNOLFFBQVEsRUFBRSxJQUFJO3dCQUNkLEdBQUcsRUFBRSxrQkFBa0I7d0JBQ3ZCLElBQUksRUFBRSxRQUFRO3dCQUNkLEtBQUssRUFBRSxRQUFRO3FCQUNoQjtvQkFDRCxHQUFHLEVBQUU7d0JBQ0gsUUFBUSxFQUFFLElBQUk7d0JBQ2QsR0FBRyxFQUFFLGVBQWU7d0JBQ3BCLElBQUksRUFBRSxRQUFRO3dCQUNkLEtBQUssRUFBRSxDQUFDO3FCQUNUO2lCQUNGO2dCQUNELE1BQU0sRUFBRSxpREFBaUQ7Z0JBQ3pELEdBQUcsRUFBRSxtQ0FBbUM7YUFDekMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9