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
