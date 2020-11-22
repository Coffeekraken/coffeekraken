const __namespaceSNav = require('../namespaceSNav');
describe('sugar.node.nav.namespaceSNav', () => {
  it('Should parse and generate an SNav instance correctly', async (done) => {
    const namespaceSNav = await __namespaceSNav(`${__dirname}/doc`);
    expect(namespaceSNav.toHtml().length).toBe(2231);
    done();
  });
});
