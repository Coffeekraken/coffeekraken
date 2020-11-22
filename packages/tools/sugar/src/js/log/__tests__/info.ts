module.exports = (__info) => {

  describe('sugar.js.log.info', () => {

    const promises = [];

    promises.push(__info('Hello world'));

    it('Should have resolved the 1 log promise correctly', done => {

      Promise.all(promises).then((c) => {
        expect(c.length).toBe(1);
        done();
      });

    });

  });

}