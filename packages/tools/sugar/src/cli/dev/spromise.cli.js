const __SPromise = require('../../node/promise/SPromise');

module.exports = async (stringargs = '') => {
  const prom = await new __SPromise((resolve, reject, trigger, api) => {
    console.log('COCO');
    api.cancel('plop');
  });

  if (prom.promise) {
    console.log('promise', prom.promise.isCanceled());
  }

  console.log(prom);
};
