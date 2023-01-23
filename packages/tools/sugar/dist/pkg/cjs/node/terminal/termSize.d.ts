
export interface ITermSizeResult {
    columns: number;
    rows: number;
    width: number;
    height: number;
}
export default function termSize(): ITermSizeResult;
