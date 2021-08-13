export default function (env, config) {
    if (env.platform !== 'node')
        return {};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdC5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb250YWN0LmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUcsRUFBRSxNQUFNO0lBQ2hDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTyxFQUFFLENBQUM7SUFFdkMsT0FBTztRQUNILE9BQU8sRUFBRTtZQUNMLEdBQUcsRUFBRSw2QkFBNkI7WUFDbEMsTUFBTSxFQUFFLG1IQUFtSDtTQUM5SDtRQUNELEtBQUssRUFBRTtZQUNILElBQUksR0FBRzs7Z0JBQ0gsT0FBTyxNQUFBLE1BQUEsTUFBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsV0FBVywwQ0FBRSxNQUFNLDBDQUFFLEtBQUssbUNBQUksTUFBQSxNQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxHQUFHLDBDQUFFLElBQUksMENBQUUsS0FBSyxDQUFDO1lBQzFFLENBQUM7WUFDRCxNQUFNLEVBQUUsOEZBQThGO1NBQ3pHO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==