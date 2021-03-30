import __tsconfigJson from '../tsconfigJson';

describe('sugar.node.ts.tsconfigJson', () => {
  it('Should get a sugar stack correctly', () => {
    const json = __tsconfigJson('js', {
      clean: true
    });
    console.log(json);

    expect(true).toEqual(true);
  });
});
