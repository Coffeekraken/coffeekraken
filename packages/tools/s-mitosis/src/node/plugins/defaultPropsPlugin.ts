// import { SComponentDefaultPropsInterface } from '@coffeekraken/s-component';

let isDefaultPropsDefined = false;
export default (pluginOptions) => (options) => {
    switch (pluginOptions.target) {
        case 'webcomponent':
            return {
                json: {
                    pre: (json) => {
                        if (json.exports.DEFAULT_PROPS) {
                            isDefaultPropsDefined = true;
                        }
                    },
                },
                code: {
                    pre: (code) => {
                        // add the SComponent object
                        if (!code.match(/import __SComponent from/)) {
                            code = `
                                import __SComponent from '@coffeekraken/s-component';
                                ${code}
                            `;
                        }

                        if (!isDefaultPropsDefined) {
                            return code;
                        }

                        // // default props interface
                        // const defaultProps =
                        //     SComponentDefaultPropsInterface.defaults();

                        let typeMatch = code
                            .match(/type Props = \{[\s\S]*?\};/g)?.[0]
                            .split('\n')
                            .map((l) => l.trim().split(':')[0]);
                        typeMatch.pop();
                        typeMatch.shift();

                        // add default props
                        typeMatch = [
                            ...typeMatch,
                            // ...Object.keys(defaultProps),
                        ];

                        const onMountStr = 'this._root.innerHTML = `';
                        code = code.replace(
                            onMountStr,
                            `
                            // default props
                            const defaultProps = __SComponent.getDefaultProps(this.tagName.toLowerCase());
                            ${typeMatch
                                .map((prop) => {
                                    return `this.props.${prop} = this.props.${prop} ?? defaultProps.${prop} ?? DEFAULT_PROPS.${prop};`;
                                })
                                .join('\n')}

                                ${onMountStr}
                        `,
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
