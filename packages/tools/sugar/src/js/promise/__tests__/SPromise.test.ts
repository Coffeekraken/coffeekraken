// @shared

import __SPromise from '../SPromise';

describe('sugar.js.promise', () => {
  it('Should', async (done) => {
    console.log('NEW PROMISE');
    const promise = new __SPromise({
      coco: 'yyy'
    });

    setTimeout(() => {
      promise.resolve('Hello');
    }, 2000);

    const promiseRes = await promise;

    console.log(promise._settings);

    expect(promiseRes).toBe('Hello');

    done();
  });
});
