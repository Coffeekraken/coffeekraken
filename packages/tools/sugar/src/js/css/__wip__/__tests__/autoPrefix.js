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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b1ByZWZpeC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dG9QcmVmaXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxZQUFZLEVBQUUsRUFBRTtJQUVoQyxRQUFRLENBQUMseUJBQXlCLEVBQUUsR0FBRyxFQUFFO1FBRXZDLE1BQU0sS0FBSyxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7O0tBZ0JiLENBQUM7UUFDRixrQkFBa0I7UUFDbEIsb0NBQW9DO1FBQ3BDLDZCQUE2QjtRQUM3QixxQkFBcUI7UUFDckIsbUJBQW1CO1FBQ25CLFlBQVk7UUFDWixzQ0FBc0M7UUFDdEMsK0JBQStCO1FBQy9CLHVCQUF1QjtRQUN2QixvQkFBb0I7UUFDcEIsTUFBTTtRQUNOLElBQUk7UUFFSixFQUFFLENBQUMsaURBQWlELEVBQUUsR0FBRyxFQUFFO1lBQ3pELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFbkMsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQSJ9