export default (pluginOptions) => (options) => {
    switch (pluginOptions.target) {
        case 'webcomponent':
            return {
                code: {
                    post: (code) => {
                        // add the SComponent object
                        if (!code.match(/import __SComponent from/)) {
                            code = `
                                import __SComponent from '@coffeekraken/s-component';
                                ${code}
                            `;
                        }

                        // define function
                        const matches = code.match(
                            /customElements.define\(\"([a-zA-Z0-9_-]+)\"\, ([a-zA-Z0-9]+)\);/,
                        );
                        if (matches?.length >= 3) {
                            code = code.replace(
                                matches[0],
                                `
                            export function define(
                                props = {},
                                tagName = '${matches[1]}'
                            ) {
                                __SComponent.setDefaultProps(tagName, props);
                                customElements.define(tagName, class ${matches[2]}Component extends ${matches[2]} {});
                            }
                            `,
                            );
                        }
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
