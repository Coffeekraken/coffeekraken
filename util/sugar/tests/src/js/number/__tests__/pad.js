module.exports = (__pad) => {

  describe('sugar.js.number.pad', () => {

    it('Should pad the passed numbers correctly', () => {

      expect(__pad(13, 5)).toBe('00013');
      expect(__pad(13, 5, '#')).toBe('###13');

    });

  });

}