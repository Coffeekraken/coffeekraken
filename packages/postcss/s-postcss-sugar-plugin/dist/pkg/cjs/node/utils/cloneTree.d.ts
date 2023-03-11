export interface ICloneTreeSettings {
    empty: boolean;
}
export default function cloneTree(fromNode: any, settings?: Partial<ICloneTreeSettings>): any;
