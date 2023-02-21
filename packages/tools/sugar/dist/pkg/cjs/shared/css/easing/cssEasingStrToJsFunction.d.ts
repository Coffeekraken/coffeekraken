
export interface IEasingFunction {
    (t: number): number;
}
export default function __cssEasingStrToJsFunction(easing: string): IEasingFunction;
