import __resolve from '../resolve';
import __path from 'path';

describe('sugar.node.module.resolve', () => {
  const settings = {
    dirs: [`${__dirname}`]
  };

  it('Should resolve an existing file correctly', (done) => {
    const res = __resolve('pkg/test/test.js', settings);
    expect(res).toBe(__path.resolve(__dirname, 'pkg/test/test.js'));
    done();
  });

  it('Should resolve a file without extension defined', (done) => {
    const res = __resolve('pkg/test/test', settings);
    expect(res).toBe(__path.resolve(__dirname, 'pkg/test/test.js'));
    done();
  });

  it('Should resolve a module using package.json main field', (done) => {
    const res = __resolve('pkg', settings);
    expect(res).toBe(__path.resolve(__dirname, 'pkg/index.js'));
    done();
  });
});
