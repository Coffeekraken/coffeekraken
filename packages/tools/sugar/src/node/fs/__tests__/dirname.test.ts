import __dn from '../dirname';
describe('sugar.node.fs.dirname', () => {
    it('Should get the dirname correctly', () => {
        expect(__dn()).toBe(__dirname);
    });
});
