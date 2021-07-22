export default function sCodeExampleToken(settings) {
    return {
        extract(source) {
            const matches = source.match(/^```\s?([a-zA-Z0-9]+)\n([^:```]*)\n```/gm);
            if (!matches) {
                return;
            }
            const items = [];
            matches.forEach(match => {
                const raw = match;
                match = match.replace(/^```/, '').replace(/```$/, '');
                const language = match.split('\n')[0].trim();
                const code = match.split('\n').slice(1).join('\n');
                items.push({
                    raw,
                    language,
                    code
                });
            });
            return items;
        },
        render(params, target) {
            switch (target) {
                case 'html':
                    return `
<s-code-example><template lang="${params.language}">
${params.code.trim()}
</template></s-code-example>`;
                    break;
            }
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic0NvZGVFeGFtcGxlVG9rZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzQ29kZUV4YW1wbGVUb2tlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE0QkEsTUFBTSxDQUFDLE9BQU8sVUFBVSxpQkFBaUIsQ0FBQyxRQUE4RDtJQUVwRyxPQUFPO1FBQ0gsT0FBTyxDQUFDLE1BQU07WUFFVixNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7WUFFekUsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDVixPQUFPO2FBQ1Y7WUFFRCxNQUFNLEtBQUssR0FBK0MsRUFBRSxDQUFDO1lBRTdELE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3BCLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQztnQkFDbEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3RELE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzdDLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkQsS0FBSyxDQUFDLElBQUksQ0FBQztvQkFDUCxHQUFHO29CQUNILFFBQVE7b0JBQ1IsSUFBSTtpQkFDUCxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFDRCxNQUFNLENBQUMsTUFBZ0QsRUFBRSxNQUFNO1lBQzNELFFBQU8sTUFBTSxFQUFFO2dCQUNYLEtBQUssTUFBTTtvQkFDUCxPQUFPO2tDQUNPLE1BQU0sQ0FBQyxRQUFRO0VBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFOzZCQUNTLENBQUE7b0JBQ2IsTUFBTTthQUNUO1FBQ0wsQ0FBQztLQUNKLENBQUE7QUFFTCxDQUFDIn0=