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
      crashTimeout: 100
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
      crashTimeout: 100
    });
    done();
  });
});
