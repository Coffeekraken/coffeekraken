import __replacePackageJsonTokens from '../replacePackageJsonTokens';
describe('@coffeekraken.sugar.node.meta.replacePackageJsonTokens', () => {
    it('Should replace tokens correctly', () => {
        const res = __replacePackageJsonTokens(`
            Hello %packageJson.name

            Hope you are doing well...
            "%packageJson.description"

            Best regards
            %packageJson.author (%packageJson.version)
        `);
        expect(res.match(/%packageJson\./gm)).toBe(null);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGFjZVBhY2thZ2VKc29uVG9rZW5zLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXBsYWNlUGFja2FnZUpzb25Ub2tlbnMudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLDBCQUEwQixNQUFNLDZCQUE2QixDQUFDO0FBRXJFLFFBQVEsQ0FBQyx3REFBd0QsRUFBRSxHQUFHLEVBQUU7SUFFcEUsRUFBRSxDQUFDLGlDQUFpQyxFQUFFLEdBQUcsRUFBRTtRQUV2QyxNQUFNLEdBQUcsR0FBRywwQkFBMEIsQ0FBQzs7Ozs7Ozs7U0FRdEMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVyRCxDQUFDLENBQUMsQ0FBQztBQUVQLENBQUMsQ0FBQyxDQUFDIn0=