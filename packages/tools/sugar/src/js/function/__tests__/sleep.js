module.exports = (__sleep) => {

  describe('sugar.js.function.sleep', () => {

    let start, end;

    (async () => {
      start = Date.now();
      await __sleep(200);
      end = Date.now();
    })();

    it('Sould a difference between the start and the end time greater that 200', done => {
      setTimeout(() => {
        expect(end - start).toBeGreaterThan(195);
        done();
      }, 250);
    })


  });

}