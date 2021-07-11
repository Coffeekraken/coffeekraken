import __SProcess from '@coffeekraken/s-process';
import __SFrontendServer from './SFrontendServer';
import __SFrontendServerInterface from './interface/SFrontendServerInterface';

export default async function start(stringArgs = '') {
  const server = new __SFrontendServer();
  const pro = await __SProcess.from(server.start.bind(server), {
    process: {
      interface: __SFrontendServerInterface
    }
  });
  pro.run(stringArgs);
}
