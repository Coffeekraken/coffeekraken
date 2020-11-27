export interface IFindUpSettings {
  symlinks?: boolean;
  cwd?: string;
}

export default interface IFindUp {
  (search: string, settings: IFindUpSettings): Promise<
    string | string[] | null
  >;
}
