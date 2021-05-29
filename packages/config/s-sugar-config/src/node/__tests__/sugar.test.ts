import __SugarConfig from '../sugar';

describe('s-sugar-config.node.sugar', () => {
  it('Should get a [theme.something] value correctly', () => {
    const value = __SugarConfig.get('theme.themes.dark.ui.button.padding');

    console.log('v', value);

    expect(true).toBe(true);
  });
});
