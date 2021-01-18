// @shared
// @ts-nocheck

import __SPromise from '../SPromise';

describe('sugar.js.promise', () => {
  it('Should', async (done) => {
    const promise = new __SPromise({
      coco: 'yyy'
    });

    setTimeout(() => {
      promise.resolve('Hello');
    }, 2000);

    const promiseRes = await promise;

    expect(promiseRes).toBe('Hello');

    done();
  });
});
