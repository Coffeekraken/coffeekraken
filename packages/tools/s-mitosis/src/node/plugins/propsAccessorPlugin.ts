let _imports: string[] = [];
export default (pluginOptions) => (options) => {
    switch(pluginOptions.target) {
        case 'webcomponent':
            return {

                code: {
                    post: (code) => {
                        const string = 'this.state = {';
                        code = code.replace(
                            string,
                            `${string}
                    prop(p) {
                        return this.props?.[p] ?? DEFAULT_PROPS?.[p] ?? p;
                    },`,
                        );
                        return code;
                    },
                },
            };
        break;
        default:
            return {};
        break;
    }
};
