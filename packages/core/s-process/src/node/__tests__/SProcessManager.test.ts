import __MyProcess from './MyProcess';
import __SProcessManager from '../SProcessManager';
import __wait from '@coffeekraken/sugar/shared/time/wait';

jest.setTimeout(30000);

describe('s-process.SProcessManager', () => {
  it('Should handle a simple process correctly', async () => {
    const manager = new __SProcessManager();
    const pro = new __MyProcess();
    manager.attachProcess('main', pro);

    const res = await manager.run('main');

    await __wait(10);

    expect(res.value).toEqual({
      param1: 'Hello',
      param2: true,
      help: false,
      crash: false
    });
  });

  it('Should handle a simple process that crash correctly', async () => {
    const manager = new __SProcessManager();
    const pro = new __MyProcess({
      crash: true
    });
    let restarted = 0;
    manager.attachProcess('main', pro, {
      restart: {
        delay: 10,
        before: (lastProcessObj) => {
          restarted++;
          if (restarted >= 3) return false;
          return lastProcessObj;
        }
      }
    });

    const res = await manager.run('main');

    await __wait(10);

    expect(res.length).toBe(3);
    expect(res[0].state).toBe('error');
  });

  it('Should handle a simple child process correctly', async () => {
    const manager = new __SProcessManager();
    const pro = new __MyProcess(
      {},
      {
        process: {
          runAsChild: true
        }
      }
    );
    manager.attachProcess('child', pro);

    const res = await manager.run('child');

    await __wait(10);

    expect(res.value).toEqual({
      param1: 'Hello',
      param2: true,
      help: false,
      crash: false
    });
  });

  it('Should handle a simple process child that crash correctly', async (done) => {
    const manager = new __SProcessManager();
    const pro = new __MyProcess(
      {
        crash: true
      },
      {
        process: {
          runAsChild: true
        }
      }
    );
    let restarted = 0;
    manager.attachProcess('child', pro, {
      restart: {
        delay: 10,
        before: (lastProcessObj) => {
          restarted++;
          if (restarted >= 3) return false;
          return lastProcessObj;
        }
      }
    });

    const res = await manager.run('child');

    await __wait(10);

    expect(res.length).toBe(3);
    expect(res[0].state).toBe('error');

    done();
  });
});
