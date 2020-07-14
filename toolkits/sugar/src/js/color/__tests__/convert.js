module.exports = (__convert) => {

  describe('sugar.js.color.convert', () => {

    it('Should convert the color string #ff00ff to rgba object correctly', () => {
      expect(__convert('#ff00ff', 'rgba')).toEqual({
        r: 255, g: 0, b: 255, a: 1
      });
    });

    it('Should convert the color string #ff00ff to hsl object correctly', () => {
      expect(__convert('#ff00ff', 'hsl')).toEqual({
        h: 300, s: 100, l: 50
      });
    });

    it('Should convert the color string #ff00ff to hsv object correctly', () => {
      expect(__convert('#ff00ff', 'hsv')).toEqual({
        h: 300, s: 100, v: 100
      });
    });

    it('Should convert the color string #ff00ff to rgba string correctly', () => {
      expect(__convert('#ff00ff', 'rgbaString')).toBe('rgba(255,0,255,1)');
    });

    it('Should convert the color string #ff00ff to hsl string correctly', () => {
      expect(__convert('#ff00ff', 'hslString')).toBe('hsl(300,100,50)');
    });

    it('Should convert the color string #ff00ff to hsv string correctly', () => {
      expect(__convert('#ff00ff', 'hsvString')).toBe('hsv(300,100,100)');
    });

  });

}