"use strict";
module.exports = function (__autoPrefix) {
    describe('sugar.js.css.autoPrefix', function () {
        var style = "\n      .hello {\n        transition: '200ms all linear',\n        boxSizing: 'border-box',\n        display: 'flex',\n        color: 'blue'\n\n        &:after {\n          content: 'coco';\n        }\n      }\n\n      .plop {\n        content: 'hehehe';\n      }\n\n    ";
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
        it('Should prefix correctly the passed style string', function () {
            console.log(__autoPrefix(style));
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b1ByZWZpeC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dG9QcmVmaXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBQyxZQUFZO0lBRTVCLFFBQVEsQ0FBQyx5QkFBeUIsRUFBRTtRQUVsQyxJQUFNLEtBQUssR0FBRyxpUkFnQmIsQ0FBQztRQUNGLGtCQUFrQjtRQUNsQixvQ0FBb0M7UUFDcEMsNkJBQTZCO1FBQzdCLHFCQUFxQjtRQUNyQixtQkFBbUI7UUFDbkIsWUFBWTtRQUNaLHNDQUFzQztRQUN0QywrQkFBK0I7UUFDL0IsdUJBQXVCO1FBQ3ZCLG9CQUFvQjtRQUNwQixNQUFNO1FBQ04sSUFBSTtRQUVKLEVBQUUsQ0FBQyxpREFBaUQsRUFBRTtZQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRW5DLENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUEifQ==