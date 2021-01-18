module.exports = (__proxy) => {
  describe('sugar.js.array.proxy', () => {
    it('Should proxy an array correctly', (done) => {
      const baseArray = ['a', 'b', 'c'];
      const myArray = __proxy(baseArray);

      let pushCount = 0;
      let popCount = 0;

      myArray.watch(['push', 'pop'], (watchObj) => {
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
