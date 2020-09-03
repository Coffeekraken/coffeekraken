const SPromise = require('./src/node/promise/SPromise');

function something() {
  return new SPromise((resolve, reject, trigger, cancel) => {
    // setTimeout(() => {
    resolve('COCO');
    // }, 1000);
  });
}

(async () => {
  const promise = something();
  console.log('CCC');
  await promise;
  console.log('XXX');
})();
