"use strict";

module.exports = __SActionsStream => {
  describe('sugar.js.stream.SActionsStream', () => {
    let stepsCalled = 0,
        action1StepCalled = 0,
        startCalled = 0,
        errorCalled = 0;
    const stream = new __SActionsStream({
      action1: (settings = {}) => {
        return new Promise((resolve, reject) => {
          // console.log('action1');
          setTimeout(() => {
            settings.action1 = 'hello';
            resolve(settings);
          }, 1000);
        });
      },
      action2: (settings = {}) => {
        return new Promise((resolve, reject) => {
          // console.log('action2', settings);
          settings.action2 = 'world';
          setTimeout(() => {
            resolve(settings);
          }, 300);
        });
      }
    });
    stream.on('step', streamObj => {
      stepsCalled++; // console.log('streamObj', streamObj);
    });
    stream.on('action1.step', res => {
      action1StepCalled++; // console.log('action1 res', res);
    });
    stream.on('start', r => {
      startCalled++; // console.log('STA', r);
    });
    stream.on('error', r => {
      // console.log('ERROR', r);
      errorCalled++;
    });
    it('Should run the actions stream correctly', done => {
      const streamPromise = stream.start({
        something: 'yopyop'
      }).on('cancel,finally', result => {
        expect(stepsCalled).toBe(2);
        expect(action1StepCalled).toBe(1);
        expect(startCalled).toBe(2);
        expect(errorCalled).toBe(0);
        expect(Object.keys(result.actions).length).toBe(2);
        expect(typeof result.actions.action1.start).toBe('number');
        expect(typeof result.actions.action1.end).toBe('number');
        expect(typeof result.actions.action1.duration).toBe('number');
        expect(typeof result.actions.action1.streamObj).toBe('object');
        expect(typeof result.actions.action1.action).toBe('string');
        expect(typeof result.start).toBe('number');
        expect(typeof result.end).toBe('number');
        expect(typeof result.duration).toBe('number');
        expect(result.streamObj.something).toBe('yopyop');
        expect(result.streamObj.action1).toBe('hello');
        expect(result.streamObj.action2).toBe('world');
        done();
      });
    });
  });
};