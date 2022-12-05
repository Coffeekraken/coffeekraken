export default {
    reg: /```([a-zA-Z0-9]+)([^```]*)```/g,
    async transform(data, target) {
        switch (target) {
            case 'html':
                return [
                    `<s-code-example>`,
                    `   <template lang="${data[0]}">`,
                    data[1],
                    `   </template>`,
                    `</s-code-example>`,
                ].join('\n');
                break;
        }
    },
};
