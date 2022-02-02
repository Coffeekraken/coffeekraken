export const purgecss = {
    safelist: {
        standard: [
            /^ck-search/,
            's-flex',
            's-flex-item',
            's-flex-item--grow',
            's-mbe',
            's-mbe--10',
            's-mbe--20',
            's-typo',
            's-typo--p',
            's-typo--bold',
            /^s-tc/,
            /^s-platform/,
            's-badge',
            's-color',
            's-color--main',
            's-color--accent',
            's-opacity',
            's-opacity--50',
            's-font',
            's-font--20',
            's-truncate',
            's-truncate--2',
            's-input',
            's-scale',
            's-scale--11'
        ],
        greedy: [
            /s-until/
        ]
    }
}