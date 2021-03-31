import __SProcess from '../SProcess';
import __SPromise from '@coffeekraken/s-promise';
import __SInterface from '@coffeekraken/s-interface';

class MyInterface extends __SInterface {
  static definition = {
    param1: {
      type: 'String',
      default: 'Hello'
    },
    param2: {
      type: 'Boolean',
      default: true
    }
  };
}

// @ts-ignore
class MyProcess extends __SProcess {
  static interfaces = {
    params: MyInterface
  };

  constructor(initialParams, settings = {}) {
    super(initialParams, settings);
  }

  process(params, settings = {}) {
    return new __SPromise(({ resolve, reject, emit }) => {
      setTimeout(() => {
        resolve(params);
      }, 100);
    });
  }
}

describe('s-process', () => {
  it('Should start a simple process correctly', async (done) => {
    const pro = new MyProcess({
      param1: 'World'
    });
    const result = await pro.run({
      param2: false
    });

    expect(result.state).toBe('success');
    expect(result.value).toEqual({
      param1: 'Hello',
      param2: false,
      help: false
    });
    done();
  });
  it('Should start a simple process as child correctly', async (done) => {
    const pro = new MyProcess(
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
      param1: 'Hello',
      param2: false,
      help: false
    });
    done();
  });
});
