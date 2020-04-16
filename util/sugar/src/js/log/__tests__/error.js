module.exports = (__error) => {

  describe('sugar.js.log.error', () => {

    const promises = [];

    promises.push(__error('Hello world'));

    it('Should have resolved the 1 error promise correctly', done => {

      Promise.all(promises).then((c) => {
        expect(c.length).toBe(1);
        done();
      });

    });

  });

}