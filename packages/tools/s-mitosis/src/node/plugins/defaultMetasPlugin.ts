// import { SComponentDefaultPropsInterface } from '@coffeekraken/s-component';

let isDefaultPropsDefined = false;
export default (pluginOptions) => (options) => {
    return {
        json: {
            pre: (json) => {},
        },
        code: {
            pre: (code) => {
                if (!code.match(/export const metas = \{/)) {
                    code = `
                        ${code}
                        export const metas = {};
                    `;
                }
                code = `
                    ${code}
                    if (!metas.type) {
                        metas.type = '${pluginOptions.target}';
                    }
                `;
                return code;
            },
        },
    };
};
