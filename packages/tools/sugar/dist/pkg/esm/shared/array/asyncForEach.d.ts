
interface IAsyncForEach {
    (value: any, index: number, array: any[]): void;
}
export default function __asyncForEach(array: any[], asyncFn: IAsyncForEach): Promise<any>;
export {};
