import __SStdio from '../shared/SStdio';
import STerminalStdio from './terminal/STerminalStdio';
import SBlessedStdio from './blessed/SBlessedStdio';

export * from '../shared/SStdio';
export * from './terminal/STerminalStdio';
export * from './blessed/SBlessedStdio';

export { STerminalStdio, SBlessedStdio };
export default __SStdio;
