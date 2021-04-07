import SFrontstackProcess from './SFrontstackStartProcess';

export default function start(stringArgs = '') {
  const pro = new SFrontstackProcess({}, {});
  pro.run(stringArgs);
}
