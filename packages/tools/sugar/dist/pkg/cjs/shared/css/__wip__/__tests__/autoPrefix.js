"use strict";
module.exports = (__autoPrefix) => {
    describe('sugar.js.css.autoPrefix', () => {
        const style = `
      .hello {
        transition: '200ms all linear',
        boxSizing: 'border-box',
        display: 'flex',
        color: 'blue'

        &:after {
          content: 'coco';
        }
      }

      .plop {
        content: 'hehehe';
      }

    `;
        // const style = {
        //   transition: '200ms all linear',
        //   boxSizing: 'border-box',
        //   display: 'flex',
        //   color: 'blue',
        //   coco: {
        //     transition: '200ms all linear',
        //     boxSizing: 'border-box',
        //     display: 'flex',
        //     color: 'blue'
        //   }
        // }
        it('Should prefix correctly the passed style string', () => {
            console.log(__autoPrefix(style));
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsWUFBWSxFQUFFLEVBQUU7SUFFaEMsUUFBUSxDQUFDLHlCQUF5QixFQUFFLEdBQUcsRUFBRTtRQUV2QyxNQUFNLEtBQUssR0FBRzs7Ozs7Ozs7Ozs7Ozs7OztLQWdCYixDQUFDO1FBQ0Ysa0JBQWtCO1FBQ2xCLG9DQUFvQztRQUNwQyw2QkFBNkI7UUFDN0IscUJBQXFCO1FBQ3JCLG1CQUFtQjtRQUNuQixZQUFZO1FBQ1osc0NBQXNDO1FBQ3RDLCtCQUErQjtRQUMvQix1QkFBdUI7UUFDdkIsb0JBQW9CO1FBQ3BCLE1BQU07UUFDTixJQUFJO1FBRUosRUFBRSxDQUFDLGlEQUFpRCxFQUFFLEdBQUcsRUFBRTtZQUN6RCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRW5DLENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUEifQ==