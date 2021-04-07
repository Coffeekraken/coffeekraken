import __registerFolder from '@coffeekraken/sugar/shared/config/registerFolder';
import __path from 'path';

console.log('REG');
__registerFolder(`${__path.resolve(__dirname, '../config')}`, 'app');

import SFrontstack from './SFrontstack';
import SFrontstackStartProcess from './start/SFrontstackStartProcess';
import SFrontstackStartInterface from './start/interface/SFrontstackStartInterface';

export * from './SFrontstack';

export { SFrontstackStartProcess, SFrontstackStartInterface };
export default SFrontstack;
