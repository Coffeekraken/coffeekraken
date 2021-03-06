import __packageJson from '../packageJson';
import __packageRoot from '../../../path/packageRoot';

describe('sugar.node.npm.utils.packageJson', () => {
  it('Should fetch the "chokidar" package.json correctly', (done) => {
    const json = __packageJson('chokidar', {
      rootDir: __packageRoot(__dirname)
    });
    expect(json.name).toBe('chokidar');
    done();
  });
});
