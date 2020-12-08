const __SProcess = require('./src/node/process/SProcess');
const __SPromise = require('./src/node/promise/SPromise');
const __isChildProcess = require('./src/node/is/childProcess');

class MyProcess extends __SProcess {
  constructor(settings = {}) {
    super(settings);
  }
  process(params, settings = {}) {
    return new __SPromise(async (resolve, reject, trigger, cancel) => {
      trigger('log', {
        value: 'Hello world'
      });
      setTimeout(() => {
        trigger('error', {
          value: 'End'
        });
        // process.exit();
      }, 2000);
    });
  }
}

const pro = new MyProcess({
  runAsChild: true
  // output: !__isChildProcess()
});
// if (!__isChildProcess()) {
//   pro.on('log,*.log', (v, metas) => {
//     console.log(__parseHtml(v && v.value ? v.value : v));
//   });
// }
pro.run();

// (async () => {
//   const pro = spawn(`node ${__dirname}/client.js`, [], {});
//   pro.on('*', (v, metas) => {
//     console.log('something', metas.stack, v);
//   });
//   let res = await pro;
//   console.log('res', res);
// })();
