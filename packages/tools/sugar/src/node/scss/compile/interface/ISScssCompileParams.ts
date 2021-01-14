export default interface ISScssCompileInterface {
  outputDir?: string;
  rootDir?: string;
  save?: boolean;
  style?: string;
  map?: boolean;
  cache?: boolean;
  clearCache?: boolean;
  stripComments?: boolean;
  minify?: boolean;
  prod?: boolean;
  sharedResources?: string;
  banner?: string;
  sass?: any;
  watch?: boolean;
  compileOnChange?: boolean;
}
