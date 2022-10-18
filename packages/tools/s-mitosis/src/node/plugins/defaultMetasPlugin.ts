// import { SComponentDefaultPropsInterface } from '@coffeekraken/s-component';

let isDefaultPropsDefined = false;
export default (pluginOptions) => (options) => {
    return {
        json: {
            pre: (json) => {},
        },
        code: {
            pre: (code) => {
                let codeToAdd = ``;

                if (!code.match(/export const metas = \{/)) {
                    codeToAdd = `
                        export const metas = {};
                    `;
                }
                codeToAdd += `
                    if (!metas.type) {
                        metas.type = '${pluginOptions.target}';
                    }
                `;

                // adding the code in the actual generated code
                if (code.trim().match(/<\/script>$/gm)) {
                    // .vue
                    code = code.replace(
                        /<\/script>$/gm,
                        `
                        ${codeToAdd}
                    </script>`,
                    );
                } else {
                    // standard js code
                    code = `
                        ${code}
                        ${codeToAdd}
                    `;
                }

                return code;
            },
        },
    };
};
