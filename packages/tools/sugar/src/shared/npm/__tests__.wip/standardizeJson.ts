module.exports = (__standardizeJson) => {
  describe('sugar.js.nav.SNav', () => {
    it('Should standardize the passed json', (done) => {
      expect(
        __standardizeJson({
          contributors: [
            {
              name: 'Olivier Bossel',
              email: 'olivier.bossel@gmail.com',
              url: 'https://olivierbossel.com'
            },
            'Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)'
          ],
          author:
            'Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io) '
        })
      ).toEqual({
        contributors: [
          {
            name: 'Olivier Bossel',
            email: 'olivier.bossel@gmail.com',
            url: 'https://olivierbossel.com'
          },
          {
            name: 'Olivier Bossel',
            email: 'olivier.bossel@gmail.com',
            url: 'https://olivierbossel.com'
          }
        ],
        author: {
          name: 'Olivier Bossel',
          email: 'olivier.bossel@gmail.com',
          url: 'https://olivierbossel.com'
        }
      });

      done();
    });
  });
};
