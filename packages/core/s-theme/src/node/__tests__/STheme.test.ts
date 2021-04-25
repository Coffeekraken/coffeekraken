import __STheme from '../STheme';

describe('s-theme.node.STheme', () => {
  it('Should instanciate correctly the default theme', (done) => {
    new __STheme();
    done();
  });
  it('Should throw an error if the passed theme does not exists', (done) => {
    try {
      new __STheme('IDontExists');
    } catch (e) {
      done();
    }
  });
  it('Should loop correctly on colors', (done) => {
    const theme = new __STheme();
    let isError = false;
    theme.loopOnColors(({ name, modifier, value, previous, next }) => {
      if (!name || !modifier || !value || !previous || !next) isError = true;
    });
    expect(isError).toBe(false);
    done();
  });

  it('Should loop correctly on colors and stop when return -1 or false', (done) => {
    const theme = new __STheme();
    let i = 0;
    theme.loopOnColors(({ name, modifier, value, previous, next }) => {
      i++;
      if (i >= 10) return false;
    });
    expect(i).toBe(10);
    done();
  });
});
