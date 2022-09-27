export default (pluginOptions) => (options) => {
    switch (pluginOptions.target) {
        case 'webcomponent':
            return {
                code: {
                    pre: (code) => {
                        // default class
                        code = code.replace(
                            /class ([a-zA-Z0-9]+) extends HTMLElement/,
                            'export default class $1 extends HTMLElement',
                        );
                        return code;
                    },
                },
            };
            break;
        default: {
            return {};
        }
    }
};
