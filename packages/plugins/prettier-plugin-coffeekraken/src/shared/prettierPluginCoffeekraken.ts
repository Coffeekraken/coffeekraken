export const languages = [
    {
        // The language name
        name: 'SugarCss',
        // Parsers that can parse this language.
        // This can be built-in parsers, or parsers you have contributed via this plugin.
        parsers: ['sugar-css'],
    },
];

const loc = (prop) => (node) => {
    return node.loc && node.loc[prop] && node.loc[prop].offset;
};

export const parsers = {
    'sugar-css': {
        parse,
        // The name of the AST that
        astFormat: 'sugar-css-ast',
        hasPragma,
        locStart: loc('start'),
        locEnd: loc('end'),
        preprocess,
    },
};

function parse(text: string, parsers: object, options: object) {}

function hasPragma(text: string): boolean {}

function preprocess(text: string, options: object): string {}
