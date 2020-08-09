"use strict";

module.exports = __throttle => {
  describe('sugar.js.function.throttle', () => {
    var calledCount = 0;

    var fn = __throttle(() => {
      calledCount++;
    }, 100);

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
    it('Should have called the throttled function only 2 times', done => {
      setTimeout(() => {
        expect(calledCount).toBe(2);
        done();
      }, 200);
    });
  });
};