import __SSugarConfig from '@coffeekraken/s-sugar-config';
export default {
    discord: {
        url: '[config.discord.server.url]',
        shield: 'https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&logo=discord'
    },
    email: {
        get url() {
            var _a;
            return (_a = __SSugarConfig.safeGet('packageJson.author.email')) !== null && _a !== void 0 ? _a : __SSugarConfig.safeGet('git.user.email');
        },
        shield: 'https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&logo=Mail.Ru'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdC5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb250YWN0LmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRCxlQUFlO0lBQ1gsT0FBTyxFQUFFO1FBQ0wsR0FBRyxFQUFFLDZCQUE2QjtRQUNsQyxNQUFNLEVBQUUsbUhBQW1IO0tBQzlIO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxHQUFHOztZQUNILE9BQU8sTUFBQSxjQUFjLENBQUMsT0FBTyxDQUFDLDBCQUEwQixDQUFDLG1DQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMxRyxDQUFDO1FBQ0QsTUFBTSxFQUFFLDhGQUE4RjtLQUN6RztDQUNKLENBQUEifQ==