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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sMEJBQTBCLE1BQU0sNkJBQTZCLENBQUM7QUFFckUsUUFBUSxDQUFDLHdEQUF3RCxFQUFFLEdBQUcsRUFBRTtJQUVwRSxFQUFFLENBQUMsaUNBQWlDLEVBQUUsR0FBRyxFQUFFO1FBRXZDLE1BQU0sR0FBRyxHQUFHLDBCQUEwQixDQUFDOzs7Ozs7OztTQVF0QyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXJELENBQUMsQ0FBQyxDQUFDO0FBRVAsQ0FBQyxDQUFDLENBQUMifQ==