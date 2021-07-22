export default function sCodeExampleMarkedExtension(settings) {
    return {
        name: 'SCodeExample',
        level: 'block',
        start(src) { var _a; return (_a = src.match(/```\s?([a-zA-Z0-9]+)\n([^:```]*)\n```/)) === null || _a === void 0 ? void 0 : _a.index; },
        tokenizer(src, tokens) {
            const rule = /^```\s?([a-zA-Z0-9]+)\n([^:```]*)\n```/;
            const match = rule.exec(src);
            if (match && match.input.match(/^```/)) {
                return {
                    type: 'SCodeExample',
                    raw: match[0],
                    language: match[1],
                    code: match[2],
                    tokens: this.inlineTokens('')
                };
            }
        },
        renderer(token) {
            return `
            <s-code-example>
                <template lang="${token.language}">
                ${token.code}
                </template>
            </s-code-example>
            `;
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic0NvZGVFeGFtcGxlTWFya2VkRXh0ZW5zaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic0NvZGVFeGFtcGxlTWFya2VkRXh0ZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQThCQSxNQUFNLENBQUMsT0FBTyxVQUFVLDJCQUEyQixDQUFDLFFBQTBEO0lBRTFHLE9BQU87UUFDSCxJQUFJLEVBQUUsY0FBYztRQUNwQixLQUFLLEVBQUUsT0FBTztRQUNkLEtBQUssQ0FBQyxHQUFHLFlBQUksT0FBTyxNQUFBLEdBQUcsQ0FBQyxLQUFLLENBQUMsdUNBQXVDLENBQUMsMENBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNoRixTQUFTLENBQUMsR0FBRyxFQUFFLE1BQU07WUFDakIsTUFBTSxJQUFJLEdBQUcsd0NBQXdDLENBQUM7WUFDdEQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDcEMsT0FBTztvQkFDUCxJQUFJLEVBQUUsY0FBYztvQkFDcEIsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ2IsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ2xCLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNkLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQztpQkFDNUIsQ0FBQzthQUNMO1FBQ0wsQ0FBQztRQUNELFFBQVEsQ0FBQyxLQUFLO1lBQ1YsT0FBTzs7a0NBRWUsS0FBSyxDQUFDLFFBQVE7a0JBQzlCLEtBQUssQ0FBQyxJQUFJOzs7YUFHZixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=