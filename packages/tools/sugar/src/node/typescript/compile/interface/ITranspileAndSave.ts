export default interface ITranspileAndSave {
  (filepath: string, compilerOptions?: any): Promise<any>;
}
