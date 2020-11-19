module.exports = (__distanceBetween) => {

  describe('sugar.js.geom.distanceBetween', () => {

    const res = __distanceBetween({
      x: 20, y: 10
    }, {
      x: 10, y: 20
    });

    it('Should constrain the passed point correctly', () => {
      expect(res).toBe(14.142135623730951);
    });

  });

}