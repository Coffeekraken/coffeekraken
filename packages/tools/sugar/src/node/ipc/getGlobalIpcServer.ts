import SIpcServer from './SIpcServer';

/**
 * @name                getGlobalIpcServer
 * @namespace           sugar.node.ipc
 * @type                Function
 * @async
 *
 */
let _GlobalIpcServerInstance;
export = async function getGlobalIpcServer() {
  // if (SIpcServer.hasGlobalServer() === true) {
  //   return resolve(_GlobalIpcServerInstance);
  // }
  _GlobalIpcServerInstance = new SIpcServer();
  await _GlobalIpcServerInstance.start();
  console.log('SER', _GlobalIpcServerInstance);
  return _GlobalIpcServerInstance;
};
