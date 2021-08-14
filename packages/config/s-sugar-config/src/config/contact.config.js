export default function (env, config) {
    if (env.platform !== 'node')
        return;
    return {
        discord: {
            url: '[config.discord.server.url]',
            shield: 'https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&logo=discord',
        },
        email: {
            get url() {
                var _a, _b, _c, _d, _e;
                return (_c = (_b = (_a = config === null || config === void 0 ? void 0 : config.packageJson) === null || _a === void 0 ? void 0 : _a.author) === null || _b === void 0 ? void 0 : _b.email) !== null && _c !== void 0 ? _c : (_e = (_d = config === null || config === void 0 ? void 0 : config.git) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.email;
            },
            shield: 'https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&logo=Mail.Ru',
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdC5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb250YWN0LmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUcsRUFBRSxNQUFNO0lBQ2hDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUVwQyxPQUFPO1FBQ0gsT0FBTyxFQUFFO1lBQ0wsR0FBRyxFQUFFLDZCQUE2QjtZQUNsQyxNQUFNLEVBQUUsbUhBQW1IO1NBQzlIO1FBQ0QsS0FBSyxFQUFFO1lBQ0gsSUFBSSxHQUFHOztnQkFDSCxPQUFPLE1BQUEsTUFBQSxNQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxXQUFXLDBDQUFFLE1BQU0sMENBQUUsS0FBSyxtQ0FBSSxNQUFBLE1BQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLEdBQUcsMENBQUUsSUFBSSwwQ0FBRSxLQUFLLENBQUM7WUFDMUUsQ0FBQztZQUNELE1BQU0sRUFBRSw4RkFBOEY7U0FDekc7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9