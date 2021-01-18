module.exports = (__SDocMapItem) => {
  describe('sugar.node.doc.SDocMapItem', () => {
    it('Should generate correctly an SDocMapItem instance from a file', async (done) => {
      const item = new __SDocMapItem(`${__dirname}/../SDocMapItem.js`, {});

      const item1 = new __SDocMapItem(`${__dirname}/doc/README.md`, {});

      done();
    });
  });
};
