// @shared

export interface IParseTypeStringSingleResultObj {
  type: string;
  of: string[] | undefined;
}

export interface IParseTypeStringResultObj {
  raw: string;
  types: IParseTypeStringSingleResultObj[];
}

export default interface IParseTypeString {
  (typeString: string): IParseTypeStringResultObj;
}
