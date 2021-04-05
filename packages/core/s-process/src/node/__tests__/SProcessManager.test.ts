import __MyProcess from './MyProcess';
import __SProcessManager from '../SProcessManager';

describe('s-process.SProcessManager', () => {
  //   it('Should handle a simple process correctly', async (done) => {
  //     const manager = new __SProcessManager();
  //     const pro = new __MyProcess();
  //     manager.attachProcess('main', pro);

  //     const res = await manager.run('main');

  //     expect(res.value).toEqual({
  //       param1: 'Hello',
  //       param2: true,
  //       help: false,
  //       crash: false
  //     });

  //     done();
  //   });

  it('Should handle a simple process that crash correctly', async (done) => {
    const manager = new __SProcessManager();
    const pro = new __MyProcess({
      crash: true
    });
    let restarted = 0;
    manager.attachProcess('main', pro, {
      restart: {
        delay: 500,
        before: (lastProcessObj) => {
          restarted++;
          if (restarted >= 3) return false;
          return lastProcessObj;
        }
      }
    });

    const res = await manager.run('main');

    expect(res.value).toEqual({
      param1: 'Hello',
      param2: true,
      crash: true,
      help: false
    });

    setTimeout(() => {
      done();
    }, 20000);
  });
});
