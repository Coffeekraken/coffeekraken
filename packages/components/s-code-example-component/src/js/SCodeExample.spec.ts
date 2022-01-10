export const purgecss = {
    safelist: {
        standard: [
            's-tabs',
            's-btn',
            's-color',
            's-color--accent',
            /^language-/,
        ],
        greedy: [
            /s-code-example/,
            /hljs/,
        ]
    }
}