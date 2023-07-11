import __expandPleasantCssClassnames from '../expandPleasantCssClassnames.js';

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
        expect(
            processed.includes(
                's-typo s-typo--h1 s-font s-font--40 s-font--bold',
            ),
        ).toBe(true);
        expect(
            processed.includes(
                '"s-typo s-typo--p s-font s-font--20 s-typo_desktop s-typo--h2__desktop s-typo--bold__desktop',
            ),
        ).toBe(true);
    });
});
