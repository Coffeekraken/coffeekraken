import __fileHashSync from '../fileHashSync';
describe('sugar.node.fs.fileHash', () => {
    it('Should a simple file correctly', () => {
        const hash = __fileHashSync(`${__dirname}/data/3cb8876846e7c0e13896d23496ff7ac2.gif`);
        expect(hash).toBe('o8qZgS5PxHPPNasVn3Be0lvxK7mtKaMVgUtTntgS7Pw=');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sY0FBYyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLFFBQVEsQ0FBQyx3QkFBd0IsRUFBRSxHQUFHLEVBQUU7SUFDcEMsRUFBRSxDQUFDLGdDQUFnQyxFQUFFLEdBQUcsRUFBRTtRQUN0QyxNQUFNLElBQUksR0FBRyxjQUFjLENBQ3ZCLEdBQUcsU0FBUyw0Q0FBNEMsQ0FDM0QsQ0FBQztRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsOENBQThDLENBQUMsQ0FBQztJQUN0RSxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=