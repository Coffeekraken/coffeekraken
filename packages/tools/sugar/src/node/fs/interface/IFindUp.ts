export interface IFindUpSettings {
  symlinks?: boolean;
  cwd?: string;
  stopWhenFound?: boolean;
  SFile?: boolean;
}

export default interface IFindUp {
  (search: string, settings: IFindUpSettings): Promise<
    string | string[] | null
  >;
}
