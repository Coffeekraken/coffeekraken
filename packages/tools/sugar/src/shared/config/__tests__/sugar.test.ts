import __sugar from '../sugar';
import __registerFolder from '../registerFolder';

__registerFolder(__dirname + '/config');

describe('sugar.shared.config.sugar', () => {
  it('Should load a default config correctly', (done) => {
    const value = __sugar('npm.rootDir');
    expect(value.match(/\/node_modules$/).length).toBe(1);
    done();
  });
  it('Should load a registered folder config correctly', (done) => {
    const value = __sugar('coco.something');
    expect(value).toBe('Hello world');
    done();
  });
});
