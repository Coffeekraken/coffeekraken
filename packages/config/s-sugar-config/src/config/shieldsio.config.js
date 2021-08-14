export default function (env, config) {
    if (env.platform !== 'node')
        return;
    return {
        style: 'for-the-badge',
        shields: {
            size: {
                url: 'https://shields.io/bundlephobia/min/[packageJson.name]?style=[config.shieldsio.style]',
                href: 'hhttps://www.npmjs.com/package/[packageJson.name]',
            },
            downloads: {
                url: 'https://shields.io/npm/dm/[packageJson.name]?style=[config.shieldsio.style]',
                href: 'hhttps://www.npmjs.com/package/[packageJson.name]',
            },
            // 'issues',
            license: {
                url: 'https://shields.io/npm/l/[packageJson.name]?style=[config.shieldsio.style]',
                href: './LICENSE',
            },
            discord: {
                url: 'https://shields.io/discord/[config.discord.server.id]?style=[config.shieldsio.style]',
                href: '[config.discord.server.url]',
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpZWxkc2lvLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNoaWVsZHNpby5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sV0FBVyxHQUFHLEVBQUUsTUFBTTtJQUNoQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFcEMsT0FBTztRQUNILEtBQUssRUFBRSxlQUFlO1FBQ3RCLE9BQU8sRUFBRTtZQUNMLElBQUksRUFBRTtnQkFDRixHQUFHLEVBQUUsdUZBQXVGO2dCQUM1RixJQUFJLEVBQUUsbURBQW1EO2FBQzVEO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLEdBQUcsRUFBRSw2RUFBNkU7Z0JBQ2xGLElBQUksRUFBRSxtREFBbUQ7YUFDNUQ7WUFDRCxZQUFZO1lBQ1osT0FBTyxFQUFFO2dCQUNMLEdBQUcsRUFBRSw0RUFBNEU7Z0JBQ2pGLElBQUksRUFBRSxXQUFXO2FBQ3BCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLEdBQUcsRUFBRSxzRkFBc0Y7Z0JBQzNGLElBQUksRUFBRSw2QkFBNkI7YUFDdEM7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDIn0=