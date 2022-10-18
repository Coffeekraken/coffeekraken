import __defaultMetasPlugin from './plugins/defaultMetasPlugin';
import __defaultPropsPlugin from './plugins/defaultPropsPlugin';
import __exportDefaultClassPlugin from './plugins/exportDefaultClassPlugin';
import __exportDefinePlugin from './plugins/exportDefinePlugin';
:

export default function () {
    const plugins = {
        webcomponent: {
            plugins: [
                __defaultPropsPlugin({
                    target: 'webcomponent',
                }),
                __exportDefaultClassPlugin({
                    target: 'webcomponent',
                }),
                __exportDefinePlugin({
                    target: 'webcomponent',
                })
            ],
        },
        react: {
            plugins: []
        },
        vue3: {
            plugins: []
        }
    };

    for (let [target, options] of Object.entries(plugins)) {
        options.plugins.push(__defaultMetasPlugin({
            target
        }));
    }

    return plugins;
}
