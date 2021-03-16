module.exports = (__constrain) => {

  describe('sugar.js.number.constrain', () => {

    it('Should constrain the passed numbers correctly', () => {

      expect(__constrain(20, 10, 15)).toBe(15);
      expect(__constrain(2, 10, 15)).toBe(10);

    });

  });

}