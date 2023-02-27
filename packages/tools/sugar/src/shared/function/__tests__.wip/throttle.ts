module.exports = (__throttle) => {

  describe('sugar.js.function.throttle', () => {

    let calledCount = 0;
    const fn = __throttle(100, () => {
      calledCount++;
    });

    fn();
    fn();
    fn();
    fn();
    fn();
    fn();

    setTimeout(() => {
      fn();
      fn();
      fn();
    }, 150);

    it('Should have called the throttled function only 2 times', (done) => {
      setTimeout(() => {
        expect(calledCount).toBe(2);
        done();
      }, 200);
    });

  });

}