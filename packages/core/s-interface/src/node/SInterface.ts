import SInterface from '../shared/SInterface';
import SInterfaceTerminalRenderer from './renderers/SInterfaceTerminalRenderer';

// register renderers
SInterface.registerRenderer(SInterfaceTerminalRenderer);

export * from '../shared/SInterface';
export default SInterface;
