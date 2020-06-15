module.exports = (__bladePhp) => {
  describe('sugar.node.template.bladePhp', () => {
    it('Should compile the passed blade view correctly', async (done) => {
      const result = await __bladePhp(
        'default.blade.php',
        {
          title: 'Hello world',
          settings: {}
        },
        {
          rootDir: __dirname + '/views'
        }
      );

      expect(result.length).toBe(256);
      done();
    });
  });
};
