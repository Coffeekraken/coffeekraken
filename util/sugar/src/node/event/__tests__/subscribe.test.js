const __trigger = require('../trigger');
const __subscribe = require('../subscribe');

describe('sugar.node.event.subscribe', () => {
  it('Should trigger and subscribe to events correctly', (done) => {
    let sendedValue = null;

    const unsubscribe = __subscribe('somethingcool', (v) => {
      sendedValue = v;
    });

    __trigger('somethingcool', 'hello world');
    unsubscribe();
    __trigger('somethingcool', 'plop');

    expect(sendedValue).toBe('hello world');

    done();
  });
});
