
export interface IParseArgsSettings {
    valueQuote: "'" | '"' | '`';
    treatNoAsBoolean: boolean;
    camelCase: boolean;
}
export default function __parseArgs(string: any, settings?: Partial<IParseArgsSettings>): {};
