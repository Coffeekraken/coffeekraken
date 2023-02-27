import __fileHashSync from '../fileHashSync';
describe('sugar.node.fs.fileHash', () => {
    it('Should a simple file correctly', () => {
        const hash = __fileHashSync(
            `${__dirname}/data/3cb8876846e7c0e13896d23496ff7ac2.gif`,
        );
        expect(hash).toBe('o8qZgS5PxHPPNasVn3Be0lvxK7mtKaMVgUtTntgS7Pw=');
    });
});
