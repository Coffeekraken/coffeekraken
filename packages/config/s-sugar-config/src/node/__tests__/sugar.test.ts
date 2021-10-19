import __SugarConfig from '../sugar';

describe('s-sugar-config.node.sugar', () => {
    it('Should get a [theme.something] value correctly', async () => {
        await __SugarConfig.load();
        const value = __SugarConfig.get(
            'theme.themes.default-dark.ui.button.paddingInline',
        );
        expect(value).toBe('1.5em');
    });
});
