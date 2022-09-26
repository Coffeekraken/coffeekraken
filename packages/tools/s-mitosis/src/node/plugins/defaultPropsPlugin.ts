let isDefaultPropsDefined = false;
export default (pluginOptions) => (options) => {
    switch(pluginOptions.target) {
        case 'webcomponent':
            return {
                json: {
                    post: (json) => {
                        if (json.exports.DEFAULT_PROPS) {
                            isDefaultPropsDefined = true;
                        }
                    },
                },
                code: {
                    post: (code) => {
                        const string = 'this._root.innerHTML = `';
                        if (isDefaultPropsDefined) {
                            code = code.replace(
                                string,
                                `
                            for (let [key, value] of Object.entries(DEFAULT_PROPS)) {
                                if (this.props[key] === undefined) {
                                    this.props[key] = DEFAULT_PROPS[key];
                                }
                            }
                            ${string}
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
