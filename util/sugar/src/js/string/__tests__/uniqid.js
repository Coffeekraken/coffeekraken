module.exports = (__uniqid) => {

  describe('sugar.js.string.uniqid', () => {


    it('Should process the passed string correctly', done => {

      expect(__uniqid().length).toBe(17);
      expect(__uniqid().length).toBe(17);

      done();
    });
  });

}