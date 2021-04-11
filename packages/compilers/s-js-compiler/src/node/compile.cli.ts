import __SProcess from '@coffeekraken/s-process';
import __SJsCompiler from './SJsCompiler';
import __SJsCompilerInterface from './interface/SJsCompilerInterface';

export default function compile(stringArgs = '') {
  const compiler = new __SJsCompiler();
  const pro = __SProcess.from(compiler.compile.bind(compiler), {
    process: {
      interface: __SJsCompilerInterface
    }
  });
  pro.run(stringArgs);
}
