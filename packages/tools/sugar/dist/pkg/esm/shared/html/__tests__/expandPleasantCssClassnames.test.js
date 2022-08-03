import __expandPleasantCssClassnames from '../expandPleasantCssClassnames';
describe('sugar.shared.html.expandPleasantCssClassnames', () => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sNkJBQTZCLE1BQU0sZ0NBQWdDLENBQUM7QUFFM0UsUUFBUSxDQUFDLCtDQUErQyxFQUFFLEdBQUcsRUFBRTtJQUMzRCxFQUFFLENBQUMsZ0RBQWdELEVBQUUsR0FBRyxFQUFFO1FBQ3RELE1BQU0sSUFBSSxHQUFHOzs7Ozs7Ozs7Ozs7OztTQWNaLENBQUM7UUFFRixNQUFNLFNBQVMsR0FBRyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV0RCxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFELE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLDJCQUEyQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkUsTUFBTSxDQUNGLFNBQVMsQ0FBQyxRQUFRLENBQ2Qsa0RBQWtELENBQ3JELENBQ0osQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDYixNQUFNLENBQ0YsU0FBUyxDQUFDLFFBQVEsQ0FDZCxrR0FBa0csQ0FDckcsQ0FDSixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=