export default interface ITranspileOnly {
  (source: string, compilerOptions?: any): Promise<any>;
}
