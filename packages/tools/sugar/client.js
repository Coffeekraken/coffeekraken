const __wait = require('./src/node/time/wait');
const __SIpcClient = require('./src/node/ipc/SIpcClient');
const __toString = require('./src/node/string/toString');

(async () => {
  const client = await __SIpcClient.connectToParent();

  console.log('connected');

  client.trigger('plop', 'hello my cool world');

  console.log('COnnected');

  console.log('hello');

  await __wait(2000);
})();
