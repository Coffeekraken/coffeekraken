import __SProcess from '@coffeekraken/s-process';
import __SSvelteCompiler from './SSvelteCompiler';
import __SSvelteCompilerInterface from './interface/SSvelteCompilerInterface';

export default function start(stringArgs = '') {
  const compiler = new __SSvelteCompiler();
  const pro = __SProcess.from(compiler._compile.bind(compiler), {
    process: {
      interface: __SSvelteCompilerInterface
    }
  });
  pro.run(stringArgs);
}
