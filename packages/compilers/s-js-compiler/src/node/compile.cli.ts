import SJsCompilerProcess from './SJsCompilerProcess';

export default function compileJs(stringArgs = '') {
  const pro = new SJsCompilerProcess({}, {});
  pro.run(stringArgs);
}
