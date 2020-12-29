// @shared

export interface ISTypeResultTypeObj {
  type: string;
  value?: any;
}

export interface ISTypeResultIssueObj {
  expected: ISTypeResultTypeObj;
  received: ISTypeResultTypeObj;
  message?: string;
}

export interface ISTypeResultSettings {
  id?: string;
  name?: string;
  throw?: boolean;
  customTypes?: boolean;
  interfaces?: boolean;
}

export interface ISTypeResultData {
  typeString?: string;
  value?: any;
  expected: any;
  received: any;
  issues: ISTypeResultIssueObj[];
  settings: ISTypeResultSettings;
}

export interface ISTypeResultCtor {
  new (data: ISTypeResultData): ISTypeResult;
}
export default interface ISTypeResult {
  hasIssues(): boolean;
  toString(): string;
  toConsole(): string;
}
