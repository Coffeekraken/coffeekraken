"use strict";
module.exports = (__extractValues) => {
    describe('sugar.shared.object.extractValues', () => {
        it('Should extract correctly the values from an array ob objects', (done) => {
            const array = [
                {
                    hello: 'world',
                    plop: 'wijwoeijfewf',
                },
                {
                    hello: 'something',
                    plop: 'wijfjjfjfjf',
                },
                {
                    plop: 'something else',
                },
            ];
            expect(__extractValues(array, 'hello')).toEqual([
                'world',
                'something',
            ]);
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsZUFBZSxFQUFFLEVBQUU7SUFDakMsUUFBUSxDQUFDLG1DQUFtQyxFQUFFLEdBQUcsRUFBRTtRQUMvQyxFQUFFLENBQUMsOERBQThELEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN4RSxNQUFNLEtBQUssR0FBRztnQkFDVjtvQkFDSSxLQUFLLEVBQUUsT0FBTztvQkFDZCxJQUFJLEVBQUUsY0FBYztpQkFDdkI7Z0JBQ0Q7b0JBQ0ksS0FBSyxFQUFFLFdBQVc7b0JBQ2xCLElBQUksRUFBRSxhQUFhO2lCQUN0QjtnQkFDRDtvQkFDSSxJQUFJLEVBQUUsZ0JBQWdCO2lCQUN6QjthQUNKLENBQUM7WUFFRixNQUFNLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDNUMsT0FBTztnQkFDUCxXQUFXO2FBQ2QsQ0FBQyxDQUFDO1lBRUgsSUFBSSxFQUFFLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDIn0=