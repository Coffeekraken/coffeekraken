import __path from 'path';
import __SFile from '../SFile';

describe('sugar.node.fs.SFile', () => {
  it('Should instanciate and get properties correctly from a file', (done) => {
    const file = new __SFile(
      __path.resolve(__dirname, 'data/3cb8876846e7c0e13896d23496ff7ac2.gif')
    );
    expect(file.name).toBe('3cb8876846e7c0e13896d23496ff7ac2.gif');
    expect(
      file.path.includes(
        'sugar/src/node/fs/__tests__/data/3cb8876846e7c0e13896d23496ff7ac2.gif'
      )
    ).toBe(true);
    expect(file.dirPath.includes('sugar/src/node/fs/__tests__/data')).toBe(
      true
    );
    expect(file.extension).toBe('gif');
    expect(file.stats.bytes).toBe(789250);
    expect(file.exists).toBe(true);

    done();
  });
});
