
export interface ITypeStringObject {
    type: string;
    of: string[] | undefined;
    value?: any;
}
export interface IParseTypeStringSingleResultObj {
}
export default function __parseTypeString(typeString: string): ITypeStringObject[];
