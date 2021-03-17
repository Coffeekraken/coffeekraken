import SInterface from '../../shared/interface/_SInterface';
import __SInterfaceTerminalRenderer from './renderers/SInterfaceTerminalRenderer';
// register renderers
SInterface.registerRenderer(__SInterfaceTerminalRenderer);

export * from '../../shared/interface/_SInterface';
export default SInterface;
