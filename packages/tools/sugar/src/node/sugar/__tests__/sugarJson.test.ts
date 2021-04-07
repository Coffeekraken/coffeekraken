import __sugarJson from '../sugarJson';

describe('sugar.node.sugar.sugarJson', () => {
  it('Should retreive correctly a specific package sugar.json file', async (done) => {
    const value = await __sugarJson('@coffeekraken/s-js-compiler');
    expect(Object.keys(value).length > 0).toBe(true);
    done();
  });

  it('Should retreive correctly some sugar.json file', async (done) => {
    const value = await __sugarJson('*');
    expect(Object.keys(value).length > 0).toBe(true);
    done();
  });

  it('Should retreive correctly some specifics packages sugar.json file', async (done) => {
    const value = await __sugarJson(
      '@coffeekraken/s-js-compiler,@coffeekraken/s-frontstack'
    );
    expect(Object.keys(value).length > 0).toBe(true);
    done();
  });
});
