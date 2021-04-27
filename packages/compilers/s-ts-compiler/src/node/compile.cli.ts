import __SProcess from '@coffeekraken/s-process';
import __STsCompiler from './STsCompiler';
import __STsCompilerInterface from './interface/STsCompilerInterface';

export default function start(stringArgs = '') {
  const compiler = new __STsCompiler();
  const pro = __SProcess.from(compiler._compile.bind(compiler), {
    process: {
      interface: __STsCompilerInterface
    }
  });
  pro.run(stringArgs);
}
