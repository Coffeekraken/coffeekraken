import __expandPleasantCssClassnames from '../expandPleasantCssClassnames';
describe('@coffeekraken.sugar.shared.html.expandPleasantCssClassnames', () => {
    it('Should expand simple html content successfully', () => {
        const html = `

            <body class="something:cool">
                <h1 class="s-typo:h1 s-font:40:bold">
                    Hello world
                </h1>
                <p class="s-typo:p s-font:20 @desktop s-typo:h2:bold">
                    Other thing
                <p>
                <template>
                    <h1 class="s-typo\\:something"></h1>
                </template>
            </body>
            
        `;
        const processed = __expandPleasantCssClassnames(html);
        expect(processed.includes('s-typo:something')).toBe(true);
        expect(processed.includes('something something--cool')).toBe(true);
        expect(processed.includes('s-typo s-typo--h1 s-font s-font--40 s-font--bold')).toBe(true);
        expect(processed.includes('"s-typo s-typo--p s-font s-font--20 s-typo___desktop s-typo--h2___desktop s-typo--bold___desktop')).toBe(true);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kUGxlYXNhbnRDc3NDbGFzc25hbWVzLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleHBhbmRQbGVhc2FudENzc0NsYXNzbmFtZXMudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLDZCQUE2QixNQUFNLGdDQUFnQyxDQUFDO0FBRTNFLFFBQVEsQ0FBQyw2REFBNkQsRUFBRSxHQUFHLEVBQUU7SUFFekUsRUFBRSxDQUFDLGdEQUFnRCxFQUFFLEdBQUcsRUFBRTtRQUV0RCxNQUFNLElBQUksR0FBRzs7Ozs7Ozs7Ozs7Ozs7U0FjWixDQUFDO1FBRUYsTUFBTSxTQUFTLEdBQUcsNkJBQTZCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxRCxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25FLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGtEQUFrRCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUYsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsa0dBQWtHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUU5SSxDQUFDLENBQUMsQ0FBQTtBQUVOLENBQUMsQ0FBQyxDQUFDIn0=