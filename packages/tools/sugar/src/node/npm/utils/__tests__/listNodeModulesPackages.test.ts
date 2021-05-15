import __listNodeModulesPackages from '../listNodeModulesPackages';

describe('sugar.node.npm.utils.listNodeModulesPackages', () => {
  it('Should list the sugar node_modules packages correctly', (done) => {
    const modules = __listNodeModulesPackages({
      monorepo: true
    });
    expect(Object.keys(modules).length).toBeGreaterThan(0);
    done();
  });
});
