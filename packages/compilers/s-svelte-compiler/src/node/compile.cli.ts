import SSvelteCompilerProcess from './SSvelteCompilerProcess';

export default function compile(stringArgs = '') {
  const pro = new SSvelteCompilerProcess({}, {});
  pro.run(stringArgs);
}
