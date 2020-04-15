module.exports = (__setRecursiveTimeout) => {

  describe('sugar.js.function.setRecursiveTimeout', () => {

    let calledCount = 0;

    __setRecursiveTimeout(() => {
      calledCount++;
    }, 100, 1000);

    it('Sould have called the function 10 times in 1s', done => {

      setTimeout(() => {
        expect(calledCount).toBe(10);
        done();
      }, 1100);
    })

  });

}