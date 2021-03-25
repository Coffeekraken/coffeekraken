import SJsCompilerProcess from './SJsCompilerProcess';

export default function compileJs(stringArgs = '') {
  const pro = new SJsCompilerProcess({}, {});
  console.log('SDSDS', stringArgs);
  pro.run(stringArgs);
}
