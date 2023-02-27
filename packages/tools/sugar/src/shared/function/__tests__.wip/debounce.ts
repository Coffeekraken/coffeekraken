module.exports = (__debounce) => {

  describe('sugar.js.function.debounce', () => {

    let calledCount = 0;

    const myCoolFn = __debounce(100, (param1) => {
      calledCount++;
    });

    myCoolFn();
    myCoolFn();
    myCoolFn();
    myCoolFn();
    myCoolFn();

    setTimeout(() => {
      myCoolFn();
    }, 120);


    it('Sould have called the function only 1 time', done => {

      setTimeout(() => {
        expect(calledCount).toBe(1);
        done();
      }, 130);
    })

  });

}