const __dispatch = require('../dispatch');
const __subscribe = require('../on');

describe('sugar.node.event.subscribe', () => {
  it('Should dispatch and subscribe to events correctly', (done) => {
    let sendedValue = null;

    const unsubscribe = __subscribe('somethingcool', (v) => {
      sendedValue = v;
    });

    __dispatch('somethingcool', 'hello world');
    unsubscribe();
    __dispatch('somethingcool', 'plop');

    expect(sendedValue).toBe('hello world');

    done();
  });
});
