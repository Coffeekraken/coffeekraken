const spawn = require('./src/node/process/spawn');

(async () => {
  const pro = spawn(`node ${__dirname}/client.js`, [], {});
  pro.on('ipc.*', (v, metas) => {
    console.log('something', metas.stack, v);
  });
  let res = await pro;
  console.log('res', res);
})();
