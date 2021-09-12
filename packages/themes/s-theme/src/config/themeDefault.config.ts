export default function (env, config) {
    return {
        themeName: 'default',
        variants: {
            light: '[config.themeDefaultLight]',
            dark: '[config.themeDefaultDark]',
        },
    };
}
