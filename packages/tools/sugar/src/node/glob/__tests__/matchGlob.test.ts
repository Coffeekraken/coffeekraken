import __matchGlob from '../matchGlob';

describe('sugar.node.glob.matchGlob', () => {
  it('Should resolve the passed glob correctly', async (done) => {
    const match = __matchGlob('data/myCoolData.txt', `data/**/*`, {
      cwd: __dirname
    });
    expect(match).toBe(true);
    done();
  });
  it('Should resolve the passed glob with a content regex correctly', async (done) => {
    const match = __matchGlob(
      'data/myCoolData.txt',
      `data/**/*:/.*@namespace.*/gm`,
      {
        cwd: __dirname
      }
    );
    expect(match).toBe(true);
    done();
  });
  it('Should not match the passed glob with a incorrect content regex correctly', async (done) => {
    const match = __matchGlob(
      'data/myCoolData.txt',
      `data/**/*:/.*@naspace.*/gm`,
      {
        cwd: __dirname
      }
    );
    expect(match).toBe(false);
    done();
  });
  it('Should not match the passed glob with a correct and incorrect content regex correctly', async (done) => {
    const match = __matchGlob(
      'data/myCoolData.txt',
      [`data/**/*:/.*@naspace.*/gm`, `data/**/*:/.*@namespace.*/gm`],
      {
        cwd: __dirname
      }
    );
    expect(match).toBe(true);
    done();
  });
});
