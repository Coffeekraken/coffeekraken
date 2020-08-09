"use strict";

module.exports = __proxy => {
  describe('sugar.js.array.proxy', () => {
    it('Should proxy an array correctly', done => {
      var baseArray = ['a', 'b', 'c'];

      var myArray = __proxy(baseArray);

      var pushCount = 0;
      var popCount = 0;
      myArray.watch(['push', 'pop'], watchObj => {
        switch (watchObj.action) {
          case 'push':
            pushCount++;
            break;

          case 'pop':
            popCount++;
            break;
        }
      });
      myArray.push('coco');
      myArray.pop();
      expect(pushCount).toBe(1);
      expect(popCount).toBe(1);
      done();
    });
  });
};