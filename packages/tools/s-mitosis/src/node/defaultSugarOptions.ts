import __defaultPropsPlugin from './plugins/defaultPropsPlugin';
import __exportDefaultClassPlugin from './plugins/exportDefaultClassPlugin';
import __exportDefinePlugin from './plugins/exportDefinePlugin';

export default function () {
    return {
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
                }),
            ],
        },
    };
}
