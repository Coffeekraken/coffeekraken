// @shared
// @ts-nocheck

import __wait from '../../time/wait';
import __SPromise from '../SPromise';

describe('sugar.js.promise', () => {
  it('Should create and resolve a promise using API', async (done) => {
    const promise = new __SPromise({
      coco: 'yyy'
    });
    setTimeout(() => {
      promise.resolve('Hello');
    }, 100);
    const promiseRes = await promise;
    expect(promiseRes).toBe('Hello');
    done();
  });

  it('Should create and resolve a promise using executor function API', async (done) => {
    const promise = new __SPromise(async ({ resolve }) => {
      await __wait(100);
      resolve('Hello');
    });
    const promiseRes = await promise;
    expect(promiseRes).toBe('Hello');
    done();
  });

  it('Should create and emit an event that will be catched correctly', async (done) => {
    const promise = new __SPromise(async ({ resolve, emit }) => {
      await __wait(100);
      emit('update', 'World');
      await __wait(200);
      resolve('Hello');
    });
    let eventCatched = false;
    promise.on('update', (value, metas) => {
      console.log('UPDA', value, metas);
      if (value === 'World') eventCatched = true;
    });
    const promiseRes = await promise;
    expect(eventCatched).toBe(true);
    expect(promiseRes).toBe('Hello');
    done();
  });
});
