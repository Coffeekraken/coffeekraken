const __SPromise = require('../../node/promise/SPromise');

module.exports = async (stringargs = '') => {
  const promise1 = new __SPromise();
  const promise2 = new __SPromise();
  const promise3 = new __SPromise();

  promise1.on('*', (value, metas) => {
    console.log(value, metas);
  });

  __SPromise.pipe(promise3, promise2);
  __SPromise.pipe(promise2, promise1);

  setTimeout(() => {
    promise2.trigger('change', 'coco');
  }, 100);
};
