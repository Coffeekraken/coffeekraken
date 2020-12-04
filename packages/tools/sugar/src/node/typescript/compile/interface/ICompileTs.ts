export interface ICompileTsParams {
  [key: string]: any;
}
export interface ICompileTsSettings {
  [key: string]: any;
}

export default interface ICompileTs {
  (params: ICompileTsParams): Promise<any>;
}
