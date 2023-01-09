import __SInterface from '@coffeekraken/s-interface';
import { ITypeStringObject } from '../../shared/type/parseTypeString';

export interface IResolveTypeStringResult {
    types: ITypeStringObject[];
    interface?: __SInterface;
    raw: string;
}
export interface IResolveTypeStringSettings {
    cwd: string;
}
export default function __resolveTypeString(typeString: string, settings?: Partial<IResolveTypeStringSettings>): Promise<IResolveTypeStringResult>;
