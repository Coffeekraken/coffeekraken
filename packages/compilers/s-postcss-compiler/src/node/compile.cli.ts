import __SProcess from '@coffeekraken/s-process';
import __SPostcssCompiler from './SPostcssCompiler';
import __SPostcssCompilerInterface from './interface/SPostcssCompilerInterface';

export default function start(stringArgs = '') {
  const compiler = new __SPostcssCompiler();
  const pro = __SProcess.from(compiler.compile.bind(compiler), {
    process: {
      interface: __SPostcssCompilerInterface
    }
  });
  pro.run(stringArgs);
}
