import __SProcess from '../SProcess';
import __SPromise from '@coffeekraken/s-promise';
import __SInterface from '@coffeekraken/s-interface';
import __MyProcess from './MyProcess';

describe('s-process', () => {
  it('Should start a simple process correctly', async (done) => {
    const pro = new __MyProcess(
      {
        param1: 'World'
      },
      {}
    );
    const result = await pro.run({
      param2: false
    });

    expect(result.state).toBe('success');
    expect(result.value).toEqual({
      param1: 'World',
      param2: false,
      help: false,
      crash: false,
      crashTimeout: 100,
      isChildProcess: false
    });
    done();
  });
  it('Should start a simple process as child correctly', async (done) => {
    const pro = new __MyProcess(
      {
        param1: 'World'
      },
      {
        process: {
          runAsChild: true
        }
      }
    );
    const result = await pro.run({
      param2: false
    });

    expect(result.state).toBe('success');
    expect(result.value).toEqual({
      param1: 'World',
      param2: false,
      help: false,
      crash: false,
      crashTimeout: 100,
      isChildProcess: true
    });
    done();
  });

  it('Should initiate correctly a command based process', async (done) => {
    const pro = __SProcess.from('ls -la');
    const res = await pro.run();
    expect(res.state).toBe('success');
    done();
  });

  it('Should initiate correctly a file path based process', async (done) => {
    const pro = __SProcess.from(`${__dirname}/functionBasedProcess`);
    const res = await pro.run({
      something: 'cool'
    });

    expect(res.state).toBe('success');
    expect(res.value.something).toBe('cool');
    expect(res.value.state).toBe('success');

    const res1 = await pro.run({
      something: 'else'
    });
    expect(res1.state).toBe('success');
    expect(res1.value.something).toBe('else');
    expect(res1.value.state).toBe('success');

    done();
  });

  it('Should initiate correctly a file path based process as a child process', async (done) => {
    const pro = __SProcess.from(`${__dirname}/functionBasedProcess`, {
      process: {
        runAsChild: true
      }
    });
    const res = await pro.run({
      something: 'cool'
    });

    expect(res.state).toBe('success');
    expect(res.value.something).toBe('cool');
    expect(res.value.state).toBe('success');
    expect(res.value.isChildProcess).toBe(true);

    done();
  });
});
