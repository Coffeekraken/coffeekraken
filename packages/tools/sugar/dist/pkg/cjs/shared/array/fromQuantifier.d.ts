
export interface IFromQuantifierSettings {
    max: number;
    value: Function;
    action: '>' | '<' | '>=' | '<=';
}
export default function __fromQuantifier(quantifier: string | number, settings?: Partial<IFromQuantifierSettings>): any[];
