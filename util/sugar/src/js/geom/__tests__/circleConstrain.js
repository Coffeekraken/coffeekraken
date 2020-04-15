module.exports = (__circleConstrain) => {

  describe('sugar.js.geom.circleConstrain', () => {

    const res = __circleConstrain({
      x: 20, y: 10
    }, 10, {
      x: 10, y: 5
    });

    it('Should constrain the passed point correctly', () => {
      expect(res).toEqual({
        x: 11.05572809000084,
        y: 5.527864045000419
      });
    });

  });

}