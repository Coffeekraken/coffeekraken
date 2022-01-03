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
function parse(text, parsers, options) { }
function hasPragma(text) { }
function preprocess(text, options) { }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldHRpZXJQbHVnaW5Db2ZmZWVrcmFrZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcmV0dGllclBsdWdpbkNvZmZlZWtyYWtlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUc7SUFDckI7UUFDSSxvQkFBb0I7UUFDcEIsSUFBSSxFQUFFLFVBQVU7UUFDaEIsd0NBQXdDO1FBQ3hDLGlGQUFpRjtRQUNqRixPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUM7S0FDekI7Q0FDSixDQUFDO0FBRUYsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7SUFDM0IsT0FBTyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDL0QsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHO0lBQ25CLFdBQVcsRUFBRTtRQUNULEtBQUs7UUFDTCwyQkFBMkI7UUFDM0IsU0FBUyxFQUFFLGVBQWU7UUFDMUIsU0FBUztRQUNULFFBQVEsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQ3RCLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ2xCLFVBQVU7S0FDYjtDQUNKLENBQUM7QUFFRixTQUFTLEtBQUssQ0FBQyxJQUFZLEVBQUUsT0FBZSxFQUFFLE9BQWUsSUFBRyxDQUFDO0FBRWpFLFNBQVMsU0FBUyxDQUFDLElBQVksSUFBWSxDQUFDO0FBRTVDLFNBQVMsVUFBVSxDQUFDLElBQVksRUFBRSxPQUFlLElBQVcsQ0FBQyJ9